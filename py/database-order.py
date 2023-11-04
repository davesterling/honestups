#!/usr/bin/python3.9

import cgi
import cgitb
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json
import ssl

sys.path.append('/usr/local/lib/python3.8/site-packages')

# Enable error reporting for debugging
cgitb.enable()
googleapiclient_dir = '/usr/local/lib/python3.8/site-packages'
from googleapiclient.discovery import build
from google.oauth2 import service_account
from datetime import datetime

class RequestHandler(BaseHTTPRequestHandler):
        
    def do_OPTIONS(self):
        # Send CORS headers in the response to the OPTIONS request
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', 'https://bootblazers.com')  # Allow requests from any origin
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # Check if 'Content-Length' header is present before trying to read the data
        if 'Content-Length' in self.headers:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            parsed_data = parse_qs(post_data.decode('utf-8'))
            self.confirmation = parsed_data.get('confirmation', [''])[0]
            cart_items = parsed_data.get('cartItems', [])
            
            # Process the cart items data (you can replace this with your logic)
            items_data = [[item] for item in cart_items]
            print(f"Cart Items (OPTIONS): {items_data}")
            print(f"Confirmation #: {self.confirmation}")
            # Send a response back to the client
            self.wfile.write(b"Cart items submitted successfully!")
            
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        parsed_data = json.loads(post_data.decode('utf-8'))

        # Extract cart items from the parsed data
        cart_items = parsed_data.get('cartItems', [])

        # Process the cart items data
        formatted_items = []

        for item in cart_items:
            price_value = item.get('price', '')
            quantity_value = item.get('quantity', '')
            title_value = item.get('title', '')

            formatted_item = [[title_value], [quantity_value], [price_value]]
            formatted_items.append(formatted_item)

        print(f"Cart Items: {cart_items}")
        print(f"Formatted Cart Items: {formatted_items}")

        # Update Google Sheets
        self.update_google_sheets(formatted_items)

        # Send CORS headers in the response
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', 'https://bootblazers.com')  # Allow requests from any origin
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        # Send a response back to the client
        self.wfile.write(b"Cart items submitted successfully!")

    def update_google_sheets(self, formatted_items):
        # Your Google Sheets API code here
        SERVICE_ACCOUNT_FILE = '/usr/local/apache2/htdocs/certs/key.json'
        SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
        creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        SAMPLE_SPREADSHEET_ID = '1lHKLgpi5QhrkV10XyxqXH2gZ8ovbnFfCFLOktwpQC1s'
        service = build('sheets', 'v4', credentials=creds)

        # Get the current date and time
        current_date = datetime.now().strftime('%Y-%m-%d')
        current_time = datetime.now().strftime('%H:%M:%S')
    

        # Get the existing data to determine the next row
        result = service.spreadsheets().values().get(
            spreadsheetId=SAMPLE_SPREADSHEET_ID,
            range="Preorders"
        ).execute()

        values = result.get('values', [])
        next_row = len(values) + 1  # Determine the next available row, starting at A2

        # Preprocess cart items into separate columns
        items_data = []
        for item in formatted_items:
            items_data.append([self.confirmation, item[0][0], item[1][0], item[2][0], current_date, current_time])

        request = service.spreadsheets().values().update(
            spreadsheetId=SAMPLE_SPREADSHEET_ID,
            range=f"Preorders!A{next_row}:C{next_row + len(formatted_items) - 1}",
            valueInputOption="USER_ENTERED",
            body={"values": items_data}
        ).execute()

        print(f"Preorder items logged!")

if __name__ == '__main__':
    from http.server import HTTPServer
    server_address = ('', 4005)

    # Use SSL/TLS
    httpd = HTTPServer(server_address, RequestHandler)
    httpd.socket = ssl.wrap_socket(httpd.socket, certfile='/usr/local/apache2/htdocs/certs/live/bootblazers.com/fullchain.pem', keyfile='/usr/local/apache2/htdocs/certs/live/bootblazers.com/privkey.pem', server_side=True)
    print('Server running on port 4005 (HTTPS)...')
    httpd.serve_forever()
