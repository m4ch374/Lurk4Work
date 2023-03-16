import { SERVER_ROUTE } from "./config.js";

class Fetcher {
  constructor(httpMethod, path) {
    this.path = SERVER_ROUTE + path;
    this.option = {
      method: httpMethod,
    };
  }

  withToken(token) {
    this.option.headers = {
      ...this.option.headers,
      "Authorization": `Bearer ${token}`,
    };

    return this;
  }

  withLocalStorageToken() {
    return this.withToken(localStorage.getItem('token'));
  }

  withQuery(key, value) {
    this.path += `?${key}=${value}`;
    return this;
  }

  withJsonPayload(payload) {
    this.option.body = JSON.stringify(payload);
    this.option.headers = {
      ...this.option.headers,
      "Content-type": "application/json",
    }
    return this;
  }

  fetchResult() {
    return new Promise((resolve, reject) => {
      fetch(this.path, this.option)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(e => reject(e));
    });
  }

  static get(path) {
    return new Fetcher("GET", path);
  }

  static post(path) {
    return new Fetcher("POST", path);
  }
}

export default Fetcher;
