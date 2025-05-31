import ServerBase from "./serverBase";

class Product extends ServerBase {
  static async getProductsByCategory(category) {
    const endpoint = "/getProductsByCategory";
    const params = { category: category };
    return await this.getRequest(endpoint, params);
  }

  static async getAllProducts() {
    const endpoint = "/client/getAllProducts";
    const response = await this.getRequest(endpoint);
    return response;

    // response = [
    //   {
    //     prodCode: "string",
    //     category: "string",
    //     name: "string",
    //     document: "base64 string",
    //     info: "json string",
    //     quantity: int,
    //   },
    // ]
  }

  static async getProdCodesByCategory(category) {
    const endpoint = "/client/getCategoryProdCodes";
    const params = { category: category };
    return await this.getRequest(endpoint, params);
  }

  static async getCategpryNames() {
    const endpoint = "/client/getCategoryNames";
    return await this.getRequest(endpoint);
  }

  static async getCategoryNames() {
    const endpoint = "/client/getCategoryNames";
    const response = await this.getRequest(endpoint);
    return response;
    // response = ["cat1", "cat2"]
  }

  static async getCategoryByName(category) {
    const endpoint = "/client/getCategoryByName";
    const params = { name: category };

    const response = await this.getRequest(endpoint, params);
    return response;

    // response = {
    //     "id": 1,
    //     "name": "TOMATOES",
    //     "photo": "base64 string"
    // }
  }

  static async getProductsByCategory(category) {
    const endpoint = "/client/getProductsByCategory";
    const params = { category: category };
    const response = await this.getRequest(endpoint, params);
    return response;

    // response = [
    //   {
    //     prodCode: "string",
    //     category: "string",
    //     name: "string",
    //     document: "base64 string",
    //     info: "json string",
    //     quantity: int,
    //   },
    // ]
  }
  static async getProductByProdCode(prodCode) {
    const endpoint = "/client/getProductByProdCode";
    const params = { prodCode: prodCode };
    const response = await this.getRequest(endpoint, params);
    return response;

    // response = {
    //     prodCode: "string",
    //     category: "string",
    //     name: "string",
    //     document: "base64 string",
    //     info: "json string",
    //     quantity: int,
    //   }
  }

  static async getSoldProducts() {
    const endpoint = "/admin/getSoldProducts";
    const response = await this.getRequest(endpoint);
    return response;

    // response = [
    //       {
    //         "id": 1,
    //         "dateSold": "2025-03-09T14:21:42.884852",
    //         "prodCode": "PURMEL",
    //         "category": "MELON",
    //         "name": "Purple Melon",
    //         "photos": "base64 string",
    //         "price": 20.0,
    //         "document": "{\"name\":\"\",\"content\":null}",
    //         "info": "{\"description\":\"grape flavoured melon\"}",
    //         "quantity": 1,
    //         "customerName": "Justin Smith",
    //         "customerEmail": "justinpmsmith10@gmail.com",
    //         "customerAddress": "11 klapper street"
    //     }
    // ]
  }

  static async getSoldProductById(id) {
    const params = { id: id };
    const endpoint = "/admin/getSoldProductById";
    const response = await this.getRequest(endpoint, params);
    return response;

    // response =
    //       {
    //         "id": 1,
    //         "dateSold": "2025-03-09T14:21:42.884852",
    //         "prodCode": "PURMEL",
    //         "category": "MELON",
    //         "name": "Purple Melon",
    //         "photos": "base64 string",
    //         "price": 20.0,
    //         "document": "{\"name\":\"\",\"content\":null}",
    //         "info": "{\"description\":\"grape flavoured melon\"}",
    //         "quantity": 1,
    //         "customerName": "Justin Smith",
    //         "customerEmail": "justinpmsmith10@gmail.com",
    //         "customerAddress": "11 klapper street"
    //     }
  }

  static async addCtegory(data) {
    // data = {name: "string", photo: "base64 string"}
    const endpoint = "/admin/addCategory";
    const response = await this.postRequest(endpoint, data);
    return response;
  }

  static async addProduct(data) {
    // let data = {
    //   name: this.productName,
    //   prodCode: this.prodCode,
    //   category: this.category,
    //   info: { description: this.description },
    //   photos: JSON.stringify(images),
    //   quantity: this.quantity,
    //   document: json string
    // };

    const endpoint = "/admin/addProduct";
    const response = await this.postRequest(endpoint, data);
    return response;
  }

  static async updateProduct(data) {
    // let data = {
    //   name: this.productName,
    //   prodCode: this.prodCode,
    //   category: this.category,
    //   info: { description: this.description },
    //   photos: JSON.stringify(images),
    //   quantity: this.quantity,
    //   document: json string
    // };

    const endpoint = "/admin/updateProduct";
    const response = await this.postRequest(endpoint, data);
    return response;
  }
  static async updateCategory(data) {
    // data = {name: "string", photo: "base64 string"}
    const endpoint = "/admin/updateCategory";
    const response = await this.postRequest(endpoint, data);
    return response;
  }

  static async deleteCategory(categoryName) {
    const endpoint = "/admin/deleteCategoryByName";
    const params = { name: categoryName };
    const response = await this.deleteRequest(endpoint, params);
    return response;
  }

  static async deleteProductByProdCode(prodCode) {
    // prodCode = "string prodCode"
    const endpoint = "/admin/deleteProductByProdCode";
    const params = { prodCode: prodCode };
    const response = await this.deleteRequest(endpoint, params);
    return response;
  }
}
export default Product;
