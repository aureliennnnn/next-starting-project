# Next.js 14 Production-Ready Boilerplate

A comprehensive, production-ready Next.js 14 boilerplate with TypeScript, featuring modern development tools, UI libraries, state management, authentication, CRUD operations, file uploads, and multi-backend support.

## 🚀 Features

### Core Technologies
- **Next.js 14** with App Router and TypeScript strict mode
- **Tailwind CSS** for styling
- **ESLint**, **Prettier**, and **Husky** for code quality
- **React Hook Form** with **Zod** validation

### UI Libraries & Components
- **Shadcn/ui** - Modern React components
- **Chakra UI** - Simple, modular, and accessible components
- **Radix UI** - Low-level UI primitives
- **Lucide React**, **React Icons**, **Heroicons** - Icon libraries

### Animations & Interactions
- **Framer Motion** - Production-ready motion library
- **React Spring** - Spring-physics based animations
- **Lottie React** - Render After Effects animations

### State Management & Data Fetching
- **Zustand** - Lightweight state management
- **TanStack Query** - Powerful data synchronization
- **SWR** - Data fetching with caching
- **Axios** - HTTP client with interceptors and JWT handling

### Backend Integrations
- **Laravel** API adapter
- **Express.js** adapter
- **FastAPI** adapter
- **NestJS** adapter
- **Strapi** CMS adapter
- **Supabase** integration
- **Firebase** integration

### Additional Features
- **EmailJS** and **Resend** for email services
- **React Hot Toast** for notifications
- Complete authentication flow
- CRUD operations with validation
- File upload functionality
- Real-time notifications
- Theme switching (dark/light mode)
- Responsive navigation
- Error boundaries
- WCAG compliant accessibility
- Loading states and error handling

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd nextjs-production-boilerplate
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   
   # Supabase (optional)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Firebase (optional)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   
   # EmailJS (optional)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_emailjs_user_id
   
   # Resend (optional)
   RESEND_API_KEY=your_resend_api_key
   
   # Backend URLs (optional)
   NEXT_PUBLIC_LARAVEL_API_URL=http://localhost:8000
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── crud/             # CRUD operation components
│   ├── notifications/    # Notification components
│   ├── providers/        # Context providers
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── backend-adapters/ # Backend integration adapters
│   ├── api-client.ts     # HTTP client configuration
│   ├── email-service.ts  # Email service utilities
│   └── utils.ts          # General utilities
├── store/                # Zustand stores
│   ├── auth-store.ts     # Authentication state
│   └── notification-store.ts # Notification state
└── types/                # TypeScript type definitions
    └── index.ts          # Global types
\`\`\`

## 🔧 Configuration

### Code Quality Tools

The project includes pre-configured:
- **ESLint** with TypeScript and accessibility rules
- **Prettier** for code formatting
- **Husky** for Git hooks
- **lint-staged** for pre-commit linting

### Theme Configuration

The project supports both light and dark themes using `next-themes`. Customize colors in:
- `tailwind.config.js` - Tailwind CSS configuration
- `src/app/globals.css` - CSS custom properties

### Backend Adapters

Choose your preferred backend by importing the appropriate adapter:

\`\`\`typescript
// For Laravel
import { laravelAdapter } from '@/lib/backend-adapters/laravel-adapter';

// For Supabase
import { supabaseAdapter } from '@/lib/backend-adapters/supabase-adapter';

// For Firebase
import { firebaseAdapter } from '@/lib/backend-adapters/firebase-adapter';
\`\`\`

## 🎨 Customization

### Adding New Components

1. Create your component in the appropriate directory under `src/components/`
2. Export it from the component file
3. Import and use it in your pages or other components

### State Management

Add new stores in the `src/store/` directory:

\`\`\`typescript
import { create } from 'zustand';

interface MyState {
  // Define your state interface
}

export const useMyStore = create<MyState>((set, get) => ({
  // Implement your state logic
}));
\`\`\`

### API Integration

Extend the API client or create new adapters in `src/lib/backend-adapters/`:

\`\`\`typescript
export class MyBackendAdapter {
  async myMethod() {
    return apiClient.get('/my-endpoint');
  }
}
\`\`\`

## 🧪 Testing

The project is set up for testing with:
- Jest for unit testing
- React Testing Library for component testing
- Cypress for end-to-end testing (can be added)

Run tests:
\`\`\`bash
npm run test
# or
yarn test
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📚 Documentation

### Authentication Flow

The authentication system supports:
- Email/password login and registration
- JWT token handling
- Automatic token refresh
- Protected routes

### CRUD Operations

Example CRUD implementation includes:
- Create, read, update, delete operations
- Form validation with Zod
- Optimistic updates with TanStack Query
- Error handling and loading states

### File Upload

The file upload system features:
- Drag and drop interface
- Progress tracking
- Multiple file support
- File type validation
- Size limits

### Accessibility

The project follows WCAG guidelines:
- Semantic HTML elements
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](#-documentation)
2. Search existing [issues](https://github.com/your-repo/issues)
3. Create a new issue with detailed information
4. Join our [Discord community](https://discord.gg/your-discord)

## 🙏 Acknowledgments

This boilerplate is built with amazing open-source libraries:
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TanStack Query](https://tanstack.com/query)

---

**Happy coding! 🎉**
