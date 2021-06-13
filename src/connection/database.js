const mongoose =require('mongoose');
const db = mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

module.exports= db;