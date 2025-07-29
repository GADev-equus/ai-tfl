# Subdomain Application Migration Guide

## Overview
This document provides a comprehensive guide for migrating subdomain applications in the Equus ecosystem, specifically covering the migration from a basic authenticated subdomain to an enhanced version with additional functionality while maintaining authentication integrity.

## Table of Contents
1. [Pre-Migration Analysis](#pre-migration-analysis)
2. [Authentication Architecture Understanding](#authentication-architecture-understanding)
3. [Migration Process](#migration-process)
4. [Git Repository Management](#git-repository-management)
5. [Environment Variable Conflicts](#environment-variable-conflicts)
6. [CORS Configuration](#cors-configuration)
7. [API Endpoint Configuration](#api-endpoint-configuration)
8. [Authentication Loop Prevention](#authentication-loop-prevention)
9. [Testing and Validation](#testing-and-validation)
10. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Pre-Migration Analysis

### 1. Understand Current Applications
Before starting migration, analyze both applications:

**Source Application (Original Subdomain)**:
- Check authentication method (JWT tokens, localStorage, URL parameters)
- Identify API endpoints used for authentication
- Document App.jsx routing structure (critical!)
- Note environment variables used
- Check git repository configuration

**Target Application (Enhanced Version)**:
- Identify new functionality and dependencies
- Check API endpoints and backend requirements
- Note environment variables and configuration needs
- Understand authentication requirements (if any)

### 2. Critical Architecture Components
Document these key components from the original application:
- **AuthContext.jsx**: JWT token management from URL parameters
- **AuthGuard.jsx**: Route protection mechanism
- **App.jsx structure**: Which routes are protected vs public
- **httpService.js**: Authentication API service
- **Environment variables**: API URLs, domain configurations

---

## Authentication Architecture Understanding

### Cross-Domain JWT Authentication Flow
The Equus authentication system works as follows:

1. **Main Site Authentication**: User logs in at `equussystems.co`
2. **Token Passing**: Main site appends `auth_token` to subdomain URLs
3. **Token Extraction**: Subdomain extracts token from URL parameters
4. **Token Storage**: Token stored in localStorage for persistence
5. **API Requests**: Token sent as Bearer header to backend APIs

### Critical Files for Authentication
```
src/contexts/AuthContext.jsx     # Core authentication context
src/components/AuthGuard.jsx     # Route protection component
src/services/httpService.js      # Authentication API service
src/App.jsx                      # CRITICAL: Route protection structure
.env                             # API URLs and domain config
```

---

## Migration Process

### Step 1: Backup Original Application
```bash
# Create backup directory
mkdir ../ai-tutor-backup
cp -r . ../ai-tutor-backup/
echo "Backup created at $(date)" > ../ai-tutor-backup/BACKUP_INFO.txt
```

### Step 2: Copy Enhanced Application
```bash
# Clear current directory (keep .git/)
find . -maxdepth 1 -not -name '.git' -not -name '.' -delete
cp -r ../bio-tutor-client/* .
```

### Step 3: Restore Critical Authentication Components
Copy these files from backup to maintain authentication:
```bash
# Copy authentication context
cp ../ai-tutor-backup/src/contexts/AuthContext.jsx src/contexts/

# Copy authentication guard (check for modifications needed)
cp ../ai-tutor-backup/src/components/AuthGuard.jsx src/components/

# Copy authentication service
cp ../ai-tutor-backup/src/services/httpService.js src/services/

# CRITICAL: Copy App.jsx structure (may need manual merge)
# DO NOT blindly copy - compare routing structures first
```

### Step 4: Update package.json
```json
{
  "name": "ai-tutor",  // Update application name
  "version": "1.0.0"
}
```

### Step 5: Merge Environment Variables
Create unified .env file:
```env
# Authentication API (equus-website-api)
VITE_API_URL=https://equus-website-api.onrender.com

# Enhanced functionality API (bio-tutor-api or equivalent)
VITE_BIOTUTOR_API_URL=https://bio-tutor-api.onrender.com

# Main Domain Configuration
VITE_MAIN_DOMAIN=https://equussystems.co
VITE_LOGIN_URL=https://equussystems.co/auth/signin
VITE_LOGOUT_REDIRECT=https://equussystems.co

# App Configuration
VITE_APP_NAME=AI Tutor
VITE_SUBDOMAIN=ai-tutor
```

---

## Git Repository Management

### Common Git Authentication Issues
**Problem**: `Permission denied to GADev-equus` when different GitHub accounts involved

**Solution**: Set repository-specific credentials
```bash
# Set repository-specific user
git config user.name "GADev-equus"
git config user.email "tech@equussystems.co"

# Use Personal Access Token for HTTPS
git remote set-url origin https://GADev-equus:TOKEN@github.com/GADev-equus/ai-tutor.git

# Or use SSH key for specific account
git remote set-url origin git@github.com:GADev-equus/ai-tutor.git
```

### Repository Reinitialization
If remote repository conflicts:
```bash
# Check current remote
git remote -v

# Remove and re-add if needed
git remote remove origin
git remote add origin https://github.com/GADev-equus/ai-tutor.git

# Force push if needed (CAREFUL!)
git push -u origin main --force
```

---

## Environment Variable Conflicts

### Problem: Multiple API Requirements
Applications often need different APIs:
- **Authentication API**: For JWT validation (equus-website-api)
- **Functionality API**: For enhanced features (bio-tutor-api, etc.)

### Solution: Dual API Configuration

#### Frontend Configuration
**httpService.js** (Authentication):
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://equus-website-api.onrender.com';
```

**api.js** (Enhanced Functionality):
```javascript
export const api = axios.create({
  baseURL: (import.meta.env.VITE_BIOTUTOR_API_URL || 'http://localhost:8000') + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

#### Backend API Path Structure
Ensure APIs expect correct paths:
- Authentication API: Direct paths (`/api/auth/validate-token`)
- Functionality API: Prefixed paths (`/api/chat`, `/api/retrieve`)

---

## CORS Configuration

### Backend CORS Setup
**Critical Requirements**:
1. **Correct Origin**: Must match subdomain exactly
2. **OPTIONS Method**: Required for preflight requests
3. **Authorization Header**: Must be allowed

```javascript
// Example bio-tutor-api CORS configuration
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin
    if (!origin) return callback(null, true);

    // Normalize origins (remove trailing slash)
    const normalizedOrigin = origin.replace(/\/$/, '');
    const normalizedCorsOrigin = corsOrigin.replace(/\/$/, '');

    if (normalizedOrigin === normalizedCorsOrigin) {
      return callback(null, true);
    }

    // Allow localhost for development
    if (normalizedOrigin.includes('localhost')) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'], // OPTIONS is CRITICAL
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
}));
```

### Environment Variable Setup
**CRITICAL**: Ensure exact domain match
```env
# WRONG
CORS_ORIGIN=https://ai.tutor.equussystems.co

# CORRECT  
CORS_ORIGIN=https://ai-tutor.equussystems.co
```

### Common CORS Issues
1. **Typos in domain names**: `ai.tutor` vs `ai-tutor`
2. **Missing OPTIONS method**: Preflight requests fail
3. **Wrong subdomain format**: Check hyphens vs dots
4. **Server not restarted**: Changes don't take effect

---

## API Endpoint Configuration

### Frontend API Service Structure
**Dual API Pattern**:
```javascript
// httpService.js - Authentication API
const API_BASE_URL = import.meta.env.VITE_API_URL; // equus-website-api

// api.js - Functionality API  
const baseURL = import.meta.env.VITE_BIOTUTOR_API_URL + '/api'; // bio-tutor-api/api
```

### Backend Route Registration
**Server.js must include**:
```javascript
import express from 'express';
import chatRoutes from './routes/chat.routes.js';
import retrieveRoutes from './routes/retrieve.routes.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

// CRITICAL: Register routes
app.use('/api/chat', chatRoutes);
app.use('/api/retrieve', retrieveRoutes);
app.use('/api/healthz', healthRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Endpoint Validation
Test these endpoints work:
- `GET /api/healthz` - Health check
- `POST /api/chat` - Chat functionality
- `POST /api/retrieve` - Document retrieval

---

## Authentication Loop Prevention

### Critical App.jsx Structure
**WRONG** (causes authentication loops):
```javascript
// DO NOT wrap entire app in AuthGuard
function App() {
  return (
    <AuthProvider>
      <AuthGuard>  // This breaks public routes!
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </AuthGuard>
    </AuthProvider>
  );
}
```

**CORRECT** (selective route protection):
```javascript
function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/chat" 
              element={
                <AuthGuard>
                  <ChatPage />
                </AuthGuard>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
```

### AuthContext Token Handling
```javascript
// Extract token from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const urlToken = urlParams.get('auth_token');

if (urlToken) {
  localStorage.setItem('auth_token', urlToken);
  // Remove token from URL without redirect
  window.history.replaceState({}, document.title, window.location.pathname);
}
```

---

## Testing and Validation

### 1. Authentication Flow Test
1. **Login at main site**: `equussystems.co/auth/signin`
2. **Access subdomain**: Click verified link
3. **Check token extraction**: Browser devtools → localStorage
4. **Verify API calls**: Network tab shows Bearer token headers

### 2. CORS Validation
```bash
# Test CORS preflight
curl -v -X OPTIONS \
  -H "Origin: https://ai-tutor.equussystems.co" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: authorization" \
  https://bio-tutor-api.onrender.com/api/healthz
```

### 3. API Endpoint Testing
```bash
# Test health endpoint
curl https://bio-tutor-api.onrender.com/api/healthz

# Test chat endpoint (with auth)
curl -X POST https://bio-tutor-api.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"message": "test"}'
```

### 4. Route Protection Testing
- **Public routes**: Should load without authentication
- **Protected routes**: Should redirect to login if no token
- **Valid token**: Should access protected routes normally

---

## Troubleshooting Common Issues

### 1. CORS Errors
**Error**: `Access-Control-Allow-Origin header is present`
**Causes**:
- Domain mismatch in CORS_ORIGIN environment variable
- Missing OPTIONS method in CORS configuration
- Server not restarted after CORS changes

**Debug Steps**:
```javascript
// Add CORS debugging to backend
console.log('🔍 CORS Debug - Received origin:', origin);
console.log('🔍 CORS Debug - Expected origin:', corsOrigin);
```

### 2. 404 API Errors
**Error**: `Cannot POST /api/chat`
**Causes**:
- Routes imported but not registered with app.use()
- Wrong baseURL in frontend (missing /api)
- Server.js missing express.listen()

### 3. Authentication Loops
**Error**: Continuous redirects to login page
**Causes**:
- Entire app wrapped in AuthGuard instead of specific routes
- AuthContext redirect logic interfering with public routes
- Token validation failing unexpectedly

### 4. Git Permission Errors
**Error**: `Permission denied to GADev-equus`
**Causes**:
- Multiple GitHub accounts on same machine
- Wrong credentials cached
- HTTPS vs SSH authentication mismatch

**Solution**:
```bash
# Clear git credentials
git config --unset user.name
git config --unset user.email

# Set repository-specific credentials
git config user.name "GADev-equus"
git config user.email "tech@equussystems.co"
```

### 5. Environment Variable Issues
**Error**: API calls going to wrong endpoints
**Causes**:
- .env file not loaded properly
- Variable names don't match (VITE_ prefix required)
- Build cache not cleared after env changes

**Solution**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] All authentication components copied correctly
- [ ] App.jsx routing structure verified (public vs protected routes)
- [ ] Environment variables configured for production
- [ ] CORS configuration updated on backend
- [ ] API endpoints tested and working
- [ ] Git repository configured correctly

### Post-Deployment
- [ ] Authentication flow tested end-to-end
- [ ] Public routes accessible without login
- [ ] Protected routes require authentication
- [ ] JWT tokens passed correctly between domains
- [ ] Enhanced functionality working (chat, etc.)
- [ ] No console errors in browser
- [ ] Backend logs show successful requests

### Rollback Plan
Always maintain backup:
```bash
# If migration fails, restore from backup
rm -rf ./* (except .git)
cp -r ../ai-tutor-backup/* .
git add .
git commit -m "Rollback to working version"
git push origin main --force
```

---

## Migration Success Criteria

✅ **Authentication Working**: Users can login and access protected routes
✅ **Enhanced Functionality**: New features (chat, etc.) working properly  
✅ **CORS Resolved**: No cross-origin errors in browser console
✅ **API Endpoints**: All expected endpoints responding correctly
✅ **Git Repository**: Properly configured and pushing successfully
✅ **Environment Variables**: Dual API configuration working
✅ **Route Protection**: Public routes public, protected routes protected
✅ **Token Persistence**: JWT tokens maintained across browser sessions

---

## Key Lessons Learned

1. **Always backup original**: Migration can break authentication
2. **App.jsx structure is critical**: Don't wrap entire app in AuthGuard
3. **Environment variables need precision**: Domain typos cause CORS failures
4. **Git credentials are repository-specific**: Different accounts need separate config
5. **CORS requires OPTIONS method**: Preflight requests must be handled
6. **API paths must match exactly**: Frontend baseURL + backend routes must align
7. **Testing is essential**: End-to-end validation prevents production issues

---

## Future Migration Template

For future migrations, follow this sequence:

1. **Analyze** → Document both applications thoroughly
2. **Backup** → Create complete backup of original
3. **Copy** → Transfer enhanced application files
4. **Restore** → Copy critical authentication components
5. **Configure** → Set up dual API and environment variables
6. **Test** → Validate authentication and functionality
7. **Deploy** → Push to production with monitoring
8. **Validate** → Confirm all features working end-to-end

Remember: Authentication architecture is complex and fragile. Take time to understand it fully before making changes.