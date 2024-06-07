FROM nginx:1.26-alpine

# Set the service address and port as build arguments.
ARG SERVICE_ADDR=127.0.0.1
ARG SERVICE_PORT=8000

# Set the service address and port as environment variables.
ENV SERVICE_ADDR=${SERVICE_ADDR}
ENV SERVICE_PORT=${SERVICE_PORT}

# Set the environment variable to specify the output directory for the envsubst command.
ENV NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx

# Copy the build output to replace the default nginx contents.
COPY dist/frontend/browser /usr/share/nginx/html

## Copy the custom nginx configuration file.
#COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the custom nginx configuration template file.
COPY nginx/nginx.conf.template /etc/nginx/templates/nginx.conf.template
