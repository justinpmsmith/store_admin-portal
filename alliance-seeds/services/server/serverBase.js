import axios from "axios";
import config from "~/config";
import useSessionStore from "~/stores/session";
import { useRouter } from 'vue-router'

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
      console.warn('Could not access session store:', error);
      return null;
    }
  }
  static async amAuthenticated() {
    const router = useRouter();
    const token = this.getAccessToken();
    // console.log("amAuthenticated token: " + token);
  
    // Check if token exists and is valid length
    if (!token || token.length < 10) {
      // await navigateTo('/admin');
      return false;
    }
  
    try {
      const url = (await this.getServerPath()) + '/admin/amAuth';
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
      const response = await axios.request(config);
      return response.status === 200;
    } catch (error) {
      console.error('Authentication check failed:', error);
    }
    return false;

  }


  static async getRequest(endpoint, params = null) {
    if (endpoint.includes('admin') && !(await this.amAuthenticated())) {
      await navigateTo('/admin');
      return null;
    }
  
    try {
      const token = this.getAccessToken();
      let url = (await this.getServerPath()) + endpoint;
  
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }
  
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          'Authorization': token ? `Bearer ${token}` : undefined
        }
      };
  
      const response = await axios.request(config);
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error(`${endpoint}: ${error.message}`);
      return null;
    }
  }

  static async postRequest(endpoint, data) {
    if (endpoint.includes('admin') && !(await this.amAuthenticated())) {
      // await navigateTo('/admin');

      return null;
    }
  
    try {
      const token = this.getAccessToken();
      const url = (await this.getServerPath()) + endpoint;
  
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          "Content-Type": "application/json",
          'Authorization': token ? `Bearer ${token}` : undefined
        },
        data: JSON.stringify(data)
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
    if (endpoint.includes('admin') && !(await this.amAuthenticated())) {
      await navigateTo('/admin');
      return null;
    }
  
    try {
      const token = this.getAccessToken();
      let url = (await this.getServerPath()) + endpoint;
  
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }
  
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          'Authorization': token ? `Bearer ${token}` : undefined
        }
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
