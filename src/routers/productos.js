const { Router } = require("express");
const upload = require("../services/upload.js");
const ProductosController = require("../controllers/ProductosController");

const router = Router();

router.get("/", async (req, res) => {
  const data = await ProductosController.getAll();
  res.status(200).send(data);
});

router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  ProductosController.getById(id).then((result) => {
    res.send(result);
  });
});

//POST
router.post("/", upload.single("thumbnail"), (req, res) => {
  let file = req.file;
  let product = req.body;
  product.price = parseInt(product.price);
  product.thumbnail =
    req.protocol + "://" + req.hostname + ":8080" + "/images/" + file.filename;
  ProductosController.save(product).then((result) => {
    res.send(result);
    if (result.status === "success") {
      ProductosController.getById(product.id).then((result) => {
        result;
      });
    }
  });
});

//PUT
router.put("/:pid", upload.single("thumbnail"), (req, res) => {
  let file = req.file;
  let product = req.body;
  let id = parseInt(req.params.pid);
  product.thumbnail =
    req.protocol + "://" + req.hostname + ":8080" + "/images/" + file.filename;
  ProductosController.update(id, product).then((result) => {
    res.send(result);
  });
});

//DELETE
router.delete("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  ProductosController.deleteById(id).then((result) => {
    res.send(result);
  });
});
module.exports = router;
