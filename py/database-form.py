#!/usr/bin/python3.9

import cgi
import cgitb
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import ssl

sys.path.append('/usr/local/lib/python3.8/site-packages')

# Enable error reporting for debugging
cgitb.enable()
googleapiclient_dir = '/usr/local/lib/python3.8/site-packages'
from googleapiclient.discovery import build
from google.oauth2 import service_account
from datetime import datetime

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        parsed_data = parse_qs(post_data.decode('utf-8'))
        name = parsed_data.get('name', [''])[0]
        email = parsed_data.get('email', [''])[0]
        message = parsed_data.get('message', [''])[0]

        # Process the form data (you can replace this with your logic)
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Message: {message}")

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
            range="Messages"
        ).execute()

        values = result.get('values', [])
        next_row = len(values) + 1  # Determine the next available row

        # Include date and time in the message
        msg = [[name, email, message, current_date, current_time]]

        request = service.spreadsheets().values().update(
            spreadsheetId=SAMPLE_SPREADSHEET_ID,
            range=f"HU-Messages!A{next_row}",
            valueInputOption="USER_ENTERED",
            body={"values": msg}
        ).execute()


        # Send CORS headers in the response
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', 'https://honestups.com')  # Allow requests from the specified origin
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        # Send a response back to the client
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b"Form submitted successfully!")

if __name__ == '__main__':
    server_address = ('', 4008)

    # Use SSL/TLS
    httpd = HTTPServer(server_address, RequestHandler)
    httpd.socket = ssl.wrap_socket(httpd.socket, certfile='/usr/local/apache2/htdocs/certs/live/bootblazers.com/fullchain.pem', keyfile='/usr/local/apache2/htdocs/certs/live/bootblazers.com/privkey.pem', server_side=True)
    print('Server running on port 4008 (HTTPS)...')
    httpd.serve_forever()