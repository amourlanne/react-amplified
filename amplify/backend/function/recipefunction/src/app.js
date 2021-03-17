/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_RECIPETABLE_ARN
	STORAGE_RECIPETABLE_NAME
Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
var cors = require('cors')
app.use(cors())  // for avoiding CORS in local dev
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())


// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

function id () {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

app.get('/recipe', function(req, res) {
  var params = {
    TableName: process.env.STORAGE_RECIPETABLE_NAME
  }
  docClient.scan(params, function(err, result) {
    if (err) res.json({ err })
    else res.json({ data: result.Items })
  })
});

app.get('/recipe/:recipeId', function(req, res) {
  var params = {
    TableName: process.env.STORAGE_RECIPETABLE_NAME,
    Key: {
      id: req.params.recipeId
    }
  }
  docClient.get(params, function(err, result) {
    if (err) res.json({ err })
    else res.json({ data: result.Item })
  })
});

app.post('/recipe', function(req, res) {
  if(!req.body.name || !req.body.ingredients || !req.body.preparation) {
    return res.status(400).json({ err: "Bad request" })
  }
  var params = {
    TableName : process.env.STORAGE_RECIPETABLE_NAME,
    Item: {
      id: id(),
      name: req.body.name,
      ingredients: req.body.ingredients,
      preparation: req.body.preparation
    }
  }
  docClient.put(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({ success: 'Recipe created successfully!' })
  })
});

app.delete('/recipe/:recipeId', function(req, res) {
  var params = {
    TableName : process.env.STORAGE_RECIPETABLE_NAME,
    Key: {
      id: req.params.recipeId,
    }
  }
  docClient.delete(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({ success: 'Recipe deleted successfully!' })
  })
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
