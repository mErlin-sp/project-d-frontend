FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY dist/frontend/browser /usr/share/nginx/html

# Copy the custom nginx configuration file.
COPY nginx.conf /etc/nginx/nginx.conf
