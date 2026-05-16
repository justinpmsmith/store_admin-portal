import axios from "axios";
import config from "~/config";
import useSessionStore from "~/stores/session";
import { useRouter } from "vue-router";

class ServerBase {
  static accessToken = null;

  static async getServerPath() {
    return config.apiUrl;
  }

  static getAccessToken() {
    try {
      let sessionStore = useSessionStore();
      return sessionStore.getApiToken;
    } catch (error) {
      console.warn("Could not access session store:", error);
      return null;
    }
  }
  static async amAuthenticated() {
    const router = useRouter();
    const token = this.getAccessToken();
    console.log("checking if authenticated");
  
    // Check if token exists and is valid length
    if (!token || token.length < 10) {
      console.log("token does not exist");
      return false;
    }
  
    try {
      const url = (await this.getServerPath()) + "/admin/amAuth";
      console.log("token: " + token);
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // This prevents axios from throwing an error for any status code
        validateStatus: function (status) {
          return true; // Always resolve the promise regardless of status
        }
      };
  
      const response = await axios.request(config);
      console.log("amAuthenticated response status: " + response.status);
  
      if (response.status === 200) {
        return true;
      } else if (response.status === 401) {
        console.log("Authentication failed - token invalid or expired");
        return false;
      } else {
        console.log("Unexpected response status:", response.status);
        return false;
      }
    } catch (error) {
      // This will only catch network errors or other non-HTTP errors now
      console.error("Network or other error:", error);
      return false;
    }
  }
  static async getRequest(endpoint, params = null) {
    const isAdminEndpoint = endpoint.includes("admin");
    // if (isAdminEndpoint && !(await this.amAuthenticated())) {
    if (!(await this.amAuthenticated())) {
      await navigateTo("/admin");
      return null;
    }

    try {
      let url = (await this.getServerPath()) + endpoint;

      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      let headers = {};
      if (isAdminEndpoint) {
        const token = this.getAccessToken();
        headers.Authorization = `Bearer ${token}`;
      }

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: headers,
      };

      const response = await axios.request(config);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error(`${endpoint}: ${error.message}`);
      return null;
    }
  }

  static async postRequest(endpoint, data) {
    const isAdminEndpoint = endpoint.includes("admin");
    console.log("endpoint: " + endpoint);

    // if (!endpoint.includes(config.auththenticateEndpoint) && !(await this.amAuthenticated())) {
    //   await navigateTo("/admin");

    //   return null;
    // }
    try {
      const url = (await this.getServerPath()) + endpoint;
      console.log("post endpoint: " + url);

      let headers = {
        "Content-Type": "application/json",
      };

      if (isAdminEndpoint) {
        const token = this.getAccessToken();
        headers.Authorization = `Bearer ${token}`;
      }

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: url,
        headers: headers,
        data: JSON.stringify(data),
      };

      const response = await axios.request(config);
      console.log("post response: ", response);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error(`${endpoint}: ${error.message}`);
      return null;
    }
  }

  static async deleteRequest(endpoint, params = null) {
    const isAdminEndpoint = endpoint.includes("admin");

    if (!(await this.amAuthenticated())) {
      await navigateTo("/admin");
      return null;
    }

    try {
      let url = (await this.getServerPath()) + endpoint;

      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      let headers = {};
      if (isAdminEndpoint) {
        const token = this.getAccessToken();
        headers.Authorization = `Bearer ${token}`;
      }

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: url,
        headers: headers,
      };

      const response = await axios.request(config);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error(`${endpoint}: ${error.message}`);
      return null;
    }
  }

  static async retrieveAccessToken(username, password, clientSecret) {
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
}

export default ServerBase;
