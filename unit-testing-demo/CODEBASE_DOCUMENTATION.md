# TLC React Native Component Library - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Design Patterns](#architecture--design-patterns)
3. [File Index](#file-index)
4. [Core Components](#core-components)
5. [Configuration System](#configuration-system)
6. [Testing Framework](#testing-framework)
7. [Development Setup](#development-setup)
8. [Component Usage Guide](#component-usage-guide)

---

## Project Overview

The TLC (TypeScript Library Components) framework is a sophisticated React Native component library that provides a configuration-driven architecture for building mobile applications. It combines TypeScript's type safety with React Native's cross-platform capabilities, featuring a robust base wrapper system, JSON-based configuration management, and comprehensive testing infrastructure.

### Key Features
- **Configuration-Driven Design**: JSON-based runtime component configuration
- **Type-Safe Architecture**: Full TypeScript integration with advanced generic patterns
- **Event-Driven System**: Standardized event emission and handling
- **Comprehensive Testing**: Jest unit tests + Cypress component tests
- **Material Design Integration**: React Native Paper components
- **Expo Development**: Modern React Native development workflow

### Technology Stack
- **React Native**: 0.79.5
- **TypeScript**: 5.8.3
- **Expo**: 53.0.20
- **React Native Paper**: 5.14.5
- **Jest**: 29.7.0
- **Cypress**: 14.5.2

---

## Architecture & Design Patterns

### Base Wrapper Architecture

The framework is built around the `ReactBaseTLCWrapper<T>` abstract base class that provides:

1. **Generic Type Safety**: `<T extends BaseComponentConfig>`
2. **Lifecycle Management**: Initialization, configuration updates, cleanup
3. **Event System**: Standardized event emission with metadata
4. **Style Computation**: Static and dynamic style resolution
5. **Visibility Control**: Angular-style `ngIf` conditional rendering

### Configuration Management

Components are configured through JSON objects that extend `BaseComponentConfig`:
- **Runtime Configuration**: Dynamic property updates
- **Override System**: Environment-specific customization
- **Type Validation**: TypeScript interfaces ensure configuration integrity

### Event-Driven Pattern

All components emit standardized `TLCComponentEvent` objects:
```typescript
interface TLCComponentEvent {
  type: string;
  componentId: string;
  timestamp: number;
  data?: any;
  eventMeta?: EventMeta;
}
```

---

## File Index

### 📁 Project Structure Overview

#### **Core Framework** (`/projects/tlc-base/`)
| File | Purpose | Key Features |
|------|---------|-------------|
| `base/react-native-base-wrapper.component.ts` | Abstract base class for all TLC components | Generic typing, lifecycle management, event system |
| `base/utils/config-utils.ts` | Configuration utility functions | Configuration merging, validation, type helpers |
| `interfaces/components/common/index.ts` | Base interfaces and types | `BaseComponentConfig`, `EventMeta`, component types |
| `interfaces/components/tlc-button-config.ts` | Button-specific configuration | Button types, events, props, mode mapping |
| `interfaces/components/tlc-label-config.ts` | Label-specific configuration | Text styling, typography, accessibility |

#### **Component Implementations** (`/projects/tlc-components-mobile/`)
| File | Purpose | Key Features |
|------|---------|-------------|
| `tlc-button/tlc-button.component.tsx` | Interactive button component | Material Design theming, press events, loading states |
| `tlc-button/index.ts` | Button module exports | Component, factory functions, configuration helpers |
| `tlc-label/tlc-label.component.tsx` | Text display component | Typography control, styling, accessibility |
| `tlc-label/index.ts` | Label module exports | Component, factory functions, type definitions |
| `public-api.ts` | Public API surface | Main export point for library consumers |

#### **Configuration & Environment** (`/src/`)
| File | Purpose | Key Features |
|------|---------|-------------|
| `config/mobile-config.json` | Runtime component configuration | Pre-configured components, test scenarios |
| `environments/environment.ts` | Development environment settings | Debug flags, API endpoints, feature toggles |
| `environments/environment.prod.ts` | Production environment settings | Optimized configuration, performance settings |
| `mocks/SafeAreaContext.ts` | Testing mock for safe area | Jest testing support for React Native components |

#### **Interactive Demo Application** (`/app/`)
| File | Purpose | Key Features |
|------|---------|-------------|
| `index.tsx` | Interactive component showcase | Live configuration testing, side-by-side comparison, event logging |

#### **Testing Infrastructure** (`/tests/`)
| File | Purpose | Key Features |
|------|---------|-------------|
| `unit/tlc-button.test.tsx` | Jest unit tests for button | Component behavior, event handling, configuration |
| `unit/tlc-label.test.tsx` | Jest unit tests for label | Text rendering, styling, accessibility |
| `component/tlc-button.cy.tsx` | Cypress component tests for button | Interactive testing, user workflows |
| `component/tlc-label.cy.tsx` | Cypress component tests for label | Visual validation, configuration scenarios |

#### **Build & Configuration** (`/config/`)
| File | Purpose | Key Features |
|------|---------|-------------|
| `jest.config.ts` | Jest testing configuration | Coverage settings, transform patterns, test environment |
| `cypress.config.ts` | Cypress testing configuration | Component testing setup, browser configuration |
| `babel.config.ts` | Babel transpilation configuration | React Native preset, module resolution |
| `webpack.config.ts` | Webpack bundling configuration | Development server, hot reloading |

#### **TypeScript Configuration**
| File | Purpose | Key Features |
|------|---------|-------------|
| `tsconfig.json` | Main TypeScript configuration | Strict mode, path mapping, React Native types |
| `tsconfig.expo.json` | Expo-specific TypeScript settings | Metro bundler compatibility, Expo SDK types |
| `tsconfig.test.json` | Testing TypeScript configuration | Jest types, testing library types |

---

## Core Components

### TLCButton Component

**Location**: `/projects/tlc-components-mobile/tlc-button/tlc-button.component.tsx`

#### Features
- **Material Design Integration**: Uses React Native Paper Button component
- **Interactive Events**: Press, long press with customizable handlers
- **Loading States**: Built-in loading indicator support
- **Theming**: Primary/accent color schemes with custom styling
- **Keyboard Management**: Automatic keyboard dismissal on press
- **Accessibility**: ARIA labels and test ID support

#### Configuration Interface
```typescript
interface TLCButtonConfig extends BaseComponentConfig {
  label: string;
  type: "text" | "outlined" | "contained" | "RAISED" | "STROKED" | "BASIC";
  color?: string;
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  loading?: boolean;
  longPress?: boolean;
  accessibilityLabel?: string;
}
```

#### Event Types
- `initialized`: Component lifecycle start
- `press`: Standard button press interaction
- `longPress`: Long press interaction (if enabled)
- `destroyed`: Component cleanup

### TLCLabel Component

**Location**: `/projects/tlc-components-mobile/tlc-label/tlc-label.component.tsx`

#### Features
- **Typography Control**: Font size, weight, style customization
- **Text Formatting**: Alignment, color, line height
- **Dynamic Content**: Runtime text updates with change detection
- **Accessibility**: Screen reader support and semantic markup
- **Responsive Design**: Flexible sizing and layout adaptation

#### Configuration Interface
```typescript
interface TLCLabelConfig extends BaseComponentConfig {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  accessibilityLabel?: string;
}
```

---

## Configuration System

### JSON-Based Configuration

**Location**: `/src/config/mobile-config.json`

The configuration system provides runtime component setup through structured JSON:

#### Component Configuration Structure
```json
{
  "components": {
    "componentName": {
      "type": "TLCButton" | "TLCLabel",
      "config": {
        "id": "unique-identifier",
        // Component-specific properties
      }
    }
  }
}
```

#### Example Button Configuration
```json
{
  "primaryButton": {
    "type": "TLCButton",
    "config": {
      "id": "primary-btn",
      "label": "Primary Action",
      "type": "contained",
      "color": "primary",
      "size": "large",
      "disabled": false,
      "loading": false
    }
  }
}
```

#### Test Scenarios
The configuration includes predefined test scenarios for validation:
```json
{
  "testScenarios": {
    "buttonPress": {
      "componentId": "primary-btn",
      "expectedEvents": ["initialized", "press"]
    }
  }
}
```

### Configuration Utilities

**Location**: `/projects/tlc-base/base/utils/config-utils.ts`

Provides helper functions for:
- Configuration merging and inheritance
- Type validation and casting
- Default value application
- Environment-specific overrides

---

## Testing Framework

### Jest Unit Testing

**Location**: `/tests/unit/`

#### Test Coverage Areas
1. **Component Rendering**: Proper component instantiation and display
2. **Event Handling**: User interaction event emission and callback execution
3. **Configuration Management**: Property application and change detection
4. **Lifecycle Events**: Initialization and cleanup behavior
5. **State Management**: Disabled, loading, and visibility states

#### Example Test Structure
```typescript
describe('TlcButton - Core Functionality Tests', () => {
  it('renders with correct text and basic functionality', () => {
    const config = createButtonConfig('tlc-button');
    const { getByText, getByTestId } = renderWithProvider(
      <TLCButton config={config} />
    );
    expect(getByText('Press me')).toBeTruthy();
    expect(getByTestId('tlc-button')).toBeTruthy();
  });
});
```

### Cypress Component Testing

**Location**: `/tests/component/`

#### Interactive Testing Features
1. **Component Mounting**: Real browser component rendering
2. **User Interaction Simulation**: Click, touch, keyboard events
3. **Visual Validation**: Screenshot comparison and visual regression
4. **Configuration Testing**: Dynamic property changes and effects

#### Example Cypress Test
```typescript
describe('TLCButton Component', () => {
  it('should render and handle basic interactions', () => {
    const config = createButtonConfig('cypress-test');
    cy.mount(<TLCButton config={config} />);
    cy.get('[data-testid="cypress-test"]').should('be.visible');
    cy.get('[data-testid="cypress-test"]').click();
  });
});
```

### Test Configuration

#### Jest Configuration (`/config/jest.config.ts`)
- **Environment**: jsdom for React Native compatibility
- **Coverage**: Source code coverage reporting with HTML output
- **Transform Patterns**: Support for React Native and Expo modules
- **Setup Files**: Custom test environment initialization

#### Cypress Configuration (`/config/cypress.config.ts`)
- **Component Testing**: Isolated component testing mode
- **Browser Support**: Chrome, Firefox, Edge compatibility
- **Video Recording**: Automatic test execution recording
- **Screenshot Capture**: Failure state documentation

---

## Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI for React Native development
- iOS Simulator (macOS) or Android Emulator

### Installation Commands
```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Run Jest unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Open Cypress component testing
npm run cypress

# Run Cypress tests headlessly
npm run cypress:run
```

### Development Scripts

#### Primary Commands
- `npm start`: Launch Expo development server with QR code
- `npm test`: Execute Jest test suite with watch mode
- `npm run test:coverage`: Generate comprehensive test coverage report

#### Testing Commands
- `npm run test:watch`: Continuous test execution with file watching
- `npm run cypress`: Interactive Cypress component testing interface
- `npm run cypress:run`: Headless Cypress test execution for CI/CD

### Build Configuration

#### TypeScript Configuration
- **Strict Mode**: Enabled for maximum type safety
- **Path Mapping**: Absolute imports for clean module resolution
- **React Native Types**: Full React Native and Expo type definitions

#### Babel Configuration
- **React Native Preset**: Optimized transpilation for mobile
- **Module Resolver**: Path aliasing for project structure navigation
- **TypeScript Support**: Seamless TypeScript to JavaScript conversion

---

## Component Usage Guide

### Basic Button Implementation

```typescript
import { TLCButton } from './projects/tlc-components-mobile/tlc-button';
import { TLCButtonEvent } from './projects/tlc-base';

const handleButtonEvent = (event: TLCButtonEvent) => {
  console.log(`Button ${event.componentId} emitted ${event.type}`);
};

const buttonConfig = {
  id: 'my-button',
  label: 'Click Me',
  type: 'contained' as const,
  color: 'primary',
  disabled: false
};

<TLCButton config={buttonConfig} onEvent={handleButtonEvent} />
```

### Advanced Label Usage

```typescript
import { TLCLabel } from './projects/tlc-components-mobile/tlc-label';

const labelConfig = {
  id: 'my-label',
  text: 'Welcome to TLC Framework',
  visible: true,
  stl: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#125B4E',
    textAlign: 'center' as const
  }
};

<TLCLabel config={labelConfig} />
```

### Configuration-Driven Development

```typescript
// Load configuration from JSON
import mobileConfig from './src/config/mobile-config.json';

// Extract component configuration
const primaryButtonConfig = mobileConfig.components.primaryButton.config;

// Apply runtime overrides
const customConfig = {
  ...primaryButtonConfig,
  label: 'Custom Label',
  disabled: false
};

<TLCButton config={customConfig} onEvent={handleEvents} />
```

### Event-Driven Architecture

```typescript
const [eventLog, setEventLog] = useState<TLCComponentEvent[]>([]);

const handleComponentEvent = (event: TLCComponentEvent) => {
  setEventLog(prev => [...prev, event]);
  
  switch (event.type) {
    case 'initialized':
      console.log(`Component ${event.componentId} ready`);
      break;
    case 'press':
      console.log(`Button pressed:`, event.data);
      break;
    case 'destroyed':
      console.log(`Component ${event.componentId} cleanup`);
      break;
  }
};
```

### Demo Application Integration

The interactive demo application (`/app/index.tsx`) showcases:

1. **Live Configuration Testing**: Real-time component property modification
2. **Side-by-Side Comparison**: Default vs. custom configuration visualization
3. **Event Logging**: Comprehensive event monitoring and debugging
4. **Configuration Override**: Runtime property customization examples

#### Demo Features
- **Component Showcase**: Visual display of all available components
- **Interactive Testing**: Button presses, configuration changes
- **Event Monitoring**: Real-time event stream with timestamps
- **Configuration Comparison**: Default vs. custom side-by-side view
- **Styling Examples**: Various theming and styling demonstrations

---

## Summary

The TLC React Native Component Library represents a well-architected, production-ready framework for building mobile applications with TypeScript. It provides:

- **Type-Safe Development**: Full TypeScript integration with advanced patterns
- **Configuration-Driven Design**: JSON-based runtime component customization
- **Comprehensive Testing**: Unit and component testing with high coverage
- **Event-Driven Architecture**: Standardized component communication
- **Material Design Integration**: Modern, accessible UI components
- **Developer Experience**: Interactive demo app and comprehensive documentation

This framework enables rapid development of consistent, maintainable React Native applications while providing the flexibility and type safety that modern mobile development demands.