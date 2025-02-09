import ServerBase from "./serverBase";

class User extends ServerBase {
    static async authUser(data) {
        // data = {name, passwordHash}
    
        const endpoint = "/client/authenticateUser";
        const response = await this.postRequest(endpoint, data);

        console.log("response: ", response);

        if(response != null && response.meta.success) {
          console.log("passed if");
          let accessToken = await this.getAccessToken(data.name, data.password, response.data);
          return accessToken;
        }


        return response;
      }
    
} export default User;