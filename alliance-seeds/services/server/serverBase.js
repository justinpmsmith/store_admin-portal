import axios from "axios";
import config from "~/config";

class ServerBase {
  static async getServerPath() {
    return config.apiUrl;
  }

  static async getRequest(endpoint, params = null, admin = false) {
    try {
      let url = (await this.getServerPath()) + endpoint;

      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {},
      };

      const response = await axios.request(config);

      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      var errMes = `${endpoint}: ${error.message}`;
      console.log(errMes);
    }

    return null;
  }

  static async postRequest(endpoint, data, admin = false) {
    try {
      var url = (await this.getServerPath()) + endpoint;
      console.log("post url: " + url);

      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      };

      const response = await axios.request(config);

      if (response.status === 200) {
        return response.data; // Success
      }
    } catch (error) {
      const errMes = `${endpoint}: ${error.message}`;
      console.log(errMes);
    }

    return null;
  }

  static async deleteRequest(endpoint, params = null, admin = false) {
    try {
      let url = (await this.getServerPath()) + endpoint;

      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: url,
        headers: {},
      };

      const response = await axios.request(config);

      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      var errMes = `${endpoint}: ${error.message}`;
      console.log(errMes);
    }

    return null;
  }

  static async getAccessToken(username, password, clientSecret) {
    try {
      const tokenUrl =
        "https://keycloack.code-smith.co.za/auth/realms/codesmith/protocol/openid-connect/token";
      const clientId = "allianceseeds";

      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("client_id", clientId);
      params.append("client_secret", clientSecret);
      params.append("username", username);
      params.append("password", password);

      const config = {
        method: "post",
        url: tokenUrl,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: params,
      };

      const response = await axios.request(config);

      if (response.status === 200 && response.data.access_token) {
        return {
          meta: { success: true },
          data: response.data.access_token,
        };
      }

      return {
        meta: { success: false },
        data: null,
      };
    } catch (error) {
      console.error("Error getting access token:", error.message);
      return {
        meta: { success: false },
        data: null,
      };
    }
  }

  static async amAuthenticated() {}
}

export default ServerBase;
