const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
const onestopUserModel = require("../models/userModel");
const msal = require('@azure/msal-node');
const request = require('request');
const { createOrFindOnestopUserID, getUserTokens } = require('./onestopUserController');
const REDIRECT_URI = "http://localhost:3000/test/onestopapi/v2/auth/microsoft/redirect";
const clientID = process.env.MICROSOFT_GRAPH_CLIENT_ID;
const tenantID = "https://login.microsoftonline.com/" + process.env.MICROSOFT_GRAPH_TENANT_ID;
const clientSecret = process.env.MICROSOFT_GRAPH_CLIENT_SECRET;
const config = {
  auth: {
    clientId: clientID,
    authority: tenantID,
    clientSecret: clientSecret
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Warning,
    }
  }
};

// Create msal application object
const pca = new msal.ConfidentialClientApplication(config);

exports.microsoftLogin = (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  // get url to sign user in and consent to scopes needed for application
  pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
    console.log(response);
    res.redirect(response);
  }).catch((error) => console.log(JSON.stringify(error)));
};

exports.microsoftLoginRedirect = (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read"],
    redirectUri: REDIRECT_URI,
  };

  pca.acquireTokenByCode(tokenRequest).then(async (response) => {
    // console.log("\nResponse: \n:", response);
    request.get({
      url: "https://graph.microsoft.com/v1.0/me",
      headers: {
        "Authorization": "Bearer " + response.accessToken
      }
    }, async function (err, resp, body) {
      console.log("here");
      if (err) {
        console.log(err);
        res.render('authSuccessView.ejs', { userInfo: "ERROR OCCURED" });
        return;
      }
      const userInfo = JSON.parse(body);
      console.log(userInfo);
      let userid = await createOrFindOnestopUserID(userInfo.displayName, userInfo.mail, userInfo.surname);
      let userTokens = await getUserTokens(userid);
      console.log(userTokens);
      const userTokensString = JSON.stringify(userTokens);
      console.log(userTokensString);
      // res.set('Authorization', `Bearer ${JSON.parse(userTokensString).accessToken}`);
      return res.render('authSuccessView.ejs', { userTokens: userTokensString });
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
}