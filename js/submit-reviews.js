import express from 'express';
import bodyParser from 'body-parser';
import { google } from 'googleapis';

// Rest of your code remains the same


const app = express();
const PORT = 4061;

// Middleware
app.use(bodyParser.json());

// Google Sheets authentication setup
const SERVICE_ACCOUNT_FILE = '/usr/local/apache2/htdocs/certs/key.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const creds = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_FILE,
  scopes: SCOPES,
});
let sheets;

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
  const { userName, productDropdown, reviewInput } = req.body;

  try {
    const auth = await creds.getClient();
    sheets = google.sheets({ version: 'v4', auth });

    // Call the function to log data to Google Sheets
    await logReviewSheets({ userName, productDropdown, reviewInput }, sheets);

    res.status(200).send('Data submitted successfully');
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).send('Error submitting data');
  }
});

async function logReviewSheets(data, sheets) {
  try {
    const auth = await creds.getClient();

    // Ensure that values in the 'data' object are arrays
    const values = Object.values(data).map(item => Array.isArray(item) ? item : [item]);

    const sheetsResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: 'YOUR_SPREADSHEET_ID', // Change this to your actual spreadsheet ID
      range: 'Reviews', // Change this to the appropriate sheet
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

async function getReviewsFromGoogleSheets() {
  try {
    const auth = await creds.getClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: 'YOUR_SPREADSHEET_ID', // Change this to your actual spreadsheet ID
      range: 'Reviews', // Change this to the appropriate sheet and range
    });

    const rows = response.data.values;
    if (rows.length) {
      const reviews = rows.map(row => ({
        userName: row[0],
        selectedProduct: row[1],
        reviewText: row[2],
        rating: parseInt(row[3], 10), // Assuming the rating is stored as a number in the spreadsheet
      }));
      return reviews;
    } else {
      console.log('No data found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return [];
  }
}

app.get('/reviews', async (req, res) => {
  const reviews = await getReviewsFromGoogleSheets();
  res.json(reviews);
});

// Function to fetch reviews from the server and update review boxes
async function updateReviewBoxesFromServer() {
  try {
    const response = await fetch('http://localhost:4061/reviews');
    const reviews = await response.json();

    // Assuming you have a function to update review boxes, replace this line with your actual function
    updateReviewBoxes(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
