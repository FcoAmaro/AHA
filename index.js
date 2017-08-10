'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Beta = require('./models/beta')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/beta', (req,res) => {
	Beta.find({}, (err, beta) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!beta) return res.status(404).send({message: 'Betao inexistente'})	
		res.status(200).send({beta: beta})
})
})

app.get('/api/beta/:betaId', (req,res) => {
	let betaId = req.params.betaId

	Beta.findById(betaId, (err, beta) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!beta) return res.status(404).send({message: 'Betao inexistente'})	
		res.status(200).send({beta: beta})
	})
})

app.get('/api/beta/casino/:betaId', (req,res) => {
	let betaId = req.params.betaId

	Beta.findById(betaId, (err, beta) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!beta) return res.status(404).send({message: 'Betao inexistente'})	
		res.status(200).send({beta: beta.tinkets.casino[0].estado})
	})
})

app.get('/api/beta/validar/:betaId', (req,res) => {
	let betaId = req.params.betaId

	Beta.findById(betaId,  (err, beta) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		if (!beta) return res.status(404).send({message: 'Betao inexistente'})
		beta.tinkets.casino[0].estado = 'usado'	
		res.status(200).send({beta: beta})
		beta.save()

	})
})

app.post('/api/beta', (req,res) => {
	console.log('POST /api/beta')
	console.log(req.body)

	let beta = new Beta()
	beta.nombre = req.body.nombre
	beta.tinkets= req.body.tinkets

	beta.save((err, betaStored) => {
		if (err) res.status(500).send({message: 'Error al salvar ' + err})
	res.status(200).send({beta: betaStored})
	})
})

app.put('/api/beta/:betaId', (req,res) => {
	let betaId = req.params.betaId
	let update = req.body
	Beta.findByIdAndUpdate(betaId, update, (err, betaUpdated) => {
		if (err) res.status(500).send({message: 'Error:' + err})
		res.status(200).send({beta: betaUpdated })
	})
})

app.put('/api/beta/validar/:betaId', (req,res) => {
	let betaId = req.params.betaId
	let update = req.body
	Beta.findByIdAndUpdate(betaId, update, (err, betaUpdated) => {
		if (err) res.status(500).send({message: 'Error:' + err})
		res.status(200).send({beta: betaUpdated })
	})
})

app.delete('/api/beta/:betaId', (req,res) => {
	let betaId = req.params.betaId

	Beta.findById(betaId, (err) => {
		if (err) return res.status(500).send({message: 'Error: '+err})	
		beta.remove(err => {
			if (err) return res.status(500).send({message: 'Error: '+err})	
			if (err) res.status(200).send({message: 'El betao ha sido eliminado'})
		})
	})
})

mongoose.connect('mongodb://localhost:27017/ejemplo', (err, res) => {
	if (err) {
		return console.log('Error al conectar a la BD: '+ err)
	}
	console.log('Conexión a la BD establecida...')

	app.listen(port, () => {
	console.log('API REST running on localhost:'+port)
	})
})
