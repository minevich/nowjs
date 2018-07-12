const readline = require('readline');
var inquirer = require("inquirer");

const config = require('./config.json');
const TableAPI = require('./src/table_api');

const DEFAULT_PROTOCOL = 'https';
const TABLE_NAME = 'u_iron_dome_request';

inquirer.prompt([{
  type: 'password',
  name: 'password',
  message: `Enter your ${config.instance} password`
}]).then(answers => {
  const options = {
    protocol: config.protocol || DEFAULT_PROTOCOL,
    domain: config.instance,
    username: config.username,
    password: answers.password
  };

  new TableAPI(options, TABLE_NAME).post({
    'sys_original.u_iron_dome_request.u_choice_job_type': 'Run Tests',
    'u_iron_dome_request.u_choice_job_type': 'Run Tests',
    'u_iron_dome_request.u_string_name': 'My iron dome request',
    //...
  })
    .then(data => {
      console.log('SUCCESS');
      console.log(data);
      process.exit(0);
    })
    .catch(response => {
      console.log('ERROR');
      console.log(response);
      process.exit(1);
    });
});
