# 🔧 VERCEL DEPLOYMENT SETUP

## Environment Variables yang Harus Ditambahkan di Vercel Dashboard:

1. Go to: https://vercel.com/dashboard/[your-project]/settings/environment-variables

2. Add these variables:

```
VITE_FIREBASE_API_KEY=AIzaSyDtp14SNwsk5cCH7jzfyQv41z3xN_NKAB4
VITE_FIREBASE_AUTH_DOMAIN=my-react-portofolio.firebaseapp.com  
VITE_FIREBASE_DATABASE_URL=https://my-react-portofolio-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=my-react-portofolio
VITE_FIREBASE_STORAGE_BUCKET=my-react-portofolio.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=628166590544
VITE_FIREBASE_APP_ID=1:628166590544:web:3f604fdf13f6c50a0c1155
VITE_FIREBASE_MEASUREMENT_ID=G-C93R3NFRHQ
```

## Steps:
1. Login to Vercel Dashboard
2. Select your project: my-react-portofolio
3. Go to Settings > Environment Variables  
4. Add each variable above
5. Set Environment: Production, Preview, Development (all)
6. Redeploy your project

## Alternative - Quick Setup:
You can also set these via Vercel CLI:

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
# ... repeat for all variables
```

⚠️ **IMPORTANT**: Without these environment variables, your Firebase connection will fail in production!
