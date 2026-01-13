#!/bin/bash

# Quick Deployment Script for Vercel
echo "🚀 Starting Vercel Deployment Process..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel
echo "🔐 Logging in to Vercel..."
vercel login

# Deploy to production
echo "🚀 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "📝 Don't forget to:"
echo "   1. Add environment variables in Vercel Dashboard"
echo "   2. Update CORS_ORIGIN with your frontend URL"
echo "   3. Test your endpoints"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
