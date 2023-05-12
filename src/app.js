const express = require("express");
const { productManager } = require("./productManager.js");

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/products", (req, res) => {
  try {
    const asked = req.query;
    const limits = Object.keys(asked).length;
    if (limits == 0) {
      res
        .status(200)
        .send({ status: "success", data: productManager.getProducts() });
    } else {
      const newArray = productManager.getProducts().slice(0, asked.limit);
      res.status(200).send({ status: "success", data: newArray });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/products/:pid", (req, res) => {
  const { pid } = req.params;
  try {
    const product = productManager.getProductById(parseInt(pid));
    res.send({ product });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => console.log("Server in the port: " + port));
