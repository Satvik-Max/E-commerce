const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

const UserSchema = require('./schemas/userdata');
const productSchema = require('./schemas/productdata');
const Orderschema = require('./schemas/orderdata');

const secretKey = 'ethjdgf\jhdsfs653r763hb{g478746r[84r2(63074}837489*3487]468_-7ttb8';
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.redirect('/signin');

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.redirect('/signin');
    req.user = user;
    next();
  });
};

const app = express();
app.use(express.json());
app.use(cors());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect("mongodb://127.0.0.1:27017/LoginDB")
  .then(() => console.log("CONNECTION SUCCESSFUL!"))
  .catch((err) => console.log(err));



const UserModel = mongoose.model("SignUpDB", UserSchema);

app.post('/SignUp', function (req, res) {
  const { name, email, pass } = req.body;

  UserModel.create({ name, email, pass })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'User registered successfully' });
    })
    .catch(err => {
      if (err.code === 11000) {
        res.status(200).json({ error: 'User already exists' });
      } else {
        console.log(err);
        res.status(500).json({ error: 'Error registering user' });
      }
    });
});

app.post('/Signin', function (req, res) {
  const { email, pass } = req.body;

  UserModel.findOne({ email, pass })
    .then(user => {
      if (user) {
        const token = jwt.sign({ email }, secretKey, { expiresIn: 604800 });
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Bad Request Denied" });
    });
});


app.get('/', authenticateUser ,(req, res) => {
  let userdata = req.user
  res.json({ message: userdata.email });
});

app.get('/AddtoCart', authenticateUser , (req, res) => {
  let userdata = req.user.email
  res.json({ message: userdata });
});



const product = mongoose.model('products', productSchema);


app.get('/ProductData' , authenticateUser , async (req ,res) => {
  try {
    const productss = await product.find({});
    res.json(productss);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const order = mongoose.model("orders",Orderschema);

app.get("/Orders" , authenticateUser , (req ,res ) => {
    try{
      res.json(req.user.email)
    }catch( error){
      res.json(error)
    }
})

app.get('/productDetails/:productId' , (req , res) => {
  const id = req.params.productId;
  product.findOne({_id : id})
  .then(response => res.json(response))
  .catch(err => res.json(err));
});


app.post("/AddingToCart", (req, res) => {
  const { userId, product } = req.body;
  const { _id, name, newPrice, description } = product; 

  UserModel.findOne({ email: userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!user.cart) {
        user.cart = [];
      }
      user.cart.push({ _id, name, newPrice, description }); 
      return user.save(); 
    })
    .then(() => {
      res.status(200).json({ message: 'Product added to cart successfully' });
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


app.get("/cartitems/:userId", (req, res) => {
  const userId = req.params.userId;
  UserModel.findOne({ email: userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!user.cart) {
        res.send([]);
      }
      else{
        res.send(user.cart)
      }
    })
    .catch(err => {
      console.error('Error fetching cart items:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post("/removefromcart", (req, res) => {
  const { index, userId } = req.body;
  UserModel.findOne({ email: userId })
   .then(user => {
     if (!user) {
       return res.status(404).json({ error: 'User not found' });
     }
     if (!user.cart) {
       user.cart = [];
     }
     user.cart.splice(index,1);
     return user.save(); 
   })
   .then(() => {
     res.status(200).json({ message: 'Product removed from cart successfully' });
   })
   .catch(error => {
     console.error('Error removing product from cart:', error);
     res.status(500).json({ error: 'Internal server error' });
   });
});

app.get("/Admin/:userId" , (req, res) => {
  const userId = req.params.userId;
  UserModel.findOne({ email: userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.isAdmin && user.isAdmin === true) {
        res.status(200).json({ isAdmin: true });
      } else {
        res.status(200).json({ isAdmin: false });
      }
    })
    .catch(err => {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post("/adminAddProduct", (req, res) => {
  const productData = req.body;
  product.create(productData)
  .then(() => {
    res.status(200).json({ message: "Product added to shop successfully" });
  })
  .catch((error) => {
    console.error('Error adding product:', error);
    res.status(500).json({ error: "Error in adding product to shop" });
  });
});

app.post("/adminDeleteProduct" , async (req , res) => {
  try {
      const productId = req.body.productId;
      const deletedProduct = await product.findByIdAndDelete(productId);
      if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: "Failed to delete product" });
  }
});

app.listen(3001, function () {
  console.log("Server Running on 3001");
});