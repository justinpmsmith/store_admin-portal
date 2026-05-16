import ServerBase from "./serverBase";
import config from "~/config";

class User extends ServerBase {
    static async authUser(data) {
        // data = {name, passwordHash}
    
        const endpoint = config.auththenticateEndpoint;
        const response = await this.postRequest(endpoint, data);

        console.log("response: ", response);

        if(response != null && response.meta.success) {
          console.log("passed if");
          let accessToken = await this.retrieveAccessToken(data.name, data.password, response.data);
          return accessToken;
        }


        return response;
      }
    
} export default User;