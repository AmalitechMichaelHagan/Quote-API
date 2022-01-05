const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT,(req,res,next)=>{

console.log(`Server running at port ${PORT}`)

});

app.get('/api/quotes/random',(req,res,next)=>{

    const randomQuote = getRandomElement(quotes);
    
    res.status(200).send({
        quote : randomQuote
    })
    
    });

app.get('/api/quotes',(req,res,next)=>{
    if(req.query.person){
        const queryPerson = req.query.person;
        const filtered = quotes.filter(element=>{
        return element.person === queryPerson;
        })
        
        res.status(200).send({quotes:filtered});
        }else{

        res.status(200).send({quotes: quotes});
        
    }

})


app.post('/api/quotes', (req, res) => {
    const newQuote = {
      quote: req.query.quote,
      person: req.query.person
    };
    if (newQuote.quote && newQuote.person) {
      quotes.push(newQuote);
      res.status(201).send({ quote: newQuote });
    } else {
      res.status(400).send();
    }
  });





