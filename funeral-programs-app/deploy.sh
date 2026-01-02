#!/bin/bash

# Deployment script for Fly.io

echo "🚀 Deploying funeral programs app to Fly.io..."

# Check if fly.io CLI is installed
if ! command -v fly &> /dev/null; then
    echo "❌ Fly.io CLI is not installed. Please install it first:"
    echo "curl -L https://fly.io/install.sh | sh"
    exit 1
fi

# Check if app exists
if ! fly apps list | grep -q "funeral-programs"; then
    echo "📱 Creating new Fly.io app..."
    fly apps create funeral-programs --org personal
fi

# Set environment variables (you'll need to set these)
echo "🔧 Setting environment variables..."
echo "Please set the following secrets in Fly.io:"
echo "fly secrets set DATABASE_URL=postgresql://..."
echo "fly secrets set AWS_ACCESS_KEY_ID=your_tigris_key"
echo "fly secrets set AWS_SECRET_ACCESS_KEY=your_tigris_secret"
echo "fly secrets set AWS_ENDPOINT_URL_S3=https://fly.storage.tigris.dev"
echo "fly secrets set AWS_REGION=auto"
echo "fly secrets set TIGRIS_BUCKET_NAME=funeral-programs"

# Create PostgreSQL database
if ! fly postgres list | grep -q "funeral-programs-db"; then
    echo "🗄️ Creating PostgreSQL database..."
    fly postgres create --name funeral-programs-db --region atl
    echo "Don't forget to attach the database:"
    echo "fly postgres attach --app funeral-programs funeral-programs-db"
fi

# Create Tigris bucket
if ! fly storage list | grep -q "funeral-programs"; then
    echo "🪣 Creating Tigris storage bucket..."
    fly storage create --name funeral-programs
fi

# Deploy the application
echo "🚢 Deploying application..."
fly deploy

echo "✅ Deployment complete!"
echo "Your app should be available at: https://funeral-programs.fly.dev"
echo ""
echo "Next steps:"
echo "1. Run database migrations: fly ssh console -C 'cd /app/server && npx prisma db push'"
echo "2. Check app status: fly status"
echo "3. View logs: fly logs"