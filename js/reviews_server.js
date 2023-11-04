import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import fs from "fs";
import https from "https";

const app = express();


// Use CORS middleware to allow all origins
app.use(cors());

// To parse JSON bodies (as sent by API clients)
app.use(express.json());


const SERVICE_ACCOUNT_FILE = '/usr/local/apache2/htdocs/certs/key.json';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SAMPLE_SPREADSHEET_ID = '1lHKLgpi5QhrkV10XyxqXH2gZ8ovbnFfCFLOktwpQC1s';
const SPREADSHEET_RATINGS_SHEET = 'Reviews' // Example: 'Sheet1'
// const lastSubmissionDate = localStorage.getItem('lastSubmissionDate') || null;

const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: SCOPES,
});

async function requestData() {
    try {
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SAMPLE_SPREADSHEET_ID,
            range: SPREADSHEET_RATINGS_SHEET, 
        });

        const sheetData = response.data.values;

        if (!sheetData.length) {
            console.log('No data found.');
            return;
        }

        // Process the sheetData as per your logic
        var columnNames = {};
        var result = [];

        // Assuming the first row contains column names
        for (var i = 0; i < sheetData[0].length; i++) {
            var key = sheetData[0][i];
            columnNames[key] = i;
        }

        for (var j = 1; j < sheetData.length; j++) {
            var rowData = {};
            for (var key in columnNames) {
                if (key === 'rating') { // Check if the current key is 'rating'
                    rowData[key] = parseInt(sheetData[j][columnNames[key]], 10); // Parse the rating value to an integer
                } else {
                    rowData[key] = sheetData[j][columnNames[key]];
                }
            }
            result.push(rowData);
        }

        // Initialize counters for each rating
        let ratingCounts = [0, 0, 0, 0, 0]; // Index 0 for 1-star, 1 for 2-stars, etc.

        // Iterate over the result array to count the ratings
        result.forEach(item => {
            const rating = item.rating;
            if (rating >= 1 && rating <= 5) {
                ratingCounts[rating - 1] += 1; // Increment the counter for the corresponding rating
            }
        });

        return { result, ratingCounts }; // Return both result and ratingCounts as an object

    } catch (error) {
        console.error('The API returned an error: ' + error);
        return { result: [], ratingCounts: [] }; // Return empty values in case of an error
    }
}

// Endpoint for fetching all data
app.get('/api/results', async (req, res) => {
    const { result, ratingCounts } = await requestData();
    if (result.length > 0) {
        res.json({ success: true, data: result });
    } else {
        res.status(404).json({ success: false, message: "No results found." });
    }
});

// Endpoint for fetching rating counts
app.get('/api/ratings', async (req, res) => {
    const { result, ratingCounts } = await requestData();
    if (ratingCounts.some(count => count > 0)) {
        res.json({ success: true, data: ratingCounts });
    } else {
        res.status(404).json({ success: false, message: "No ratings found." });
    }
});

const privateKey = fs.readFileSync('/usr/local/apache2/htdocs/certs/live/bootblazers.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/usr/local/apache2/htdocs/certs/live/bootblazers.com/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

const httpsPort = 4020;
httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS server is running on port ${httpsPort}`);
});