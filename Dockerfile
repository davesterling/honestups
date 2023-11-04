# Stage 1: Build stage with Python and Node.js dependencies
FROM python:3.8 AS build

WORKDIR /app

# Clean existing Python installation
RUN apt-get update && \
    apt-get purge -y python3 python3-pip && \
    apt-get clean

# Install necessary build tools
RUN apt-get update && \
    apt-get install -y build-essential wget

# Download and install Python 3.8
RUN wget https://www.python.org/ftp/python/3.8.12/Python-3.8.12.tgz && \
    tar -xzvf Python-3.8.12.tgz && \
    cd Python-3.8.12 && \
    ./configure --enable-optimizations && \
    make altinstall

# Install Node.js and npm
RUN apt-get install -y nodejs npm

# Install Python packages
RUN pip3 install google-api-python-client google-auth google-auth-oauthlib google-auth-httplib2

# Stage 2: Final stage with Apache
FROM httpd:2.4

# Set working directory
WORKDIR /usr/local/apache2/htdocs

# Copy your certificates and application files
COPY certs certs/

COPY . .

COPY apache2.conf /usr/local/apache2/conf/httpd.conf

# Expose ports for Apache
EXPOSE 80 443

# Copy Python dependencies from the build stage
COPY --from=build /usr/local/lib/python3.8 /usr/local/lib/python3.8
COPY --from=build /usr/local/bin /usr/local/bin

# Create necessary directories for Apache
RUN mkdir -p /var/log/apache2/ && \
    chown -R www-data:www-data /var/log/apache2/ && \
    chmod -R 755 /var/log/apache2/ && \
    mkdir -p /var/run/apache2/ && \
    chown www-data:www-data /var/run/apache2/ && \
    chmod -R 777 /var/log/apache2/

# Start Apache in the foreground
CMD ["/usr/local/apache2/bin/httpd", "-D", "FOREGROUND"]





