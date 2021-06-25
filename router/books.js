const express = require('express');
const bookModel = require('../models/books');
const jwt = require('jsonwebtoken');

const { validateBookInput } = require('../utils/validator');
const router = express.Router();

router.get('/books', async (req,res)=>{
    const errors = {}
    console.log('fetch books')
    const bearHeader = req.headers["authorization"]
    if(typeof bearHeader !== 'undefined'){
        const bearer = bearHeader.split(' ');
        const bearToken = bearer[1];
        
        jwt.verify(bearToken,'secret',(err,data)=>{
            if(err){
                res.send(err)
            }
            else if(data){
                bookModel.find((err,data)=>{
                    if(err){
                        res.status(500).send(err)
                    }
                    else{
                        res.status(200).send(data)
                    }
                }) 
            }
        })
    }else{
        errors.token = "please give valid token";
        res.send({'error':errors})
    }
})

router.post('/books', async (req,res)=>{
    const {title,author,book_image,description,buylink,price} = req.body;

    const {errors,valid} = validateBookInput(title,author,book_image,description,buylink,price);

    console.log('book post request')
    if(!valid){
        res.send({'error': errors})
    }
    else{
        const bearHeader = req.headers["authorization"];
        if(typeof bearHeader !== 'undefined'){
            const bearer = bearHeader.split(' ');
            const bearToken = bearer[1];
            
            jwt.verify(bearToken,'secret',(err,data)=>{
                if(err){
                    res.send(err)
                }
                else if(data){
                    const saveData = async() => {
                        const newBook = new bookModel({
                            title,
                            author,
                            price,
                            book_image,
                            description,
                            buy_links:buylink,
                            createdAt: new Date().toISOString(),
                            username:data.username
                        })
        
                        const response = await newBook.save();
        
                        res.send({'data':response})
                    }

                    saveData();
                }
            })
        }else{
            errors.token = "please give valid token";
            res.send({'error':errors})
        }
    }
})

router.delete('/books', async (req,res)=>{
    const errors = {};

    const {id} = req.query;

    const bearHeader = req.headers["authorization"];
    if(typeof bearHeader !== 'undefined'){
        const bearer = bearHeader.split(' ');
        const bearToken = bearer[1];
        
        jwt.verify(bearToken,'secret',(err,data)=>{
            if(err){
                res.send(err)
            }
            else if(data){

                const remove = async () => {
                    const Book = bookModel.findById({_id:id})
                    if(!Book){
                        res.send({'data':'item not found'});
                    }
                    const response = await Book.remove();
                    res.send({'data':'Book deleted successfully'});
                }
                remove();
            }
        })
    }else{
        errors.token = "please give valid token";
        res.send({'error':errors})
    }
})


module.exports = router;