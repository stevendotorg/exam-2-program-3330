const express = require('express');
const app = express();
const port = 3000;

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res)=> {
    res.render('index',{currentUser:null});
});

app.listen(port, () =>{
    console.log('Success');
});