const express = require('express');
const mongoose = require('mongoose');
const app = express();
// var bodyParser = require('body-parser');
// var multer = require('multer');
// var upload = multer();

const userRoute = require('./router/user');
const bookRoute = require('./router/books');

app.use(express.json());
app.use(express.Router());

app.use('/api',userRoute);
app.use('/api',bookRoute);

const PORT = process.env.PORT || 5000;
const mongodb_url = 'mongodb+srv://kathir_root:kathir_root@cluster0.aq8ts.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongodb_url,{useNewUrlParser: true,useUnifiedTopology:true})
    .then(()=>{
        console.log('mongodb connected')
        return app.listen(PORT,()=> console.log(`server running port :${PORT}`))
    })


