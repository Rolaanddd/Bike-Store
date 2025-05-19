const express = require("express");
const userModel = require("./Models/User");
const productModel = require("./Models/Products");
const reviewModel = require("./Models/reviews");
const cartModel = require("./Models/Cart");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./Models/db");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.post("/demo", async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/demo", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/review", async (req, res) => {
  try {
    const { email, review } = req.body;
    const newReview = await reviewModel.create({ email, review });
    res.status(200).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/review", async (req, res) => {
  try {
    const allReviews = await reviewModel.find();
    res.status(200).json(allReviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const allproducts = await productModel.find();
    res.status(200).json(allproducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from request parameters

    let allProducts;
    if (query) {
      allProducts = await productModel.find({
        $or: [
          { productName: { $regex: query, $options: "i" } }, // Case-insensitive search
          { category: { $regex: query, $options: "i" } },
        ],
      });
    } else {
      allProducts = await productModel.find();
    }

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/cart", async (req, res) => {
  try {
    const { userEmail, products } = req.body;

    let cart = await cartModel.findOne({ userEmail });

    if (!cart) {
      cart = new cartModel({ userEmail, products });
    } else {
      products.forEach((newProduct) => {
        const existingProduct = cart.products.find(
          (p) => p.productName === newProduct.productName
        );

        if (existingProduct) {
          existingProduct.quantity += newProduct.quantity; // Increase quantity if product exists
        } else {
          cart.products.push(newProduct); // Add new product if not in cart
        }
      });
    }

    await cart.save();
    res.status(200).json({ message: "Products added/updated in cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/cart/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    const cart = await cartModel.findOne({ userEmail });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/cart/:email/:productName", async (req, res) => {
  const { email, productName } = req.params;

  try {
    // Find the user's cart
    const cart = await cartModel.findOne({ userEmail: email });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product to be removed
    const updatedProducts = cart.products.filter(
      (product) => product.productName !== productName
    );

    // If no products are left, delete the cart entirely
    if (updatedProducts.length === 0) {
      await cartModel.deleteOne({ userEmail: email });
      return res.status(200).json({ message: "Cart emptied and deleted" });
    }

    // Otherwise, update the cart
    cart.products = updatedProducts;
    await cart.save();

    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
});

app.put("/cart/:email/:productName", async (req, res) => {
  const { email, productName } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartModel.findOne({ userEmail: email });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const product = cart.products.find((p) => p.productName === productName);
    if (product) {
      product.quantity = quantity;
      await cart.save();
      return res.status(200).json({ message: "Quantity updated", cart });
    }

    res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
});

// Delete user by ID
app.delete("/demo/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product by ID
app.delete("/products/:id", async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/user/:email", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/cart/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const deleted = await cartModel.findOneAndDelete({ userEmail: email });

    if (!deleted) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart emptied successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});