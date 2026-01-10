a# GitHub Repository Setup Guide

This guide explains how to set up GitHub branch protection rules and ensure code quality through automated linting and type checking.

## Branch Protection Rules

To enforce code quality and prevent direct pushes to main, set up branch protection rules:

### Steps to Configure Branch Protection

1. **Navigate to Repository Settings**
   - Go to your GitHub repository
   - Click on **Settings** → **Branches**

2. **Add Branch Protection Rule**
   - Click **Add rule** or **Add branch protection rule**
   - In **Branch name pattern**, enter: `main`

3. **Configure Protection Settings**

   **Required Checks:**
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: 1 (or more as needed)
     - ✅ Dismiss stale pull request approvals when new commits are pushed
     - ✅ Require review from Code Owners (if you have a CODEOWNERS file)
   
   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - Select the following required status checks:
       - `lint / lint` (ESLint)
       - `lint / type-check` (TypeScript)
       - `build / build` (Build verification)
   
   - ✅ **Require conversation resolution before merging**
   
   - ✅ **Do not allow bypassing the above settings** (for admins too)

   **Optional but Recommended:**
   - ✅ **Require linear history** (prevents merge commits)
   - ✅ **Include administrators** (applies rules to admins too)
   - ✅ **Restrict who can push to matching branches** (only allow specific teams/users)

4. **Save the Rule**
   - Click **Create** or **Save changes**

## GitHub Actions Workflows

The repository includes two automated workflows:

### 1. Lint Workflow (`.github/workflows/lint.yml`)
- **Triggers:** On every push and pull request
- **Jobs:**
  - **ESLint**: Checks code for linting errors
  - **Prettier**: Verifies code formatting
  - **TypeScript**: Type checks the codebase

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)
- **Triggers:** On push/PR to `main` branch
- **Jobs:**
  - **Build**: Runs linting, type checking, and builds the project
  - **Deploy**: Deploys to Vercel (only on main branch pushes)

## Pre-commit Setup (Optional)

To catch issues before pushing, you can set up pre-commit hooks:

### Using Husky (Recommended)

1. **Install Husky:**
   ```bash
   npm install --save-dev husky
   npx husky init
   ```

2. **Add pre-commit hook:**
   ```bash
   npx husky add .husky/pre-commit "npm run lint && npm run format:check && npm run check"
   ```

3. **Add pre-push hook:**
   ```bash
   npx husky add .husky/pre-push "npm run lint && npm run check"
   ```

## Local Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. **Before pushing, run checks locally:**
   ```bash
   npm run lint          # Check for linting errors
   npm run format:check  # Check formatting
   npm run check         # Type check
   ```

4. **Fix any issues:**
   ```bash
   npm run lint:fix      # Auto-fix linting issues
   npm run format        # Auto-format code
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub.

## Required Status Checks

The following status checks must pass before merging:

- ✅ **lint / lint** - ESLint validation
- ✅ **lint / type-check** - TypeScript type checking
- ✅ **build / build** - Build verification

## Troubleshooting

### Linting Errors
If you see linting errors:
```bash
npm run lint:fix  # Auto-fix what can be fixed
# Manually fix remaining issues
```

### Formatting Issues
If Prettier finds formatting issues:
```bash
npm run format  # Auto-format all files
```

### Type Errors
If TypeScript finds type errors:
- Fix the type errors in your code
- Run `npm run check` to verify

## CI/CD Secrets

For deployment to work, ensure these secrets are configured in GitHub:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `VERCEL_TOKEN` - Your Vercel API token
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

## Summary

- ✅ Branch protection rules prevent direct pushes to main
- ✅ All PRs require passing linting, type checking, and build checks
- ✅ Automated workflows run on every push and PR
- ✅ Code must be reviewed before merging
- ✅ Administrators are also subject to these rules

This setup ensures code quality and prevents broken code from reaching production.

