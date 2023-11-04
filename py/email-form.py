#!/usr/bin/python3.9

import cgi
import cgitb
import smtplib
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import ssl

# Enable error reporting for debugging
cgitb.enable()

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

        # Send email to 
        sender_email = 'sterlingconglomerate@gmail.com'  # Replace with your Gmail email address
        sender_password = 'skac exeu jdgd gcxn'  # Replace with your Gmail email password
        receiver_email = 'sterlingconglomerate@gmail.com'



        subject = 'New Form Submission'
        body = f"Name: {name}\nEmail: {email}\nMessage: {message}"

        # Connect to the Gmail server
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)

            # Create the email message
            email_message = f"Subject: {subject}\n\n{body}"

            # Send the email
            server.sendmail(sender_email, receiver_email, email_message)

            # Send a response email to the user
            response_subject = 'Thank You for Your Form Submission'
            response_body = 'Thank you for submitting the form. We will get back to you soon!'
            response_email_message = f"Subject: {response_subject}\n\n{response_body}"

            # Send the response email to the user
            server.sendmail(sender_email, email, response_email_message)



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
    server_address = ('', 4007)

    # Use SSL/TLS
    httpd = HTTPServer(server_address, RequestHandler)
    httpd.socket = ssl.wrap_socket(httpd.socket, certfile='/usr/local/apache2/htdocs/certs/live/bootblazers.com/fullchain.pem', keyfile='/usr/local/apache2/htdocs/certs/live/bootblazers.com/privkey.pem', server_side=True)
    print('Server running on port 4007 (HTTPS)...')
    httpd.serve_forever()

