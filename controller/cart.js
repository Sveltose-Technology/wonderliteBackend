const Cart = require("../models/cart");
const orders = [];

exports.addToCart = async (req, res) => {
  const { productId, quantity, name, price } = req.body;
  //const userID = req.user;

  try {
    const cart = await Cart.findOne({ productId });

    if (cart) {
      //cart exists for user
      const itemIndex = cart.products.findIndex(
        (p) => p.productId == productId
      );

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        const productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        //userID,
        products: [{ productId, quantity, name, price }],
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.addToOrder = async (req, res) => {
  const order = req.body;
  const userID = req.user;

  if (order.productId && order.product_price && order.product_qty) {
    orders.push({
      ...order,

      id: `${orders.length + 1}`,

      date: Date.now().toString(),
    });

    res.status(200).json({
      status: true,
      message: "Order created successfully",
      data: order,
    });
  } else {
    res.status(401).json({
      status: false,
      message: "Invalid Order creation",
      error: "error",
    });
  }
};

exports.getallcart = async (req, res) => {
  const findall = await Cart.find().sort({ sortorder: 1 });
  if (findall) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findall,
    });
  } else {
    res.status(400).json({
      status: true,
      msg: "error",
      error: "error",
    });
  }
};

exports.editorder = async (req, res) => {
  const editorder = req.body;
  console.log(editorder);
  const findandUpdateEntry = await Cart.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: req.body },
    { new: true }
  );

  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      status: "error",
      error: "error",
    });
  }
};

exports.removecart = async (req, res) => {
  try {
    const deleteentry = await Cart.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: true,
      msg: "success",
      data: deleteentry,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      msg: "error",
      error: error,
    });
  }
};

exports.updateorder = async (req, res) => {
  const order_id = req.params.id;
  const order_update = req.body;
  for (let order of orders) {
    if (order.id == order_id) {
      if (order_update.product_name != null || undefined)
        order.product_name = order_update.product_name;

      if (order_update.product_qty != null || undefined)
        order.product_qty = order_update.product_qty;

      if (order_update.customer_name != null || undefined)
        order.customer_name = order_update.customer_name;
      return res
        .status(200)
        .json({ message: "Updated Successfully", data: order });
    }
  }
  res.status(404).json({ message: "Invalid Order Id" });
};

// exports.deleteproductorder = async (req, res) => {
//   const_order_id = req.params.id;

//   for (let order of orders) {
//     if (order.id == order_id) {
//       orders.splice(orders.indexOf(order), 1);
//       return res.status(200).json({
//         message: "deleted successfully",
//       });
//     }
//   }
//   res.status(404).json({ message: "Invalid Order Id" });
// };

// exports.addItemToCart = (req, res) => {
//   Cart.findOne({ user: req.params.id }).exec((error, cart) => {
//     if (error) return res.status(400).json({ error });
//     if (cart) {
//       //if cart already exist then update cart by quantity
//       Cart.findOneAndUpdate(
//         { user: req.params.id },
//         {
//           $push: { cartItems: req.body.CartItems },

//           // res.status(200).json({message:cart})
//         }
//       ).exec((error, _cart) => {
//         if (error) return res.status(400).json({ error });
//         if (_cart) {
//           return res.status(200).json({ cart: _cart });
//         }
//       });
//     } else {
//       //if cart not exist then create a new cart
//       const cart = new Cart({
//         user: req.params.id,
//         CartItems: [req.body.CartItems],
//       });
//       cart.save((error, cart) => {
//         if (error) return res.status(400).json({ error });
//         if (cart) {
//           return res.status(201).json({ cart });
//         }
//       });
//     }
//   });
// };

//CART REPOSITORY

exports.addItemToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    let cart = await cartRepository.cart();
    let productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }
    //--If Cart Exists ----
    if (cart) {
      //---- Check if index exists ----
      const indexFound = cart.items.findIndex(
        (item) => item.productId.id == productId
      );
      //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length == 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
      }
      //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
      else if (indexFound !== -1) {
        cart.items[indexFound].quantity =
          cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total =
          cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
      //----Check if quantity is greater than 0 then add item to items array ----
      else if (quantity > 0) {
        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          total: productDetails.price * quantity,
        });
        cart.subTotal = cart.items
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
      //----If quantity of price is 0 throw the error -------
      else {
        return res.status(400).json({
          type: "Invalid",
          msg: "Invalid request",
        });
      }
      let data = await cart.save();
      res.status(200).json({
        type: "success",
        mgs: "Process successful",
        data: data,
      });
    }
    //------------ This creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cartData = {
        items: [
          {
            productId: productId,
            quantity: quantity,
            total: productDetails.price * quantity,
            price: productDetails.price,
          },
        ],
        subTotal: productDetails.price * quantity,
      };
      cart = await cartRepository.addItem(cartData);
      // let data = await cart.save();
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err,
    });
  }
};
