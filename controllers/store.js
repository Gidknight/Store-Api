const Store = require('../models/Store')
const asyncWrapper = require('../middleware/asyncWrapper')
const { query } = require('express')


const getAllProducts = asyncWrapper (async (req,res)=>{
    const {name, company, condition, featured, sort, showSelection} = req.query
    const queryObject ={}

    if(name){
        queryObject.name = { $regex: name, $options: 'i'}
    }
    if(company){
        queryObject.company = company
    }
    if(featured){
        queryObject.featured = featured ==='true' ? true : false
    }
    if (condition){
        queryObject.condition = condition
    }
    
    //sort query
    let result = Store.find(queryObject)

    if(sort){
        const sortList = sort.split(',').join('')
        result = result.sort(sortList)
    }
    else {
        result = result.sort('createdAt')
    }

    //select
    if(showSelection){
        const selectList = showSelection.split(',').join(' ')
        result = result.select(selectList)
    }
    const product = await result
    res.status(200).json({product, nbHits: product.length})    
})

const createProduct = async (req,res) =>{
    try {
        const product = await Store.create(req.body)
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({msg:error})
    }

}

const getSingleProduct = async (req,res) =>{
    try{
        const {id:productID} = req.params
        const product = await Store.findOne({_id:productID})
        if(!product){
            res.status(404).json({msg:`product with ID: ${productID} is not available`})
        }
        res.status(200).json({product})
    }catch(error){
        res.status(500).json({msg:error})
    }
    
}

const updateProduct = async (req,res) =>{
    try{
        const {id:productID} = req.params
        const product = await Store.findOneAndUpdate({_id:productID}, req.body, {
            new: true,
            runValidators:true,
        })
        if(!product){
            res.status(404).json({msg:`product with ID: ${productID} is not available`})
        }
        res.status(200).json({product})
    }catch(error){
        res.status(500).json({msg:error})
    }
   
}

const deleteProduct = async(req,res) =>{
    try{
        const {id:productID} = req.params
        const product = await Store.findOneAndDelete({_id:productID})
        if(!product){
            res.status(404).json({msg:`no product with ID: ${productID} found`})
        }
        res.status(200).json({msg:`product with id: ${productID} is deleted`})
    }catch(error){

    }
}


module.exports = {
    getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct
}