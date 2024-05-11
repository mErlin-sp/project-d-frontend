FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY dist/frontend/browser /usr/share/nginx/html
