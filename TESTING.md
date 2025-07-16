# Testing Guide

This guide covers the comprehensive testing setup for the Next.js production boilerplate.

## Testing Stack

### Unit & Integration Testing
- **Jest** - JavaScript testing framework
- **React Testing Library** - Testing utilities for React components
- **@testing-library/jest-dom** - Custom Jest matchers

### End-to-End Testing
- **Cypress** - E2E testing framework
- **cypress/support** - Custom commands and utilities

## Running Tests

### Unit Tests
\`\`\`bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### E2E Tests
\`\`\`bash
# Run E2E tests headlessly
npm run test:e2e

# Open Cypress Test Runner
npm run test:e2e:open
\`\`\`

## Test Structure

### Unit Tests Location
\`\`\`
src/
├── __tests__/
│   ├── components/
│   │   ├── auth-form.test.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── use-auth.test.tsx
│   │   └── ...
│   └── utils/
│       ├── api-client.test.tsx
│       └── ...
\`\`\`

### E2E Tests Location
\`\`\`
cypress/
├── e2e/
│   ├── auth.cy.ts
│   ├── navigation.cy.ts
│   └── ...
├── support/
│   ├── commands.ts
│   └── e2e.ts
└── fixtures/
    └── example.json
\`\`\`

## Writing Tests

### Component Testing Example
\`\`\`tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MyComponent } from '@/components/my-component'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<MyComponent onClick={handleClick} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })
})
\`\`\`

### Hook Testing Example
\`\`\`tsx
import { renderHook, act } from '@testing-library/react'
import { useMyHook } from '@/hooks/use-my-hook'

describe('useMyHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current.value).toBe(0)
  })

  it('updates state correctly', () => {
    const { result } = renderHook(() => useMyHook())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.value).toBe(1)
  })
})
\`\`\`

### E2E Testing Example
\`\`\`tsx
describe('User Authentication', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should login successfully', () => {
    cy.get('[data-testid="email"]').type('user@example.com')
    cy.get('[data-testid="password"]').type('password123')
    cy.get('[data-testid="submit"]').click()
    
    cy.url().should('include', '/dashboard')
    cy.get('h1').should('contain', 'Welcome')
  })
})
\`\`\`

## Test Utilities

### Custom Render Function
\`\`\`tsx
// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
\`\`\`

### Mock Utilities
\`\`\`tsx
// mocks/handlers.ts
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
      ])
    )
  }),

  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        token: 'fake-jwt-token',
        user: { id: 1, name: 'John Doe' },
      })
    )
  }),
]
\`\`\`

## Coverage Configuration

### Jest Coverage Settings
\`\`\`js
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}
\`\`\`

## Best Practices

### Unit Testing
1. **Test Behavior, Not Implementation**
   - Focus on what the component does, not how it does it
   - Test user interactions and expected outcomes

2. **Use Descriptive Test Names**
   \`\`\`tsx
   // Good
   it('should display error message when login fails')
   
   // Bad
   it('should work')
   \`\`\`

3. **Arrange, Act, Assert Pattern**
   \`\`\`tsx
   it('should increment counter when button is clicked', () => {
     // Arrange
     render(<Counter />)
     
     // Act
     fireEvent.click(screen.getByRole('button'))
     
     // Assert
     expect(screen.getByText('1')).toBeInTheDocument()
   })
   \`\`\`

### E2E Testing
1. **Use Data Attributes for Selectors**
   \`\`\`tsx
   // Component
   <button data-testid="submit-button">Submit</button>
   
   // Test
   cy.get('[data-testid="submit-button"]').click()
   \`\`\`

2. **Create Custom Commands**
   \`\`\`tsx
   // cypress/support/commands.ts
   Cypress.Commands.add('login', (email, password) => {
     cy.get('[data-testid="email"]').type(email)
     cy.get('[data-testid="password"]').type(password)
     cy.get('[data-testid="submit"]').click()
   })
   
   // Usage
   cy.login('user@example.com', 'password123')
   \`\`\`

3. **Use Page Object Pattern**
   \`\`\`tsx
   // cypress/support/pages/login.ts
   export class LoginPage {
     visit() {
       cy.visit('/login')
     }
     
     fillEmail(email: string) {
       cy.get('[data-testid="email"]').type(email)
     }
     
     fillPassword(password: string) {
       cy.get('[data-testid="password"]').type(password)
     }
     
     submit() {
       cy.get('[data-testid="submit"]').click()
     }
   }
   \`\`\`

## Continuous Integration

### GitHub Actions Example
\`\`\`yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:coverage
      - run: npm run build
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        
  e2e:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm start &
      - run: npm run test:e2e
\`\`\`

## Debugging Tests

### Jest Debugging
\`\`\`bash
# Debug specific test
node --inspect-brk node_modules/.bin/jest --runInBand --no-cache path/to/test.js

# Debug with VS Code
# Add to .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "\${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
\`\`\`

### Cypress Debugging
\`\`\`tsx
// Add debugger in test
it('should debug this test', () => {
  cy.visit('/login')
  cy.debug() // Pauses execution
  cy.get('[data-testid="email"]').type('test@example.com')
})

// Use cy.pause() to pause execution
cy.pause()
\`\`\`

## Performance Testing

### Bundle Analysis
\`\`\`bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npx depcheck

# Audit dependencies
npm audit
\`\`\`

### Lighthouse CI
\`\`\`yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci && npm run build
      - run: npm install -g @lhci/cli@0.12.x
      - run: lhci autorun
\`\`\`

This comprehensive testing setup ensures your application is thoroughly tested at all levels, from individual components to complete user workflows.
\`\`\`

This completes the comprehensive Next.js 14 production-ready boilerplate! 🎉

## Final Summary

The boilerplate now includes:

### ✅ **Complete Feature Set**
- **Advanced UI Components**: Data tables, command palette, analytics dashboard
- **Comprehensive Testing**: Jest, React Testing Library, Cypress E2E tests
- **Production Utilities**: Search functionality, advanced animations, real-time features
- **Developer Experience**: Complete test setup, debugging tools, CI/CD examples

### ✅ **Testing Infrastructure**
- **Unit Tests**: Component and hook testing with mocks
- **Integration Tests**: API client and store testing
- **E2E Tests**: Complete user flow testing with Cypress
- **Coverage Reports**: Comprehensive coverage tracking
- **CI/CD Ready**: GitHub Actions workflows

### ✅ **Advanced Components**
- **DataTable**: Sortable, filterable table with pagination
- **SearchCommand**: Global search with keyboard shortcuts
- **AnalyticsDashboard**: Complete metrics dashboard
- **Advanced Animations**: Lottie and React Spring examples

### ✅ **Production Ready**
- **Performance Optimized**: Bundle analysis, lazy loading
- **Accessibility Compliant**: WCAG standards, screen reader support
- **SEO Optimized**: Meta tags, structured data
- **Security Hardened**: CSRF protection, input validation
- **Monitoring Ready**: Error tracking, analytics integration

This boilerplate provides everything needed to start building production-ready applications immediately, with comprehensive testing, advanced features, and best practices built-in from day one! 🚀
