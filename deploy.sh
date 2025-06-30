#!/bin/bash

# Script to deploy the client folder to GitHub and Netlify

echo "Starting deployment process..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed. Please install git first."
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Deploy client to GitHub"

# Add remote if not already added
if ! git remote | grep -q "origin"; then
    echo "Adding remote repository..."
    git remote add origin https://github.com/Mrigankar1134/MASCOM-Frontend.git
fi

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo "GitHub deployment complete! Now deploying to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Check if user is logged in to Netlify
if ! netlify status 2>/dev/null | grep -q "Logged in"; then
    echo "Please log in to Netlify:"
    netlify login
fi

# Deploy to Netlify
echo "Deploying to Netlify..."

# Check if site is already initialized with Netlify
if [ ! -f ".netlify/state.json" ]; then
    echo "Initializing Netlify site..."
    netlify init
else
    echo "Netlify site already initialized."
fi

# Deploy to production
echo "Deploying to production..."
netlify deploy --prod

echo "Deployment complete! Your client folder has been pushed to GitHub and deployed to Netlify."