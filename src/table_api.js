const { Client } = require('node-rest-client');

const BASE_PATH = 'api/now/table';

function tableApiUrl(protocol, domain, tableName) {
  return `${protocol}://${domain}/${BASE_PATH}/${tableName}`;
}

function encodeCredentials(username, password) {
  return new Buffer(`${username}:${password}`).toString('base64');
}

function defaultRequestHeaders(username, password) {
  return {
    'Authorization': `Basic ${encodeCredentials(username, password)}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
}

class TableAPI {
  constructor(options, tableName) {
    this.tableName = tableName;
    this.options = options;
  }

  query(queryString) {
    const { tableName } = this;
    const { protocol, domain, username, password } = this.options;

    return new Promise((resolve, reject) => {
      new Client().get(tableApiUrl(protocol, domain, tableName), {
        headers: defaultRequestHeaders(username, password),
        parameters: {
          sysparm_query: queryString
        }
      }, (data, response) => {
        if (response.statusCode === 200) {
          resolve(data);
        } else {
          reject(response);
        }
      });
    });
  }

  post(attributes) {
    const { tableName } = this;
    const { protocol, domain, username, password } = this.options;

    return new Promise((resolve, reject) => {
      new Client().post(tableApiUrl(protocol, domain, tableName), {
        headers: defaultRequestHeaders(username, password),
        parameters: {
          data: attributes
        }
      }, (data, response) => {
        if (response.statusCode === 200) {
          resolve(data);
        } else {
          reject(response);
        }
      });
    });
  }
}

module.exports = TableAPI;
