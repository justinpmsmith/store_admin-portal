import ServerBase from "./serverBase";

class User extends ServerBase {
    static async authUser(data) {
        // data = {name, passwordHash}
    
        const endpoint = "/client/authenticateUser";
        const response = await this.postRequest(endpoint, data);
        return response;
      }
    
} export default User;