const bizSdk = require("facebook-nodejs-business-sdk");
const access_token = process.env.ACCES_TOKEN;
const app_secret = process.env.APP_SECRET;
const app_id = process.env.APP_ID;
const id = "YOUR_LEAD_ID";
const api = bizSdk.FacebookAdsApi.init(access_token);

const showDebuggingInfo = true; // Setting this to true shows more debugging info.
if (showDebuggingInfo) {
  api.setDebug(true);
}

// Example function to get lead information
const Lead = bizSdk.Lead;
const fields = [];
const params = {};

Lead.get(id, fields, params)
  .then((lead) => {
    console.log("Lead details:", lead);
  })
  .catch((error) => {
    console.error("Error fetching lead:", error);
  });
