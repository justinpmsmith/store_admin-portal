import axios from "axios";
import config from "~/config";

class ServerBase {
  static async getServerPath() {
    return config.apiUrl;
  }

  static async getRequest(
    endpoint,
    retries = 3,
    params = null, // {param1: "value", param2: 222}
    timeout = 10000

  ) {
    try {
      retries += 1;
      let url = (await this.getServerPath()) + endpoint;

      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }
      console.log("endpoint: " + url);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {},
        timeout: timeout,
      };

      for (let attempt = 1; attempt <= retries; attempt++) {
        const response = await axios.request(config);

        if (response.status == 200) {
          return response.data;
        }
      }
    } catch (error) {
      var errMes = `${endpoint}: ${error.message}`;
      console.log(errMes);
    }

    return null;
  }

  static async postRequest(
    endpoint,
    data,
    retries = 3,
    timeout = 10000
  ) {
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
        timeout: timeout,
        data: JSON.stringify(data),
      };

      console.log("post config:");
      console.log(config);

      retries += 1; // lop starts at 1 so increment retries
      for (let attempt = 1; attempt <= retries; attempt++) {
        const response = await axios.request(config);

        if (response.status === 200) {
          return response.data; // Success
        }

        console.warn(
          `Request failed on attempt ${attempt} (status: ${response.status}). Retrying...`
        );
      }
    } catch (error) {
      const errMes = `${endpoint}: ${error.message}`;
      console.log(errMes);
    }

    console.error(`Failed to complete request after ${retries} retries.`);
    return null;
  }

  static async deleteRequest(
    endpoint,
    timeout = 5000
  ) {
    try {
      const url = (await this.getServerPath()) + endpoint;

      console.log("delete url: " + url);
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: url,
        timeout: timeout,
        headers: {},
      };
      const response = await axios.request(config);

      if (response.status == 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

export default ServerBase;
