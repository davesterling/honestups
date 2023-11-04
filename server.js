import https from "https";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import stripeSdk from 'stripe';
import nodemailer from 'nodemailer';

import { google } from 'googleapis';

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'css'), { 'Content-Type': 'text/css' }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Home Route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "/" });
});

// Success
app.get("/success", (req, res) => {
  res.sendFile("success.html", { root: "/" });
});

// Cancel
app.get("/cancel", (req, res) => {
  res.sendFile("cancel.html", { root: "/" });
});







const pp = express.Router();
// Stripe
let stripeGateway = stripeSdk(process.env.stripe_api);
let stripeWebhook = stripeSdk(process.env.stripe_api); // Use a different variable for webhook
let DOMAIN = process.env.DOMAIN;

const stripe = stripeSdk(process.env.stripe_api);




// Stripe checkout route
app.post("/stripe-checkout", async (req, res) => {
  const lineItems = req.body.items.map((item, index) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
      },
      unit_amount: parseInt(item.price.replace(/[^0-9.-]+/g, "") * 100),
    },
    quantity: item.quantity,
    tax_rates: [
      'txr_1OYH0SCcJrRwOlNjddBtVLTz',
    ],
  }));

  console.log("lineItems:", lineItems);

  // Combine line items into a single metadata object
  const metadata = req.body.items.reduce((acc, item, index) => {
    return {
      ...acc,
      [`line_items_${index}`]: JSON.stringify({
        title: item.title,
        productImg: item.productImg,
        quantity: item.quantity,
        price: item.price,
      }),
    };
  }, {});

  // Create Checkout Session
  const session = await stripeGateway.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    allow_promotion_codes: true,
    success_url: `${DOMAIN}/success.html`,
    cancel_url: `${DOMAIN}/cancel.html`,
    line_items: lineItems,
    billing_address_collection: "required",
    metadata: metadata,
     // Add this line for shipping rate
 
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        /*
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Priority Mail',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },*/
      },
    ],

    shipping_address_collection: {
        allowed_countries: ['US'], 
    },
  });

  res.json(session.url);
});








// Use the provided credentials and spreadsheet ID
const SERVICE_ACCOUNT_FILE = '/usr/local/apache2/htdocs/certs/key.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const creds = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: SCOPES,
});

const SAMPLE_SPREADSHEET_ID = '1lHKLgpi5QhrkV10XyxqXH2gZ8ovbnFfCFLOktwpQC1s';

async function logDataToGoogleSheet(data, sheets) {
  try {
    const auth = await creds.getClient();

    // Ensure that values in the 'data' object are arrays
    const values = Object.values(data).map(item => Array.isArray(item) ? item : [item]);

    const sheetsResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: SAMPLE_SPREADSHEET_ID,
      range: 'Sales', // Change this to the appropriate sheet
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: values.map(item => item.map(String)), // Convert all values to strings
      },
      auth: auth,
    });

    console.log('Data logged to Google Sheet:', sheetsResponse.data);
  } catch (error) {
    console.error('Error logging data to Google Sheet:', error.message);
  }
}














  
app.use(pp);

const sheets = google.sheets('v4');
// Stripe webhook handling
app.post('/stripe-webhook', express.json(), async (req, res) => {
  try {
    // Parse the raw body as JSON manually
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const body = JSON.parse(rawBody);

    // Log each field of the raw body as a variable
    Object.entries(body).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });

    const entriesToLog = ['amount_subtotal', 'amount_total', 'customer_details', 'metadata', 'total_details'];
    const objectData = req.body.data.object;

    entriesToLog.forEach((key) => {
      if (objectData[key] !== undefined) {
        console.log(`${key}:`, objectData[key]);
      } else {
        console.log(`${key} not found in body`);
      }
    });



    const metadata = req.body.data.object.metadata;
    if (!metadata) {
      console.log('Metadata not found in body');
      return res.status(400).end('Bad Request: Metadata not found');
    }

    const formattedItems = [];
    const formattedItemsForEmail = []; // New array to store items in a format suitable for the email
    
    for (let i = 0; i < Object.keys(metadata).length; i++) {
      const key = `line_items_${i}`;
      if (metadata[key]) {
        const parsedItem = JSON.parse(metadata[key]);
        const { title, quantity, price } = parsedItem;
    
        // Push the item in the original format (for Google Sheets)
        formattedItems.push([title, quantity, price]);
    
        // Push the item in a string format (for the email)
        formattedItemsForEmail.push(`${quantity} x ${title} - ${price}`);
      } else {
        console.log(`${key} not found in metadata`);
      }
    }

    
    // Store the items in the original format in dataToLog
    const dataToLog = {};
    formattedItems.forEach((item, index) => {
      dataToLog[`line_items_${index}`] = item;
    });
    
    // Store the items in a string format suitable for the email
    objectData.formatted_items = formattedItemsForEmail;
    

 

    dataToLog['amount_subtotal'] = (objectData['amount_subtotal'] / 100).toFixed(2);
    dataToLog['amount_total'] = (objectData['amount_total'] / 100).toFixed(2);
    
    // Add customer details to log
    const customerDetails = objectData['customer_details'];
    if (customerDetails) {
      dataToLog['customer_name'] = customerDetails['name'];
      dataToLog['customer_email'] = customerDetails['email'];
      dataToLog['customer_address'] = getAddressString(customerDetails['address']);
      dataToLog['customer_phone'] = customerDetails['phone'];
      dataToLog['customer_tax_exempt'] = customerDetails['tax_exempt'];
      dataToLog['customer_tax_ids'] = customerDetails['tax_ids'].join(', ');
    }

    // Add total details to log
    const totalDetails = objectData['total_details'];
    if (totalDetails) {
      dataToLog['discount'] = (totalDetails['amount_discount'] / 100).toFixed(2);
      dataToLog['shipping'] = (totalDetails['amount_shipping'] / 100).toFixed(2);
      dataToLog['tax'] = (totalDetails['amount_tax'] / 100).toFixed(2);
    }
    // Add date and time fields
const currentDateTime = new Date();
dataToLog['date'] = currentDateTime.toISOString().split('T')[0];
dataToLog['time'] = currentDateTime.toTimeString().split(' ')[0];

// Add confirmation number
dataToLog['confirmation_number'] = generateConfirmationNumber();










const saleSubmission = formattedItems.reduce((result, item, index) => {
  const isFirstItem = index === 0;
  const lineItemRow = [
    dataToLog['confirmation_number'],
    'Open',
    item[0], // Display title for all line items
    item[1], // Display quantity for all line items
    item[2], // Display price for all line items
    isFirstItem ? dataToLog['shipping'] : '', // Display shipping only for the first line item
    isFirstItem ? dataToLog['discount'] : '', // Display discount only for the first line item
    isFirstItem ? dataToLog['tax'] : '', // Display tax only for the first line item
    isFirstItem ? dataToLog['amount_subtotal'] : '', // Display subtotal only for the first line item
    isFirstItem ? dataToLog['amount_total'] : '', // Display total only for the first line item
    isFirstItem ? dataToLog['date'] : '', // Display date only for the first line item
    isFirstItem ? dataToLog['time'] : '', // Display time only for the first line item
    isFirstItem ? dataToLog['customer_name'] : '', // Display customer_name only for the first line item
    isFirstItem ? dataToLog['customer_address'] : '', // Display customer_address only for the first line item
    isFirstItem ? dataToLog['customer_email'] : '', // Display customer_email only for the first line item
    isFirstItem ? dataToLog['customer_phone'] : '', // Display customer_phone only for the first line item
  ];

  return result.concat([lineItemRow]);
}, []);











function generateConfirmationNumber() {
  const randomDigits = Math.floor(Math.random() * 9000000000) + 1000000000; // 10 random digits
  const confirmationNumber = `${randomDigits}${Date.now()}${randomDigits}`.slice(0, 10);
  return confirmationNumber;
}
 

    // Log data to Google Sheet
    await logDataToGoogleSheet(saleSubmission, sheets);
    await sendOrderConfirmationEmail(objectData, dataToLog);
    // Send an immediate response to Stripe after handling the webhook
    res.status(200).end();
  } catch (error) {
    console.error('Error handling Stripe webhook:', error);

    // Log the error details for debugging
    console.error('Error Details:', error.message, error.stack);

    // Send an error response with a more detailed message
    res.status(500).send('Internal Server Error: ' + error.message);
  }
});









async function sendOrderConfirmationEmail(objectData, dataToLog) {
  // Extract data for the email
  const emailData = {
    amount_total: objectData['amount_total'],
    confirmation_number: dataToLog['confirmation_number']
  };

  const customerDetails = objectData['customer_details'];
  if (customerDetails) {
    emailData['customer_name'] = customerDetails['name'];
    emailData['customer_email'] = customerDetails['email'];
    emailData['customer_address'] = getAddressString(customerDetails['address']);
    emailData['customer_phone'] = customerDetails['phone'];
    emailData['customer_tax_exempt'] = customerDetails['tax_exempt'];
    emailData['customer_tax_ids'] = customerDetails['tax_ids'].join(', ');
  }

  // Create the email message
  const emailSubject = 'Your Order is Placed!';
  const emailBody = `
    <b><p style="text-align: center; font-size: 30pt;">Thank You for Choosing Boot Blazers!</p></b>
    <u><p style="text-align: center; font-size: 20pt;">Confirmation #</p></u>
    <b><p style="text-align: center; font-size: 20pt;">${emailData.confirmation_number}</p></b>
    <p style="font-size: 15pt; text-align: center;">We will begin processing your order now.</p>

    <br>

    <p style="font-size: 15pt;">Order Details:</p>
    <p style="font-size: 15pt;">Shipping to: ${emailData.customer_name}</p>
    <p style="font-size: 15pt;">Contact Email: ${emailData.customer_email}</p>
    <p style="font-size: 15pt;">Shipping Address: ${emailData.customer_address}</p>

    
    <p style="font-size: 15pt;">Items:</p>
    <ul>
    ${objectData.formatted_items && Array.isArray(objectData.formatted_items)
      ? objectData.formatted_items.map(item => `<li>${item}</li>`).join('')
      : '<li>No items found</li>'
    }
  </ul>

  <p style="font-size: 15pt; text-align: right;">Subtotal: ${(objectData.amount_subtotal / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>    
  <p style="font-size: 15pt; text-align: right;">Discount: ${(objectData.total_details.amount_discount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
  <p style="font-size: 15pt; text-align: right;">Shipping: ${(objectData.total_details.amount_shipping / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
  <p style="font-size: 15pt; text-align: right;">Tax: ${(objectData.total_details.amount_tax / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
  <p style="font-size: 15pt; text-align: right;">Total: ${(objectData.amount_total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
  

    <br>


    <p style="font-size: 15pt;">Thank you for your trust  in Boot Blazers. If you have any questions, feel free to reach out to us
      <a href="https://bootblazers.com/contact.html" style="color: red; text-decoration: underline;">HERE</a>
    </p>
  
    <p style="text-align: center; font-size: 15pt;">
      <a href="https://bootblazers.com" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 15pt; border-radius: 8px; transition: background-color 0.3s;">
        Back to Boot Blazers
      </a>
    </p>
  `;

  // Configuring the nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sterlingconglomerate@gmail.com',  // replace with your Gmail email address
      pass: 'skac exeu jdgd gcxn'              // replace with your Gmail app password or account password
    }
  });

  // Email options
  const mailOptions = {
    from: 'sterlingconglomerate@gmail.com',  // replace with your Gmail email address
    to: emailData['customer_email'],
    subject: emailSubject,
    html: emailBody
  };
  console.log('Formatted Items:', objectData.formatted_items);
  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    // Pass data to the log function
    logOrderDetails(objectData, emailData);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}



// Function to log order details
function logOrderDetails(objectData, emailData) {
  const dataToLog = {};

  // Log line items
  const formattedItems = objectData['formatted_items'] || [];
  formattedItems.forEach((item, index) => {
    dataToLog[`line_items_${index}`] = item;
  });

  // Add other items to log
  dataToLog['amount_subtotal'] = objectData['amount_subtotal'];
  dataToLog['amount_total'] = objectData['amount_total'];

  // Add customer details to log
  const customerDetails = objectData['customer_details'];
  if (customerDetails) {
    dataToLog['customer_name'] = customerDetails['name'];
    dataToLog['customer_email'] = customerDetails['email'];
    dataToLog['customer_address'] = getAddressString(customerDetails['address']);
    dataToLog['customer_phone'] = customerDetails['phone'];
    dataToLog['customer_tax_exempt'] = customerDetails['tax_exempt'];
    dataToLog['customer_tax_ids'] = customerDetails['tax_ids'].join(', ');
  }




// After sending the confirmation email to the customer
try {
  (async () => {
    // Configuring the nodemailer transporter for the second email
    const secondTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sterlingconglomerate@gmail.com',  // replace with your Gmail email address
        pass: 'skac exeu jdgd gcxn'              // replace with your Gmail app password or account password
      }
    });

    // Email options for the second email
    const secondMailOptions = {
      from: 'sterlingconglomerate@gmail.com',
      to: 'sterlingconglomerate@gmail.com',  // replace with the email where you want to send the notification
      subject: 'New BB Order Placed',
      html: `
        <b><p style="text-align: center; font-size: 20pt;">New Order Placed!</p></b>
        <p style="font-size: 15pt;">Order Details:</p>
        <p style="font-size: 15pt;">Customer Name: ${emailData.customer_name}</p>
        <p style="font-size: 15pt;">Customer Email: ${emailData.customer_email}</p>
        <p style="font-size: 15pt;">Items:</p>
        <ul>
          ${objectData.formatted_items && Array.isArray(objectData.formatted_items) ? objectData.formatted_items.map(item => `<li>${item}</li>`).join('') : ''}
        </ul>

        <p style="font-size: 15pt; text-align: right;">Subtotal: ${(objectData.amount_subtotal / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>    
        <p style="font-size: 15pt; text-align: right;">Discount: ${(objectData.total_details.amount_discount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        <p style="font-size: 15pt; text-align: right;">Shipping: ${(objectData.total_details.amount_shipping / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        <p style="font-size: 15pt; text-align: right;">Tax: ${(objectData.total_details.amount_tax / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        <p style="font-size: 15pt; text-align: right;">Total: ${(objectData.amount_total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>


      `
    };

    // Send the second email
    const secondInfo = await secondTransporter.sendMail(secondMailOptions);
    console.log('Second Email sent: ' + secondInfo.response);
  })();
} catch (secondError) {
  console.error('Error sending second email:', secondError);
}






  // Add total details to log
  const totalDetails = objectData['total_details'];
  if (totalDetails) {
    dataToLog['discount'] = totalDetails['amount_discount'];
    dataToLog['shipping'] = totalDetails['amount_shipping'];
    dataToLog['tax'] = totalDetails['amount_tax'];
  }
}




   function getAddressString(address) {
      const addressArray = [
        address['line1'],
        address['line2'],
        address['city'],
        address['state'],
        address['postal_code'],
        address['country']
      ].filter(Boolean); // Filter out undefined or empty values
      return addressArray.join(',\n');
    }





const endpointSecret = 'whsec_5T9sfoqPLCqvPGfmQfDl3FKyhGxxKhue';
const privateKey = fs.readFileSync('/usr/local/apache2/htdocs/certs/live/bootblazers.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/usr/local/apache2/htdocs/certs/live/bootblazers.com/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

const httpsPort = 4006;
httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS server is running on port ${httpsPort}`);
});
