# SmartLogistics Dashboard - Installation & Setup Guide

## Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v18 or higher) - Download from https://nodejs.org/
- **npm** (comes with Node.js) or **yarn**
- **Git** (for version control)

## Step 1: Verify Node.js and npm Installation

Open your terminal/command prompt and run:

\`\`\`bash
node --version
npm --version
\`\`\`

You should see version numbers for both.

## Step 2: Navigate to Project Directory

\`\`\`bash
cd path/to/your/smart-logistics-dashboard
\`\`\`

## Step 3: Install All Dependencies

\`\`\`bash
npm install
\`\`\`

This will install all packages listed in package.json including:
- Next.js 15.5.4
- React 19.1.0
- TypeScript
- Tailwind CSS
- All UI components and utilities

**Alternative using yarn:**
\`\`\`bash
yarn install
\`\`\`

## Step 4: Verify Tailwind CSS Installation

Tailwind CSS should already be configured. Check if these files exist:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `app/globals.css` - Global styles with Tailwind directives

If needed, install Tailwind manually:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Step 5: Install Additional Required Packages

All should be installed with `npm install`, but if you need to install individually:

### UI Components & Icons
\`\`\`bash
npm install lucide-react
npm install recharts
npm install embla-carousel-react
\`\`\`

### Form & Validation
\`\`\`bash
npm install react-hook-form zod @hookform/resolvers
\`\`\`

### Utilities
\`\`\`bash
npm install date-fns clsx tailwind-merge
npm install next-themes
npm install sonner
npm install vaul
npm install cmdk
\`\`\`

### Development Dependencies
\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npm install -D typescript @types/react @types/node
npm install -D eslint eslint-config-next
\`\`\`

## Step 6: Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Your application should now be running at: `http://localhost:3000`

**Output you should see:**
\`\`\`
> Next.js@0.1.0 dev
> next dev

  ▲ Next.js 15.5.4
  - Local:        http://localhost:3000
\`\`\`

## Step 7: Access the Application

Open your browser and navigate to:
- **Landing Page**: http://localhost:3000
- **Login Page**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard

**Demo Login Credentials:**
- Email: `demo@smartlogistics.com`
- Password: `demo123`

## Step 8: Build for Production

When ready to deploy:

\`\`\`bash
npm run build
npm start
\`\`\`

## Package.json Scripts

Available npm scripts:

\`\`\`bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint for code quality
npm run lint
\`\`\`

## Troubleshooting

### Issue: Port 3000 already in use
**Solution:** Specify a different port
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Issue: Module not found errors
**Solution:** Clear cache and reinstall
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Issue: Tailwind CSS classes not working
**Solution:** Make sure app/globals.css is imported in layout.tsx and check your content paths in tailwind.config.js

### Issue: Theme not switching
**Solution:** Verify next-themes is installed:
\`\`\`bash
npm install next-themes
\`\`\`

## Complete npm Packages List

### Core Dependencies
- next@15.5.4
- react@19.1.0
- react-dom@19.1.0
- typescript@latest

### Styling & UI
- tailwindcss@4.1.9
- postcss@8.5
- autoprefixer@latest
- tailwindcss-animate
- lucide-react
- recharts@2.15.4
- embla-carousel-react

### Theme & UI Components
- next-themes@0.4.6
- radix-ui (multiple packages)
- sonner (toast notifications)
- vaul (drawer component)
- cmdk (command menu)

### Form & Validation
- react-hook-form@7.60.0
- zod@3.25.67
- @hookform/resolvers

### Utilities
- date-fns@4.1.0
- clsx
- tailwind-merge

### Development
- @types/react
- @types/node
- eslint
- eslint-config-next

## Environment Variables

Create a `.env.local` file in the root directory (optional for this version):

\`\`\`env
# Add any future API endpoints here
# NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

## Verification Checklist

After installation, verify:

- [ ] Node.js v18+ installed
- [ ] npm packages installed (npm install completed)
- [ ] No errors during npm install
- [ ] Development server starts (npm run dev)
- [ ] Homepage loads at localhost:3000
- [ ] Login page accessible
- [ ] Dashboard loads with random data
- [ ] Theme toggle works (dark/light mode)
- [ ] All navigation links work

## System Requirements

- **OS**: Windows, macOS, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 500MB+ for node_modules
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## Next Steps After Installation

1. Explore the landing page
2. Test login with demo credentials
3. Navigate through all dashboard pages
4. Test the theme toggle
5. Check responsive design on mobile
6. Review the code structure in `/app` and `/components`

## Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **shadcn/ui**: https://ui.shadcn.com

## Support

If you encounter any issues:

1. Check that Node.js and npm are properly installed
2. Delete `node_modules` and `package-lock.json`, then run `npm install` again
3. Clear your browser cache
4. Check browser console for errors (F12 or right-click > Inspect)
5. Ensure you're using the correct Node.js version

---

**Enjoy building with SmartLogistics Dashboard! 🚀**
