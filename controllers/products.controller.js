const Product = require('../models/product.model');

exports.getALL = async (req, res) => {
    try {
      res.json(await Product.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
 exports.getRandom = async (req, res) => {
  
    try {
      const count = await Product.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Product.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.getId = async (req, res) => {
  
    try {
      const dep = await Product.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.post = (req, res) => {
    const { name, client } = req.body;
    req.db.collection('products').insertOne({ name: name, client: client }, err => {
      if(err) res.status(500).json({ message: err });
      else res.json({ message: 'OK' });
    })
  };
  
  
  exports.putId = async (req, res) => {
    const {name, client } = req.body;
  
    try {
      const dep = await(Product.findById(req.params.id));
      if(dep) {
        await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };
  
  exports.delete = async (req, res) => {
  
    try {
      const dep = await(Product.findById(req.params.id));
      if(dep) {
        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  
  };