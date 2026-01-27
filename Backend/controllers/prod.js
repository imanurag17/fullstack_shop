const Product = require('../models/products')
const User = require('../models/users')

exports.postCreateProduct = (req, res, next) => {
  const title = req.body.title.value;
  const imageUrl = req.body.image.value
  const description = req.body.content.value
  const creator = req.userId

  const product = new Product({
    title,
    imageUrl,
    description,
    creator
  })
  product.save()
    .then(result => {
      res.status(201).json({ message: 'Product Created' })
    })
    .catch(error => { console.log(error) })

}

exports.getAllProducts = (req, res, next) => {
  const userId = req.query.user;
  const filter = userId ? { creator: userId } : null;
  Product.find(filter)
    .populate('creator', 'name')
    .then(products => {
      if (!products || products.length === 0) {
        const error = new Error('No products found')
        error.statusCode = 404
        throw error
      }
      const data = {
        items: products,
        allProducts: !filter,
      };
      res.status(200).json(data)
    })
    .catch(error => {
      const message = error.message
      const status = error.statusCode
      res.status(status).json({ message });
    })
}

exports.putUpdateProduct = (req, res, next) => {
  const prodId = req.query.prodId
  const title = req.body.title.value;
  const imageUrl = req.body.image.value
  const description = req.body.content.value
  //const creator = req.userId

  Product.findById(prodId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find product')
        error.statusCode = 404;
        throw error;
      }
      if (product.creator.toString() !== req.userId) {
        const error = new Error('Not Authenticated')
        error.statusCode = 403
        throw error
      }
      product.title = title
      product.description = description
      product.imageUrl = imageUrl
      return product.save()
    })
    .then(result => {
      res.status(200).json({ message: 'Product Updated', product: result })
    })
    .catch(error => {
      const message = error.message
      const status = error.statusCode
      res.status(status).json({ message });
    })
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.query.prodId
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find product')
        error.statusCode = 404;
        throw error;
      }
      // if(product.creator.toString() !== req.userId){
      //   const error = new Error('Not Authenticated')
      //   error.statusCode = 403
      //   throw error
      // }
      return Product.findByIdAndDelete(prodId)
    })
    // .then(result => {
    //   return User.findById(req.userId)
    // })
    // .then(user => {
    //   user.product.pull(postId)
    //   return user.save()
    // })
    .then(result => {
      res.status(200).json({ message: 'Product Deleted' })
    })
    .catch(error => {
      const message = error.message
      const status = error.statusCode
      res.status(status).json({ message });
    })
}

exports.postAddToCart = (req, res, next) => {
  const prodId = req.body.prodId
  const userId = req.userId
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        const error = new Error('Could not find product')
        error.statusCode = 404;
        throw error;
      }
      return User.findById(userId)
    })
    .then(user => {
      if (!user) {
        const error = new Error('Could not find User')
        error.statusCode = 404;
        throw error;
      }
      const index = user.cart.findIndex(
        item => String(item.product) === String(prodId)
      )
      if (index >= 0) {
        user.cart[index].quantity += 1;
      } else {
        user.cart.push({
          product: prodId,
          quantity: 1
        });
      }
      return user.save();
    })
    .then(user => {
      return user.populate('cart.product')
    })
    .then(user => {
      const items = user.cart.map(entry => ({
        ...entry.product.toObject(),
        quantity: entry.quantity
      }));
      const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

      res.json({
        items,
        totalQuantity
      });
    })
    .catch(error => {
      const message = error.message
      const status = error.statusCode
      res.status(status).json({ message });
    })
}

exports.getCart = (req, res, next) => {
  const userId = req.userId;

  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find User');
        error.statusCode = 404;
        throw error;
      }
      return user.populate('cart.product');
    })
    .then(user => {
      const items = user.cart.map(entry => ({
        ...entry.product.toObject(),
        quantity: entry.quantity
      }));

      const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);

      return res.json({ items, totalQuantity });
    })
    .catch(error => {
      const status = error.statusCode || 500;
      const message = error.message || 'Something went wrong';
      res.status(status).json({ message });
    });
};
