const fs = require("fs");
const productsURL = "./src/files/products.txt";

class ProductosController {
  static async getAll() {
    try {
      let data = await fs.promises.readFile(productsURL, "utf-8");
      let products = JSON.parse(data);
      return { status: "success", products: products };
    } catch (error) {
      return {
        status: "error",
        message: "Error al buscar el producto: " + error,
      };
    }
  }
  static async save(product) {
    let idAsignado = 0;
    try {
      let data = await fs.promises.readFile(productsURL, "utf-8");
      let products = JSON.parse(data);
      if (
        products.some(
          (prod) => prod.title.toLowerCase() === product.title.toLowerCase()
        )
      ) {
        return {
          status: "error",
          message: `El producto "${product.title.toLowerCase()}" ya existe `,
        };
      } else {
        let producto = {
          id: products[products.length - 1].id + 1,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
        };
        products.push(producto);
        try {
          await fs.promises.writeFile(
            productsURL,
            JSON.stringify(products, null, 2)
          );
          idAsignado = producto.id;
          return {
            status: "success",
            message: "Producto añadido exitosamente. ID: " + idAsignado,
          };
        } catch (error) {
          return {
            status: "error",
            message: "Error al intentar añadir el producto: " + error,
          };
        }
      }
    } catch (error) {
      console.log(error);
      let producto = [
        {
          id: 1,
          timestamp: product.timestamp,
          title: product.title,
          precio: product.price,
          thumbnail: product.thumbnail,
        },
      ];
      try {
        await fs.promises.writeFile(
          productsURL,
          JSON.stringify(producto, null, 2)
        );
        return {
          status: "success",
          message: "Producto añadido exitosamente. ID: 1",
        };
      } catch (error) {
        console.log(error);
        return {
          status: "error",
          message: "Error al intentar añadir el producto:" + error,
        };
      }
    }
  }
  static async getById(id) {
    try {
      let data = await fs.promises.readFile(productsURL, "utf-8");
      let products = JSON.parse(data);
      let product = products.find((prod) => prod.id === id);
      return product
        ? { status: "success", product: product }
        : { status: "error", description: "Producto no encontrado" };
    } catch (error) {
      return {
        status: "error",
        message: "Error al buscar el producto: " + error,
      };
    }
  }

  static async update(id, body) {
    try {
      let data = await fs.promises.readFile(productsURL, "utf-8");
      let products = JSON.parse(data);
      if (!products.some((pr) => pr.id === id))
        return {
          status: "error",
          message: "Ningún producto con el id especificado",
        };
      let result = products.map((product) => {
        if (product.id === id) {
          console.log(body);
          body = Object.assign({ id: id, ...body });
          return body;
        } else {
          return product;
        }
      });
      try {
        await fs.promises.writeFile(
          productsURL,
          JSON.stringify(result, null, 2)
        );
        return { status: "success", message: "Producto actualizado" };
      } catch {
        return { status: "error", message: "Error al actualizar el producto" };
      }
    } catch (error) {
      return {
        status: "error",
        message: "Fallo al actualizar el producto: " + error,
      };
    }
  }
  static async deleteById(id) {
    try {
      let data = await fs.promises.readFile(productsURL, "utf-8");
      let products = JSON.parse(data);
      let productsAux = products.filter((prod) => prod.id !== id);
      try {
        await fs.promises.writeFile(
          productsURL,
          JSON.stringify(productsAux, null, 2)
        );
        return {
          status: "success",
          message: "Producto eliminado exitosamente",
        };
      } catch (error) {
        return {
          status: "error",
          message: "Error al intentar eliminar el producto: " + error,
        };
      }
    } catch (error) {
      return {
        status: "error",
        message: "Error: " + error,
      };
    }
  }
  static async deleteAll() {
    await fs.promises.writeFile(productsURL, JSON.stringify([]));
  }
}

module.exports = ProductosController;
