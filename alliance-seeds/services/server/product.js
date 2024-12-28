import ServerBase from "./serverBase";

class Product extends ServerBase {
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

  static async addCtegory(data) {
    // data = {name: "string", photo: "base64 string"}
    const endpoint = "/client/addCategory";
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
    // };

    const endpoint = "/client/addProduct";
    const response = await this.postRequest(endpoint, data);
    return response;
  }
  static async updateCategory(data) {
    // data = {name: "string", photo: "base64 string"}
    const endpoint = "/client/updateCategory";
    const response = await this.postRequest(endpoint, data);
    return response;
  }

  static async deleteCategory(categoryName) {
    const endpoint = "/client/deleteCategoryByName";
    const params = { name: categoryName };
    const response = await this.deleteRequest(endpoint, params);
    return response;
  }

  static async deleteProductByProdCode(prodCode) {
    const endpoint = "/client/deleteProductByProdCode";
    const params = { prodCode: prodCode };
    const response = await this.deleteRequest(endpoint, params);
    return response;
  }
}
export default Product;
