# Deployment Guide

## Prerequisites

1. **Fly.io CLI installed**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Fly.io account** and logged in:
   ```bash
   fly auth login
   ```

## Setup Instructions

### 1. Create the Fly.io App
```bash
fly apps create funeral-programs --org personal
```

### 2. Create PostgreSQL Database
```bash
fly postgres create --name funeral-programs-db --region atl
fly postgres attach --app funeral-programs funeral-programs-db
```

### 3. Create Tigris Storage
```bash
fly storage create --name funeral-programs
```

### 4. Set Environment Variables
```bash
# The DATABASE_URL will be set automatically when you attach the Postgres
# You need to set these for Tigris storage:

fly secrets set AWS_ACCESS_KEY_ID="your_tigris_access_key"
fly secrets set AWS_SECRET_ACCESS_KEY="your_tigris_secret_key"  
fly secrets set AWS_ENDPOINT_URL_S3="https://fly.storage.tigris.dev"
fly secrets set AWS_REGION="auto"
fly secrets set TIGRIS_BUCKET_NAME="funeral-programs"
```

### 5. Deploy the Application
```bash
fly deploy
```

### 6. Run Database Migrations
```bash
fly ssh console -C "cd /app/server && npx prisma db push"
```

## Post-Deployment

### Check App Status
```bash
fly status
```

### View Logs
```bash
fly logs
```

### Open in Browser
```bash
fly open
```

## File Structure for Deployment

The app is configured as a full-stack application:
- **Frontend**: React app built with Vite (serves from `/dist`)
- **Backend**: Express server with Prisma ORM
- **Database**: PostgreSQL on Fly.io
- **File Storage**: Tigris Object Storage

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `DATABASE_URL` | PostgreSQL connection | Auto-set by Fly.io |
| `AWS_ACCESS_KEY_ID` | Tigris access key | From Fly.io dashboard |
| `AWS_SECRET_ACCESS_KEY` | Tigris secret key | From Fly.io dashboard |
| `AWS_ENDPOINT_URL_S3` | Tigris endpoint | `https://fly.storage.tigris.dev` |
| `AWS_REGION` | Tigris region | `auto` |
| `TIGRIS_BUCKET_NAME` | Storage bucket name | `funeral-programs` |

## Troubleshooting

### Database Connection Issues
```bash
# Check database status
fly postgres list

# Connect to database directly
fly postgres connect -a funeral-programs-db
```

### Storage Issues
```bash
# List storage buckets
fly storage list

# Check storage credentials
fly storage dashboard --org personal
```

### App Issues
```bash
# Restart the app
fly machine restart

# Check resource usage
fly machine status

# SSH into the running machine
fly ssh console
```