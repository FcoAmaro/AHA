'use strict'

const Product = require('../models/product')


function getProduct(req, res) {
	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!product) return res.status(404).send({message: 'Producto inexistente'})	
		res.status(200).send({product: product})
	})
}

function getProducts(req,res){
	Product.find({}, (err, product) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!product) return res.status(404).send({message: 'Producto inexistente'})	
		res.status(200).send({product: product})
	})
}

function saveProducts (req,res){
	console.log('POST /api/product')
	console.log(req.body)

	let product = new Product()
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err, productStored) => {
		if (err) res.status(500).send({message: 'Error al salvar ' + err})
		res.status(200).send({product: productStored})
	})
}



function updateProduct(req,res){
	let productId = req.params.productId
	let update = req.body
	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if (err) res.status(500).send({message: 'Error:' + err})
		res.status(200).send({product: productUpdated })
	})
}

function deleteProduct(req,res){
	let productId = req.params.productId
	Product.findById(productId, (err,productId) => {
		if (err) res.status(500).send({message: 'Error:' + err})
		res.status(200).send({message: 'El producto ha sido borrado'})
	})
		
}

module.exports = {
	getProduct,
	getProducts,
	saveProducts,
	updateProduct,
	deleteProduct
}