1.  In footer we have: "If you have any questions about these Terms of Use, please contact us at legal@fortuna.ai." This email will need to be changed.

2.  stripe integration into payment.tsx, we will not allow users to enter card details directly. this will be too much risk on our side.

3.  Connecting to our real backend
    Environment variables
    GitHub secrets (required): VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID (for authentication).
    Vercel dashboard: Application env vars (e.g., VITE_API_URL) are pulled via vercel pull.

# Deployment

Repository secrets (recommended)
The workflow doesn't specify a GitHub Environment, so it can't access Environment secrets.
Simpler: one place to manage secrets.
Sufficient for a single-environment setup (main branch → production).
When to use Environment secrets
You have multiple environments (e.g., staging, production) with different secrets.
You want environment-specific protection rules (required reviewers, deployment branches).
You need to restrict which jobs can access which secrets.

Recommendation
Store VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID as Repository secrets.
If you later add environments, you can:
Create GitHub Environments (e.g., "production", "staging").
Add an environment: key to the deploy job.
Move the secrets to Environment secrets.
For now, Repository secrets are the right choice.
