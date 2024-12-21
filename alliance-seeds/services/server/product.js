import ServerBase from "./serverBase";

class Product extends ServerBase {
  static async getAllProducts() {
    const endpoint = "/client/getAllProducts";
    const response = await this.getRequest(endpoint);
    return response;
  }

  static async getCategoryNames() {
    const endpoint = "/client/getCategoryNames";
    const response = await this.getRequest(endpoint);
    return response;
  }

  static async getProductsByCategory(){}
  static async deleteProductByProdCode(prodCode){
    const endpoint = '/client/deleteProductByProdCode';
    const params = { prodCode: prodCode };
    const response = this.deleteRequest(endpoint, params); 
    return response;
  }

}
export default Product;
