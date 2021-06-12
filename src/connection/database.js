const mongoose =require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/Discord', { useNewUrlParser: true });

module.exports= db;