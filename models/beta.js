'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypst = require('bcrypt-nodejs')

const BetaSchema = Schema({
	nombre: { type: String, unique: true, required: true},
	fechaReg: {type: Date, default:Date.now()},
	tinkets: {
		casino:[{
			id: Number,
			fecha: {type:Date,default:Date.now()},
			estado: {type:String,default:'valido'}
		}],
		cine:[{
			id: Number,
			fecha: {type:Date,default:Date.now()},
			estado: {type:String,default:'valido'}
		}],
	}
})


module.exports = mongoose.model('beta', BetaSchema)
	
