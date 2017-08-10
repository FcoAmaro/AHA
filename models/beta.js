'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypst = require('bcrypt-nodejs')

const BetaSchema = Schema({
	nombre: { type: String, unique: true, required: true},
	tinkets: {
		casino:[{
			id: Number,
			estado: {type:String,default:'valido'}
		}],
		cine:[{
			id: Number,
			estado: {type:String,required:true,default:'valido'}
		}],
	}
})


module.exports = mongoose.model('beta', BetaSchema)
	
