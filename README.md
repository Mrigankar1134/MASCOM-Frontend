# MASCOM Frontend

This is the frontend repository for the MASCOM project. It's built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mrigankar1134/MASCOM-Frontend.git
cd MASCOM-Frontend/client

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment to Netlify

This project is configured for easy deployment to Netlify. You can deploy it in two ways:

### Option 1: Deploy via Netlify UI

1. Push your code to GitHub repository: https://github.com/Mrigankar1134/MASCOM-Frontend.git
   - You can use the included deploy script to push only the client folder:
     ```bash
     # Make the script executable (if not already)
     chmod +x deploy.sh
     
     # Run the deploy script
     ./deploy.sh
     ```
2. Log in to your Netlify account
3. Click "New site from Git"
4. Select GitHub and authorize Netlify
5. Select the repository
6. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize a new Netlify site
netlify init

# Deploy to production
netlify deploy --prod
```

## Project Structure

- `src/` - Source code
  - `Components/` - Reusable UI components
  - `Pages/` - Page components
  - `context/` - React context providers
  - `hooks/` - Custom React hooks
  - `utils/` - Utility functions

## Configuration Files

- `netlify.toml` - Netlify deployment configuration
- `public/_redirects` - Netlify redirect rules for SPA routing
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `.env.example` - Example environment variables (copy to `.env` for local development)

## Environment Variables

This project uses environment variables for configuration. For Netlify deployment, you need to set these in the Netlify dashboard:

1. Go to your site settings in Netlify
2. Navigate to "Build & deploy" > "Environment"
3. Add the following environment variables:
   - `VITE_API_URL`: URL of your backend API (e.g., https://your-backend-api.com/api)

For local development, copy `.env.example` to `.env` and fill in the values.
