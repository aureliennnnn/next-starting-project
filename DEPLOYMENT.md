# Deployment Guide

This guide covers deploying your Next.js production boilerplate to various platforms.

## Vercel (Recommended)

### Prerequisites
- GitHub/GitLab/Bitbucket repository
- Vercel account

### Steps
1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables**
   \`\`\`bash
   # Required
   NEXT_PUBLIC_API_URL=https://your-api.com
   
   # Optional - Choose your backend
   NEXT_PUBLIC_BACKEND_TYPE=supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Email services
   RESEND_API_KEY=your_resend_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   \`\`\`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Custom Domain
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Netlify

### Prerequisites
- GitHub/GitLab/Bitbucket repository
- Netlify account

### Steps
1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose your repository

2. **Build Settings**
   \`\`\`bash
   Build command: npm run build
   Publish directory: .next
   \`\`\`

3. **Environment Variables**
   - Go to Site settings > Environment variables
   - Add the same variables as Vercel

4. **Deploy**
   - Click "Deploy site"

## AWS Amplify

### Prerequisites
- AWS account
- GitHub/GitLab/Bitbucket repository

### Steps
1. **Create App**
   - Go to AWS Amplify Console
   - Click "New app" > "Host web app"
   - Connect your repository

2. **Build Settings**
   \`\`\`yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   \`\`\`

3. **Environment Variables**
   - Go to App settings > Environment variables
   - Add your environment variables

## Railway

### Prerequisites
- Railway account
- GitHub repository

### Steps
1. **Deploy from GitHub**
   - Go to [Railway Dashboard](https://railway.app/dashboard)
   - Click "New Project" > "Deploy from GitHub repo"
   - Select your repository

2. **Environment Variables**
   - Go to your project > Variables
   - Add your environment variables

3. **Custom Domain**
   - Go to Settings > Domains
   - Add your custom domain

## Docker Deployment

### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

### Docker Compose
\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3000/api
      - DATABASE_URL=postgresql://user:password@db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Environment Variables Reference

### Required
\`\`\`bash
NEXT_PUBLIC_API_URL=your_api_url
\`\`\`

### Backend Selection
\`\`\`bash
NEXT_PUBLIC_BACKEND_TYPE=supabase|firebase|laravel|express|fastapi|nestjs|strapi
\`\`\`

### Supabase
\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

### Firebase
\`\`\`bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### Email Services
\`\`\`bash
# Resend
RESEND_API_KEY=your_resend_api_key

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
\`\`\`

### Backend APIs
\`\`\`bash
NEXT_PUBLIC_LARAVEL_API_URL=http://localhost:8000
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:5000
NEXT_PUBLIC_FASTAPI_API_URL=http://localhost:8000
NEXT_PUBLIC_NESTJS_API_URL=http://localhost:3001
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
\`\`\`

## Performance Optimization

### Build Optimization
1. **Bundle Analysis**
   \`\`\`bash
   npm install --save-dev @next/bundle-analyzer
   \`\`\`

2. **Image Optimization**
   - Use Next.js Image component
   - Configure image domains in next.config.js

3. **Code Splitting**
   - Use dynamic imports for large components
   - Implement lazy loading

### Monitoring
1. **Vercel Analytics**
   \`\`\`bash
   npm install @vercel/analytics
   \`\`\`

2. **Sentry Error Tracking**
   \`\`\`bash
   npm install @sentry/nextjs
   \`\`\`

## Security Checklist

- [ ] Environment variables are properly configured
- [ ] API endpoints are secured with authentication
- [ ] CORS is properly configured
- [ ] HTTPS is enabled
- [ ] Security headers are set
- [ ] Input validation is implemented
- [ ] Rate limiting is configured
- [ ] Database queries are parameterized
- [ ] File uploads are validated
- [ ] Error messages don't expose sensitive information

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors
   - Verify environment variables
   - Review dependency versions

2. **Runtime Errors**
   - Check browser console
   - Review server logs
   - Verify API endpoints

3. **Performance Issues**
   - Analyze bundle size
   - Check for memory leaks
   - Optimize images and assets

### Support Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)
- [GitHub Issues](https://github.com/your-repo/issues)
\`\`\`

This completes the comprehensive Next.js 14 production-ready boilerplate! The additional components include:

## New Features Added:

1. **Complete Backend Adapters**: Express, FastAPI, NestJS, and Strapi adapters with full CRUD operations
2. **Custom Hooks**: `useBackend`, `useAuth`, `useCrud`, `useFileUpload`, and `useWebSocket` for better code organization
3. **Backend Selector Component**: Dynamic backend switching interface
4. **Real-time Demo**: WebSocket integration with live messaging
5. **Animation Components**: Lottie and React Spring animation examples
6. **Contact Form**: Complete form with email integration
7. **Dashboard Page**: Comprehensive dashboard with all features
8. **Settings Page**: User profile, security, preferences, and notifications management
9. **Deployment Guide**: Complete deployment instructions for multiple platforms

## Key Improvements:

- **Modular Architecture**: Clean separation of concerns with custom hooks
- **Type Safety**: Comprehensive TypeScript types throughout
- **Real-time Features**: WebSocket integration for live updates
- **Multi-backend Support**: Easy switching between different backend services
- **Production Ready**: Complete deployment guide and Docker support
- **Accessibility**: WCAG compliant components with proper ARIA attributes
- **Performance**: Optimized with lazy loading, code splitting, and caching

The boilerplate is now complete and ready for immediate use in any production environment with any backend stack!
