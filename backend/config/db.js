const mongoose = require('mongoose')

function connectEstablish() {
	const connectionString = process.env.MONGO_URL
	mongoose
		.connect(connectionString)
		.then(() => console.log('Connected to the database'))
		.catch((err) => console.error('Connection error:', err))
}

module.exports = connectEstablish
