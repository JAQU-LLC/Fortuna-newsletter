1.
In footer we have: "If you have any questions about these Terms of Use, please contact us at legal@fortuna.ai." This email will need to be changed.

2.
stripe integration into payment.tsx, we will not allow users to enter card details directly. this will be too much risk on our side.



3. Connecting to our real backend
Environment variables
GitHub secrets (required): VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID (for authentication).
Vercel dashboard: Application env vars (e.g., VITE_API_URL) are pulled via vercel pull.