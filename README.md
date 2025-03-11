## To my future self

If I want to add a new project, I can add it to the `content/projects` folder as a new markdown file.

If I want to add a new blog post, I can add it to the `content/blog` folder as a new markdown file.

If I want to add a new image to the gallery, I can add it to the `public/gallery` folder. I need to then go to the `src/app/gallery/page.tsx` file and add the image to the `galleryItems` array.

If I want to edit the about page, I should edit the `src/app/about/page.tsx` file. There is no easy way to do it.

## Docker Deployment

### Prerequisites
- Docker installed on your system
- Docker Compose installed on your system (optional, but recommended)

### Quick Deployment with the Deploy Script

The easiest way to deploy the application is using the provided deploy script:

```bash
# Make the script executable (first time only)
chmod +x deploy.sh

# Development deployment
./deploy.sh

# Production deployment
./deploy.sh -p

# Stop the deployment
./deploy.sh -s

# Restart the deployment
./deploy.sh -r

# Force rebuild of containers
./deploy.sh -b

# Show all options
./deploy.sh -h
```

### Manual Deployment

#### Using Docker Compose (Development)
1. Build and start the container:
   ```bash
   docker-compose up -d
   ```

2. Stop the container:
   ```bash
   docker-compose down
   ```

#### Using Docker Directly
1. Build the Docker image:
   ```bash
   docker build -t personal-website:latest .
   ```

2. Run the container:
   ```bash
   docker run -dp 3000:3000 personal-website:latest
   ```

3. Stop the container:
   ```bash
   # Find the container ID
   docker ps
   
   # Stop the container
   docker stop <container_id>
   ```

### Accessing the Application
Once the container is running, the application will be available at:
- http://localhost:3000

### Production Deployment

For production deployment with SSL and Nginx:

1. Update the domain name in `nginx.conf`:
   - Replace `yourdomain.com` with your actual domain name

2. Ensure SSL certificates are available:
   - Install certbot: `sudo apt install certbot python3-certbot-nginx`
   - Obtain certificates: `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com`

3. Deploy using the production Docker Compose file:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
   
   Or use the deploy script:
   ```bash
   ./deploy.sh -p
   ```

4. Stop the production deployment:
   ```bash
   docker-compose -f docker-compose.prod.yml down
   ```
   
   Or use the deploy script:
   ```bash
   ./deploy.sh -p -s
   ```

#### Updating the Production Deployment

To update the production deployment with new changes:

1. Pull the latest changes:
   ```bash
   git pull
   ```

2. Rebuild and restart the containers:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```
   
   Or use the deploy script:
   ```bash
   ./deploy.sh -p -r -b
   ```