const axios = require("axios");



// Send the POST request
const Wpmessage=async()=>{
  // Define your access token, phone number ID, and the recipient phone number
  const ACCESS_TOKEN =
    "EAAWS3FtfcdoBOy0e53gUudtSiZCjVGkT6AwyQmMuXwMbYjGQIM6kZBKeEZBCYHXadYbBBxGsQr0PnvDoHQf6ly8TkPzdBtBtYLyPDoseQMY3MRxKIKt7N3uBBhL2t4CEGaSRBHaBAElZAomZC7pLPwlBE9WYGSoqL6LENOSoZCFqQXkZCoUOScRsZCLbCKj9LzpJnpYZBbruvUxMhbHZBYCDg4";
  const PHONE_NUMBER_ID = "358462294012123";
  const RECIPIENT_PHONE_NUMBER = "+91 7448080267";

  // Define the API endpoint
  const url = `https://graph.facebook.com/v12.0/${PHONE_NUMBER_ID}/messages`;

  // Define the message payload
  const payload = {
    messaging_product: "whatsapp",
    to: RECIPIENT_PHONE_NUMBER,
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US", // Replace with your desired language code
      },
    },
  };

  // Define the headers
  const headers = {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };

  try {
   await axios.post(url, payload, { headers });
  } catch (e) {
    return console.log(e);
  }
}

module.exports={Wpmessage}
