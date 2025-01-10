var elasticsearch = require('@elastic/elasticsearch');

var client = new elasticsearch.Client({
  cloud: {
    id: process.env.ELASTIC_CLOUDID
  },
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD
  },
  ssl: {
    rejectUnauthorized: false
  }
});
module.exports = client;  
