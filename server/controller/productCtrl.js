const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    try{
        if(req.body.nombre) {
            req.body.slug = slugify(req.body.nombre, { lower: true });
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    }
    catch(error){
        res.status(500);
        throw new Error("Product could not be created");
    }    
});

const updateProduct = asyncHandler(async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            if(req.body.nombre) {
                req.body.slug = slugify(req.body.nombre, { lower: true });
            }
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            res.json(updatedProduct);
        }else{
            res.status(404);
            throw new Error("Product not found");
        }
    }
    catch(error){
        res.status(500);
        throw new Error("Product could not be updated");
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;    
    try{
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json(deleteProduct);
    }
    catch (error) {
        res.status(404);
        throw new Error("Product not found");
    }
});


const getAProduct = asyncHandler(async (req, res) => { 
    try{
        const findProduct = await Product.findById(req.params.id);
        res.json(findProduct); 
    }catch(error){
        res.status(404);
        throw new Error("Product not found");
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try{
        const allProducts = await Product.find();
        res.json(allProducts);
    }catch(error){
        res.status(404);
        throw new Error("Products not found");
    }
});

module.exports = { createProduct, updateProduct, deleteProduct, getAProduct, getAllProducts };