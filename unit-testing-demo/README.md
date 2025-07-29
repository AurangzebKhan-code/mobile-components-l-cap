# React Native Component Testing Demo

A comprehensive demonstration project showcasing advanced testing strategies for React Native components using a dual approach with **Jest** (unit testing) and **Cypress** (component testing), featuring full TypeScript support and a sophisticated component architecture.

## 🚀 Project Overview

This project serves as a complete reference implementation for testing React Native applications with enterprise-grade quality standards. It addresses the complex challenges of testing React Native Paper components in browser environments while maintaining full compatibility with native mobile platforms.

### Purpose & Goals
- **Demonstrate Best Practices**: Showcase industry-standard testing methodologies for React Native applications
- **Bridge Platform Gap**: Enable seamless testing of React Native components in web browsers through Cypress
- **Type Safety**: Provide comprehensive TypeScript coverage across all testing environments
- **Architecture Example**: Illustrate scalable component architecture patterns with wrapper-based design

## ✨ Key Features

- **🔄 Dual Testing Strategy**: Jest for logic validation + Cypress for visual/interaction testing
- **🎯 Full TypeScript Support**: Complete type safety across all test environments and component layers
- **📱 React Native Paper Integration**: Production-ready testing of Material Design components
- **🌐 Web Component Testing**: Run authentic React Native components in browser via react-native-web
- **🏗️ Sophisticated Architecture**: Multi-layered component wrapper system for framework flexibility
- **📊 Comprehensive Coverage**: Detailed test coverage analysis with HTML reports
- **🍎 Apple Silicon Optimized**: Native support for M1/M2/M3/M4 Macs with Rosetta compatibility
- **⚡ Configuration Management**: Advanced configuration utilities for component state management

## 🛠 Technology Stack

| Technology | Purpose | Version | Configuration |
|------------|---------|---------|---------------|
| **React Native** | Mobile framework | 0.79.5 | Expo 53.x |
| **TypeScript** | Type safety | ~5.8.3 | Multiple tsconfig files |
| **Jest** | Unit testing | ^29.7.0 | jest-expo preset |
| **Cypress** | Component testing | ^14.5.2 | Custom webpack config |
| **React Native Paper** | UI components | ^5.14.5 | react-native-web integration |
| **Webpack** | Cypress bundling | Custom | Babel + TypeScript loaders |
| **Expo** | Development platform | ~53.0.20 | Full SDK integration |

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- macOS (for Apple Silicon optimization)

### Setup

```bash
# Clone and install
git clone <repository-url>
cd unit-testing-demo
npm install

# For Apple Silicon Macs - Install Cypress with Rosetta
arch -x86_64 npx cypress install
```

## 🧪 Testing Commands

```bash
# Jest Unit Testing
npm test                    # Run all Jest tests
npm run test:watch         # Watch mode
npm run test:coverage      # Generate coverage report

# Cypress Component Testing  
npm run cypress            # Open Cypress GUI
npm run cypress:run        # Run headless

# View Coverage
open coverage/lcov-report/index.html
```

## 🏗 Project Architecture

### Directory Structure
```
unit-testing-demo/
├── src/                           # Source code
│   ├── components/                # React Native components
│   │   ├── tlc-button/           # Button component module
│   │   │   ├── TLCButtonComponent.tsx    # Main component implementation
│   │   │   └── index.ts                  # Public API exports
│   │   └── tlc-label/            # Label component module
│   │       ├── TLCLabelComponent.tsx     # Label implementation
│   │       └── index.ts                  # Public API exports
│   ├── core/                     # Core architecture layers
│   │   ├── base/                 # Base wrapper classes
│   │   │   ├── BaseTLCWrapper.ts         # Framework-agnostic base
│   │   │   └── ReactNativeBaseTLCWrapper.ts  # RN-specific wrapper
│   │   └── types/                # TypeScript definitions
│   │       ├── TLCButtonTypes.ts         # Button type definitions
│   │       └── TLCLabelTypes.ts          # Label type definitions
│   ├── utils/                    # Utility functions
│   │   └── ConfigurationUtils.ts         # Component config helpers
│   └── mocks/                    # Test mocks
│       └── SafeAreaContext.ts            # RN SafeArea mock
├── tests/                        # Test suites
│   ├── unit/                     # Jest unit tests
│   │   ├── tlc-button.test.tsx           # Button unit tests
│   │   └── tlc-label.test.tsx            # Label unit tests
│   └── component/                # Cypress component tests
│       ├── tlc-button.cy.tsx             # Button E2E tests
│       └── tlc-label.cy.tsx              # Label E2E tests
├── config/                       # Configuration files
│   ├── jest.config.ts                    # Jest test configuration
│   ├── cypress.config.ts                 # Cypress test configuration
│   ├── webpack.config.ts                 # Webpack bundling config
│   └── babel.config.ts                   # Babel transpilation config
├── cypress/                      # Cypress test environment
│   ├── support/                          # Cypress support files
│   │   ├── component.ts                  # Component test setup
│   │   ├── component.d.ts                # Cypress type definitions
│   │   └── commands.ts                   # Custom Cypress commands
│   └── tsconfig.json                     # Cypress TypeScript config
├── coverage/                     # Test coverage reports
│   ├── lcov-report/                      # HTML coverage reports
│   ├── lcov.info                         # LCOV coverage data
│   └── coverage-final.json               # JSON coverage summary
├── types/                        # Global type definitions
│   └── jest.d.ts                         # Jest global types
├── tsconfig.json                 # Main TypeScript configuration
├── tsconfig.expo.json           # Expo-specific TypeScript config
├── tsconfig.test.json           # Test-specific TypeScript config
└── package.json                 # Dependencies and scripts
```

### Component Architecture

The project implements a sophisticated three-layer architecture:

#### 1. **BaseTLCWrapper** (Framework-Agnostic)
- Core component logic and state management
- Event handling abstractions
- Configuration validation and defaults
- Accessibility foundations

#### 2. **ReactNativeBaseTLCWrapper** (React Native-Specific)
- React Native theme integration
- Platform-specific styling logic
- React Native Paper compatibility
- Mobile-optimized event handling

#### 3. **Component Layer** (TLCButton/TLCLabel)
- Specific component implementations
- React Native Paper component integration
- Component-specific business logic
- Public API surface

## 🔧 Key Configurations

### TypeScript Setup
- **Main**: `tsconfig.json` - Project-wide TypeScript config
- **Expo**: `tsconfig.expo.json` - Expo-specific settings  
- **Cypress**: `cypress/tsconfig.json` - Testing environment config

### Testing Configuration
- **Jest**: Uses `jest-expo` preset with React Native Paper transform
- **Cypress**: Custom webpack with babel-loader for TypeScript + JSX
- **Coverage**: Excludes Cypress files, includes all source files

## 🧩 Component Testing Strategy

This project implements a comprehensive dual-testing approach that validates both logic and user experience:

### Jest (Unit Testing)
**Purpose**: Logic validation and behavior verification
- **Framework**: React Native Testing Library + Jest
- **Environment**: Node.js with jsdom simulation
- **Focus Areas**:
  - Component prop handling and state management
  - Event handler logic and callback execution
  - Configuration validation and defaults
  - Accessibility attribute generation
  - Component lifecycle management
- **Advantages**: Fast execution, isolated testing, ideal for TDD workflows
- **Test Coverage**: Core business logic, error handling, edge cases

### Cypress (Component Testing)
**Purpose**: Visual validation and interaction testing
- **Framework**: Cypress Component Testing with React Native Web
- **Environment**: Real browser (Chromium-based)
- **Focus Areas**:
  - Visual rendering and appearance validation
  - User interaction flows (click, tap, gestures)
  - Component gallery and design system validation
  - Cross-browser compatibility testing
  - Screenshot-based regression testing
- **Advantages**: Real browser environment, visual feedback, debugging tools
- **Test Coverage**: UI/UX validation, integration testing, visual regression

### Testing Philosophy

| Aspect | Jest | Cypress |
|--------|------|---------|
| **Speed** | ⚡ Very Fast | 🐌 Slower |
| **Isolation** | ✅ Perfect | ⚠️ Integrated |
| **Visual Feedback** | ❌ None | ✅ Full |
| **Debugging** | 📝 Text-based | 🎯 Visual |
| **CI/CD** | ✅ Ideal | ⚠️ Resource intensive |
| **Browser Compatibility** | ❌ N/A | ✅ Multi-browser |

## 💡 Usage Examples

### Basic Component Usage

```typescript
import { TLCButton, createButtonConfig } from './src/components/tlc-button';
import { TLCLabel, createLabelConfig } from './src/components/tlc-label';

// Basic button with default configuration
<TLCButton />

// Customized button with configuration
const buttonConfig = createButtonConfig('my-button', {
  label: 'Click Me',
  color: 'primary',
  type: 'contained',
  size: 'large'
});

<TLCButton 
  config={buttonConfig}
  onPress={(event) => console.log('Button pressed:', event)}
  onInit={() => console.log('Button initialized')}
/>

// Label with dynamic configuration
const labelConfig = createLabelConfig('status-label', {
  text: 'Loading...',
  visible: true
});

<TLCLabel config={labelConfig} />
```

### Advanced Configuration Patterns

```typescript
// Using configuration utilities
import { 
  createPrimaryButtonConfig,
  createSecondaryButtonConfig,
  createLoadingButtonConfig,
  mergeButtonConfigs
} from './src/utils/ConfigurationUtils';

// Pre-configured button types
const primaryButton = createPrimaryButtonConfig('submit-btn', 'Submit Form');
const secondaryButton = createSecondaryButtonConfig('cancel-btn', 'Cancel');
const loadingButton = createLoadingButtonConfig('save-btn', 'Saving...', true);

// Advanced configuration merging
const complexButton = mergeButtonConfigs(
  createButtonConfig('base-btn', { label: 'Base' }),
  { color: 'accent', size: 'large' },
  { loading: false, disabled: false }
);
```

### Adding New Components

**Step 1**: Create Component Structure
```bash
mkdir src/components/tlc-newcomponent
touch src/components/tlc-newcomponent/TLCNewComponent.tsx
touch src/components/tlc-newcomponent/index.ts
```

**Step 2**: Implement Core Types
```typescript
// src/core/types/TLCNewComponentTypes.ts
export interface TLCNewComponentConfig extends BaseComponentConfig {
  // Component-specific properties
}
```

**Step 3**: Create Component Implementation
```typescript
// src/components/tlc-newcomponent/TLCNewComponent.tsx
export const TLCNewComponent: React.FC<TLCNewComponentProps> = ({ config, ...props }) => {
  // Implementation using wrapper pattern
};
```

**Step 4**: Add Test Suites
```bash
# Jest unit tests
touch tests/unit/tlc-newcomponent.test.tsx

# Cypress component tests  
touch tests/component/tlc-newcomponent.cy.tsx
```

**Step 5**: Run Complete Test Suite
```bash
npm test && npm run cypress:run
```

### Configuration Management

```typescript
// Dynamic configuration updates
const [buttonConfig, setButtonConfig] = useState(
  createLabelConfig('dynamic-btn', { label: 'Initial' })
);

// Update configuration
setButtonConfig(prev => ({
  ...prev,
  label: 'Updated Label',
  color: 'secondary'
}));

// Validation before use
if (validateButtonConfig(buttonConfig)) {
  // Safe to use configuration
}
```

## 🚀 Development Workflow

### Quick Start Development Cycle

```bash
# 1. Start development environment
npm install

# 2. Run tests in watch mode (TDD approach)
npm run test:watch

# 3. Run component tests for visual validation
npm run cypress

# 4. Generate coverage report
npm run test:coverage
open coverage/lcov-report/index.html
```

### Recommended Development Process

1. **Design First**: Define component interface and configuration types
2. **Test-Driven Development**: Write Jest tests for core logic
3. **Implementation**: Build component using wrapper architecture
4. **Visual Validation**: Create Cypress tests for UI/UX verification
5. **Integration**: Test component integration with React Native Paper
6. **Documentation**: Update configuration utilities and examples

### Code Quality Standards

- **TypeScript**: Strict mode enabled, no implicit any
- **Testing**: Minimum 90% code coverage required
- **Architecture**: Follow established wrapper pattern
- **Accessibility**: All components must support screen readers
- **Performance**: Components must render in <100ms

## 🔧 Advanced Configuration

### Custom Webpack Configuration
The project uses a custom webpack configuration for Cypress that enables React Native Web compatibility:

```javascript
// config/webpack.config.ts
module.exports = {
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-vector-icons': 'react-native-vector-icons/dist'
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader'
      }
    ]
  }
};
```

### Jest Configuration Optimization
```javascript
// config/jest.config.ts
transformIgnorePatterns: [
  'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|react-native-paper)'
]
```

### TypeScript Configuration Matrix
- **`tsconfig.json`**: Main project configuration with React Native types
- **`tsconfig.expo.json`**: Expo-specific build configuration
- **`tsconfig.test.json`**: Test environment with Jest types
- **`cypress/tsconfig.json`**: Cypress-specific with DOM types

## 🐛 Troubleshooting Guide

### Installation Issues

#### Apple Silicon Compatibility
```bash
# For M1/M2/M3/M4 Macs - Use Rosetta for Cypress
arch -x86_64 npx cypress install

# Alternative: Use Rosetta terminal
arch -x86_64 zsh
npm install
```

#### Node.js Version Compatibility
```bash
# Ensure Node.js 18+ is installed
node --version  # Should show v18.x.x or higher
npm --version   # Should show v9.x.x or higher
```

### Development Issues

#### TypeScript Compilation Errors
```bash
# Common fixes
1. Ensure jsx: "react-jsx" in cypress/tsconfig.json
2. Verify babel presets include TypeScript support
3. Clear TypeScript build cache: rm -rf **/*.tsbuildinfo
4. Restart TypeScript service in your IDE
```

#### React Native Web Issues
```bash
# Check webpack aliases
1. Verify react-native → react-native-web mapping
2. Ensure vector icons are properly aliased
3. Check that Paper components render correctly in browser
```

#### Test Environment Issues
```bash
# Jest issues
1. Clear Jest cache: npx jest --clearCache
2. Verify jest-expo preset is properly configured
3. Check transform ignore patterns include all RN packages

# Cypress issues  
1. Clear Cypress cache: npx cypress cache clear
2. Verify webpack config loads correctly
3. Check browser compatibility
```

### Performance Optimization

#### Test Performance
```bash
# Speed up Jest tests
npm test -- --maxWorkers=4 --cache

# Optimize Cypress tests
npm run cypress:run -- --browser chrome --headless
```

#### Development Performance
```bash
# Use development builds
NODE_ENV=development npm run cypress

# Enable webpack caching
# Already configured in webpack.config.ts
```

### Common Error Messages

| Error | Solution |
|-------|----------|
| `Cannot resolve 'react-native'` | Check webpack aliases configuration |
| `TypeError: Cannot read property 'colors'` | Wrap component in PaperProvider |
| `Module not found: Can't resolve '@expo/vector-icons'` | Run `npx expo install @expo/vector-icons` |
| `jest-expo preset not found` | Reinstall with `npm install --save-dev jest-expo` |
| `Cypress binary not found` | Run `npx cypress install` |

## 📚 Additional Resources

### Documentation
- **[CODEBASE_DOCUMENTATION.md](./CODEBASE_DOCUMENTATION.md)** - Complete technical documentation
- **[Coverage Reports](./coverage/lcov-report/index.html)** - Interactive test coverage analysis
- **Component Gallery** - Run `npm run cypress` to see visual component gallery

### Learning Resources
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction)
- [React Native Paper](https://reactnativepaper.com/)
- [React Native Web](https://necolas.github.io/react-native-web/)

### Architecture References
- Component Wrapper Pattern Documentation
- Framework-Agnostic Component Design
- TypeScript Best Practices for React Native
- Test Strategy for Cross-Platform Components

## 🤝 Contributing

### Development Process
1. **Fork** the repository and create a feature branch
2. **Follow** the established architectural patterns
3. **Write tests** for both Jest and Cypress
4. **Maintain** minimum 90% test coverage
5. **Document** any new configuration utilities
6. **Submit** pull request with detailed description

### Code Standards
- Use TypeScript strict mode
- Follow established naming conventions
- Implement proper error handling
- Add comprehensive JSDoc comments
- Maintain backward compatibility

### Pull Request Requirements
- [ ] All tests passing (Jest + Cypress)
- [ ] Code coverage above 90%
- [ ] TypeScript compilation without errors
- [ ] Documentation updated
- [ ] Component gallery examples added (if applicable)

---

**Last Updated**: 2025-01-28  
**Version**: 1.0.0  
**License**: MIT  
**Maintainer**: Component Architecture Team



