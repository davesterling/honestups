#!/usr/bin/python3.9

import cgi
import cgitb
import smtplib
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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
        confirmation = parsed_data.get('confirmation', [''])[0]
        # Process the form data (you can replace this with your logic)
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Message: {message}")
        print(f"Confirmation #: {confirmation}")

        # Send email to sterlingconglomerate@gmail.com
        sender_email = 'sterlingconglomerate@gmail.com'  # Replace with your Gmail email address
        sender_password = 'skac exeu jdgd gcxn'  # Replace with your Gmail email password
        receiver_email = 'sterlingconglomerate@gmail.com'

        subject = 'New Preorder'f"\nConfirmation: {confirmation}"
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
          

            # Email subject and body
            response_subject = 'Your Order is Placed!'
            response_body = f'''
            <b><p style="text-align: center; font-size: 30pt;">Thank You for Choosing Boot Blazers!</p></b>
            <u><p style="text-align: center; font-size: 20pt;">Confirmation #</p></u>
            <b><p style="text-align: center; font-size: 20pt;">{confirmation}</p></b>
            <p style="font-size: 15pt;">We will begin processing your order now.</p>

            <br>

            <p style="font-size: 15pt;">Thank you for your trust in Boot Blazers. If you have any questions, feel free to reach out to us at (680) 223-8961.</p>

            <br>

            <a href="https://bootblazers.com" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 15pt;">Back to Bootblazer.com</a>
            '''

            # Create the MIME object
            message = MIMEMultipart()
            message['From'] = sender_email
            message['To'] = email
            message['Subject'] = response_subject

            # Attach the HTML body
            message.attach(MIMEText(response_body, 'html'))

            # Connect to the SMTP server
            with smtplib.SMTP('smtp.gmail.com', 587) as server:
                server.starttls()
                server.login(sender_email, sender_password)

                # Send the email
                server.sendmail(sender_email, email, message.as_string())




        # Send CORS headers in the response
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', 'https://bootblazers.com')  # Allow requests from the specified origin
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

        # Send a response back to the client
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b"Form submitted successfully!")

if __name__ == '__main__':
    server_address = ('', 4004)

    # Use SSL/TLS
    httpd = HTTPServer(server_address, RequestHandler)
    httpd.socket = ssl.wrap_socket(httpd.socket, certfile='/usr/local/apache2/htdocs/certs/live/bootblazers.com/fullchain.pem', keyfile='/usr/local/apache2/htdocs/certs/live/bootblazers.com/privkey.pem', server_side=True)
    print('Server running on port 4004 (HTTPS)...')
    httpd.serve_forever()

