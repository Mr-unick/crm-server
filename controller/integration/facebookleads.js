const axios = require('axios');
const { Leads } = require('../../db/leadSchema');

// Replace with your actual credentials
const APP_ID = 3489115137898547;
const APP_SECRET = '0f01a8e7b2d947493a2695f2be62f1c1';
let userAccessToken = 'EAAxlVOxfZBDMBO06262UXZAtZAdCyTN1TNZCqdPZBJl5bxwymosp8ElOctz2N6mX2xUjYBBiZB00rZCdtAZCaOGWvuM5RZAlZCXfnrGvhPqqdvsA5oV5p4klWEfiQqiqdejicZB5nCPP0SzhqcXhwYSamaagf14cjJWw5SvRhFKQZCKlwanmnOUuvjUyWtz5bgZDZD';

function extractAllLeadsInfo(data) {
  return data.map(lead => {
      const leadInfo = {
          id: lead.id,
          created_time: lead.created_time,
      };


      lead.field_data.forEach(field => {
          const fieldName = field.name;
          const fieldValue = field.values[0]; // Assuming only one value per field
          leadInfo[fieldName] = fieldValue;
      });

      return leadInfo; // Return the constructed leadInfo object
  });
}

async function refreshAccessToken() {
    const url = `https://graph.facebook.com/v20.0/oauth/access_token`;
    
    const params = {
        grant_type: 'fb_exchange_token',
        client_id: APP_ID,
        client_secret: APP_SECRET,
        fb_exchange_token: userAccessToken
    };

    try {
        const response = await axios.get(url, { params });
        userAccessToken = response.data.access_token; // Update token
        console.log("New Access Token:", userAccessToken);
        return userAccessToken;
    } catch (error) {
        console.error("Error refreshing token:", error.response.data);
    }
}

async function getFacebookLeads() {

    // let token = refreshAccessToken();


    const url = `https://graph.facebook.com/v21.0/120206115178360120/leads?access_token=${userAccessToken}`;

    const response = await axios.get(url);
    let newdata=response.data;
    const countryCode = "+91"; // Replace with your actual country code

    function normalizePhoneNumber(phoneNumber) {
        // Remove non-digit characters
        const cleaned = phoneNumber.replace(/\D/g, '');
        
        // Check if it starts with the country code and remove it
        if (cleaned.startsWith(countryCode.replace('+', ''))) {
            return cleaned.replace(countryCode.replace('+', ''), '');
        }
        
        return cleaned; // Return cleaned number without the country code
    }
    

    try {
        let newLeadsData = extractAllLeadsInfo(newdata.data);
        await Promise.all(newLeadsData?.map(async lead => {
            // Normalize the phone number for both checks
            const normalizedWithCountryCode = lead?.phone_number?.replace(/\D/g, '');
            const normalizedWithoutCountryCode = normalizePhoneNumber(lead.phone_number);
    
            // Check if the lead already exists (either format)
            const exists = await Leads.findOne({
                $or: [
                    { phone: normalizedWithCountryCode },
                    { phone: normalizedWithoutCountryCode }
                ]
            });
    
            if (exists) {
                console.log("alredy exists")
                return; // If the lead exists, skip to the next one
            } else {
                // Create a new lead object
                const newLead = new Leads({
                    phone: normalizedWithCountryCode, // Save the phone number with country code
                    requirement: lead.requirement,
                    address: lead.city,
                    email: lead.email,
                    name: lead.full_name,
                    source: 'Ads',
                });
    
                try {
                    await newLead.save(); // Save the new lead to the database
                    console.log("New lead saved successfully:", newLead);
                } catch (err) {
                    console.error("Error saving new lead:", err);
                }
            }
        }));
    } catch (error) {
        console.error("Error processing leads:", error);
        // Attempt to refresh the token if it has expired
        if (error.response && error.response.status === 401) {
            await refreshAccessToken();
            await getAccounts(); // Retry after refreshing
        }
    }
    
 }
    

// Call the function to get accounts
module.exports={getFacebookLeads}
