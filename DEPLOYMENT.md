# Vercel deployment

Use the Vercel project connected to the repository and branch that receives these changes. The local `.env.local` file is ignored by Git and is not uploaded to Vercel.

Add these environment variables in **Vercel → Project Settings → Environment Variables** for Production, and for Preview when preview deployments need the same integrations:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Use the production API and Firebase values; do not commit secret values to this repository. After setting them, trigger a deployment from the branch Vercel is configured to build.
