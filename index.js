const express = require('express');
const path = require('path');
const logger = require('./midleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();

//app.use(logger);

//init the midlewere
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//handlrbars midleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Homepage
app.get('/',(req,res)=> res.render('index',{
    title:"Members App ",
    members
}));

//static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members',require('./routes/api/members'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));