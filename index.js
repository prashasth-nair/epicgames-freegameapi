const axios = require("axios")
const express = require('express')
const app = express()
const path = require("path")
const port = 3000

app.use(express.static(path.join(__dirname, 'public')));


app.get('/api', async (req, res) => {
    const country = req.query.country;
    let gamelist = [];
    if(!country) return res.json({
        message:"you entered the wrong country code",
        status :"error",
        author :"Yunak"
})

    let games = await freeGame(country);
    games.elements.forEach(element => {
        gamelist.push({
            title:element.title,
            description:element.description,
            effectiveDate:element.effectiveDate,
            offerType:element.offerType,
            status:element.status,
            isCodeRedemptionOnly:element.isCodeRedemptionOnly,
            price:element.price.totalPrice.originalPrice,
            currencyCode:element.price.totalPrice.currencyCode,
        })
    });

    res.send({
        author : "Yunak API",
        api:gamelist
    })

  });

  app.get('/', async (req, res) => {
    res.render("index")
  })
  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
  async function freeGame(country) {
    try {
      const response = await axios.get('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions', {
        params: { country: country},
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
      return response.data.data.Catalog.searchStore;
    } catch (error) {
      return "bir hata oluştu!"
    }
  }
  