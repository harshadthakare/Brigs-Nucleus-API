const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const users = require("./controller/users");
const manufacturers = require("./controller/manufacturers");
const dashboard = require("./controller/dashboard");
const profile = require("./controller/profile");
const alerts = require("./controller/alerts");
const suppliers = require("./controller/suppliers");
const userroles = require("./controller/userroles");
const assets = require("./controller/assets");
const assetHome = require("./controller/assetHome");
const departments = require("./controller/departments");
const authorization = require("./controller/authorization");
const assetcategories = require("./controller/assetcategories");
const checklists = require("./controller/checklists");
const userCatAssign = require("./controller/userCatAssign");
const document = require("./controller/document");
const questions = require("./controller/questions");
const complaints = require("./controller/complaints");
const taskmate = require("./controller/taskmate");
const organization = require("./controller/organization");
const admin = require("./controller/admin");
const installationLocation = require("./controller/installationLocation");

var swaggerJSDoc = require('swagger-jsdoc');
const app = express();

// swagger definition 
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Hello i am swagger . I am one step ahead of postman. My job is to provide API description',
  },
  host: '192.168.0.125:8082',
  basePath: '/',
}


// options for swagger jsdoc 
var options = {
  swaggerDefinition: swaggerDefinition, // swagger definition
  apis: ['controller/*.js'],
};


// initialize swaggerJSDoc
var swaggerSpec = swaggerJSDoc(options);

// route for swagger.json
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', express.static('api-docs'))

var userImageDir = require('path').join('../allUploads/userImages');
app.use(express.static(userImageDir));

var assetImageDir = require('path').join('../allUploads/assetImages');
app.use(express.static(assetImageDir));

var userGuideDir = require('path').join('../allUploads/userGuide');
app.use(express.static(userGuideDir));

var alertImageDir = require('path').join('../allUploads/alertImages');
app.use(express.static(alertImageDir));

var categoryDocDir = require('path').join('../allUploads/documents');
app.use(express.static(categoryDocDir));

var complaintImageDir = require('path').join('../allUploads/complaintImages');
app.use(express.static(complaintImageDir));

var checklistImageDir = require('path').join('../allUploads/checklistImages');
app.use(express.static(checklistImageDir));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//API Routes
app.use("/users", users);
app.use("/dashboard", dashboard);
app.use("/manufacturers", manufacturers);
app.use("/profile", profile);
app.use("/alerts", alerts);
app.use("/suppliers", suppliers);
app.use("/userroles", userroles);
app.use("/assets", assets);
app.use("/assetHome", assetHome);
app.use("/departments", departments);
app.use("/authorization", authorization);
app.use("/assetcategories", assetcategories);
app.use("/checklists", checklists);
app.use("/userCatAssign", userCatAssign);
app.use("/document", document);
app.use("/questions", questions);
app.use("/complaints", complaints);
app.use("/taskmate", taskmate);
app.use("/organization", organization);
app.use("/admin", admin);
app.use("/installationLocation", installationLocation);

//if we are here then the specified request is not found
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//all other requests are not implemented.
app.use((err, req, res, next) => {
  res.status(err.status || 501);
  res.json({
    error: {
      code: err.status || 501,
      message: err.message
    }
  });
});

module.exports = app;