const User = require('../models/userModel');
const Product = require('../models/userProductModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { roles } = require('../role')
var nodemailer = require('nodemailer');
const { reject } = require('bcrypt/promises');
var username = 'SENDER_MAIL';
var password = 'SENDER_PASSWORD'
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: username,
    pass: password
  }
});

async function mailsender(role,email){
  if(role != "admin"){
  var mailOptions = {
    from: username,
    to: email,
    subject: 'Adding into the group',
    text: username+' is successfully added',
    attachments: [        
      {   
        filename: 'Angel.jpg',
          path: 'C:/Users/ps268/Desktop/dummy/Angel.jpg'
      }
    ]
  };
  return await transporter.sendMail(mailOptions);
}
}
async function hashPassword(password) {
 return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
 try {
  const { email, password, role } = req.body
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ email, password: hashedPassword, role: role || "basic" });
  const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
   expiresIn: "1d"
  });
  let mail = req.body.email;
  newUser.accessToken = accessToken;
  if(role){
    let mailsent = await mailsender(role,mail);
    mailsent;
  }
  await newUser.save();
      res.json({
      data: newUser,
      message : mail+' is Registered successfully'
      })
 } catch (error) {
  next(error)
 }
}

exports.login = async (req, res, next) => {
    try {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) return next(res.json({'status':'error','message': 'Email does not exist'}));
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) return next(res.json({'status':'error','message':'Password is not correct'}))
     const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
     });
     await User.findByIdAndUpdate(user._id, { accessToken })
     res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken,
      message : user.email+' Loginned successfully'
     })
    } catch (error) {
     next(error);
    }
}

exports.allowIfLoggedin = async (req, res, next) => {
  try {
   const user = res.locals.loggedInUser;
   if (!user)
    return res.status(401).json({
     error: "You need to be logged in to access this route"
    });
    req.user = user;
    next();
   } catch (error) {
     console.log(error)
    next(error);
   }
 }

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
     data: users
    });
}
   
exports.getUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     const user = await User.findById(userId);
     if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
      data: user
     });
    } catch (error) {
     next(error)
    }
}
   
exports.updateUser = async (req, res, next) => {
    try {
     const update = req.body
     const userId = req.params.userId;
     await User.findByIdAndUpdate(userId, update);
     const user = await User.findById(userId)
     res.status(200).json({
      data: user,
      status:"Success",
      message: 'User has been updated'
     });
    } catch (error) {
     next(error)
    }
}
   
exports.deleteUser = async (req, res, next) => {
    try {
     const userId = req.params.userId;
     await User.findByIdAndDelete(userId);
     res.status(200).json({
      status:"Success",
      message: 'User has been deleted'
     });
    } catch (error) {
     next(error)
    }
}


exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.role)[action](resource);
   console.log(permission)
   if (!permission.granted) {

    return res.status(401).json({
     status:"error",
     message: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}



exports.productcreate = async (req, res, next) => {
  try {
   const { name, color, details, price, userId } = req.body
   const newitem = new Product({ name, color, details, price, userId });
   const user = await User.findById(userId);
   console.log(user.role)
   if(user.role == "admin"){
       await newitem.save();
       res.json({
       data: newitem,
       message : 'Product created successfully successfully'
       })
      }else{
        reject.json({
          status:"Error",
          message:'Request Access for the Admin to save the changes'
        })
      }
  } catch (error) {
   next(error)
  }
 }
   
 exports.productlists = async (req, res, next) => {
  const productlist = await Product.find({});
  res.status(200).json({
   status: "Success",
   data: productlist
  });
}

exports.productlist = async (req, res, next) => {
  try {
   const productId = req.params.productId;
   const productlist = await Product.findById(productId);
   console.log(productlist);
   if (!productlist) return next(res.json({status:'Error','message':'Item did not exist'}));
    res.status(200).json({
      status: "Success",
      data: productlist
   });
  } catch (error) {
   next(error)
  }
}

exports.productlistUpdate = async (req, res, next) => {
  try {
   const update = req.body
   const productId = req.params.productId;
   await Product.findByIdAndUpdate(productId, update);
   const user = await Product.findById(productId)
   console.log(user);
   res.status(200).json({
    status: "Success",
    data: user,
    message: 'Product is been updated Successfully'
   });
  } catch (error) {
   next(error)
  }
}
 
exports.productlistDelete = async (req, res, next) => {
  try {
   const productId = req.params.productId;
   await Product.findByIdAndDelete(productId);
   res.status(200).json({
    status: "Success",
    message: 'Product has been deleted Successfully'
   });
  } catch (error) {
   next(error)
  }
}
