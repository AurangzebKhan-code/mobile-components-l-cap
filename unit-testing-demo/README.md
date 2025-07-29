# TLC React Native Component Library

A sophisticated React Native component library built with TypeScript, featuring configuration-driven architecture, comprehensive testing, and Material Design integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Open interactive testing
npm run cypress
```

## 📋 Table of Contents
- [🎯 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [🧩 Components](#-components)
- [⚙️ Configuration](#️-configuration)
- [🧪 Testing](#-testing)
- [🔧 Development](#-development)
- [📜 Scripts](#-scripts)
- [🎯 Event System](#-event-system)
- [🎨 Demo Application](#-demo-application)
- [🛡️ Type Safety](#️-type-safety)
- [📈 Coverage & Quality](#-coverage--quality)
- [🚀 Production Ready](#-production-ready)

## 🎯 Overview

The TLC (TypeScript Library Components) framework provides:

- **🔧 Configuration-Driven**: JSON-based runtime component setup
- **🛡️ Type-Safe**: Full TypeScript integration with advanced generics
- **📱 Material Design**: React Native Paper component integration
- **🧪 Comprehensive Testing**: Jest unit tests + Cypress component tests
- **🎯 Event-Driven**: Standardized event system for component communication
- **📐 Expo Compatible**: Modern React Native development workflow

### Technology Stack
- **React Native**: 0.79.5
- **TypeScript**: 5.8.3
- **Expo**: 53.0.20
- **React Native Paper**: 5.14.5
- **Jest**: 29.7.0
- **Cypress**: 14.5.2

## 🏗️ Architecture

### Base Wrapper System

All components extend `ReactBaseTLCWrapper<T>` which provides:

```typescript
abstract class ReactBaseTLCWrapper<T extends BaseComponentConfig> {
  // Configuration management
  // Event system
  // Lifecycle management
  // Style computation
  // Visibility control
}
```

### Project Structure

```
unit-testing-demo/
├── projects/
│   ├── tlc-base/                    # Core framework
│   │   ├── base/
│   │   │   ├── react-native-base-wrapper.component.ts
│   │   │   └── utils/config-utils.ts
│   │   └── interfaces/              # Type definitions
│   └── tlc-components-mobile/       # Component implementations
│       ├── tlc-button/
│       └── tlc-label/
├── app/
│   └── index.tsx                    # Interactive demo
├── tests/
│   ├── unit/                        # Jest tests
│   └── component/                   # Cypress tests
├── config/                          # Build configuration
└── src/
    ├── config/mobile-config.json    # Component configurations
    └── environments/                # Environment settings
```

## 🧩 Components

### TLCButton

Interactive button component with Material Design theming.

**Features:**
- Press & long press events
- Loading states
- Material Design modes (contained, outlined, text)
- Custom theming & styling
- Accessibility support

**Usage:**
```typescript
import { TLCButton } from './projects/tlc-components-mobile/tlc-button';

const buttonConfig = {
  id: 'my-button',
  label: 'Click Me',
  type: 'contained',
  color: 'primary',
  disabled: false
};

<TLCButton config={buttonConfig} onEvent={handleEvent} />
```

**Configuration:**
```typescript
interface TLCButtonConfig extends BaseComponentConfig {
  label: string;
  type: "text" | "outlined" | "contained" | "RAISED" | "STROKED" | "BASIC";
  color?: string;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  longPress?: boolean;
  icon?: string;
}
```

### TLCLabel

Text display component with typography control.

**Features:**
- Dynamic text updates with change detection
- Typography customization
- Text formatting & alignment
- Accessibility support
- Responsive design

**Usage:**
```typescript
import { TLCLabel } from './projects/tlc-components-mobile/tlc-label';

const labelConfig = {
  id: 'my-label',
  text: 'Welcome to TLC',
  stl: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#125B4E',
    textAlign: 'center'
  }
};

<TLCLabel config={labelConfig} />
```

**Configuration:**
```typescript
interface TLCLabelConfig extends BaseComponentConfig {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}
```

## ⚙️ Configuration

### JSON-Based Setup

Components are configured through `src/config/mobile-config.json`:

```json
{
  "components": {
    "primaryButton": {
      "type": "TLCButton",
      "config": {
        "id": "primary-btn",
        "label": "Primary Action",
        "type": "contained",
        "color": "primary",
        "disabled": false
      }
    },
    "welcomeLabel": {
      "type": "TLCLabel",
      "config": {
        "id": "welcome-lbl",
        "text": "Welcome to Mobile App",
        "stl": {
          "fontSize": 24,
          "fontWeight": "bold"
        }
      }
    }
  }
}
```

### Runtime Configuration

```typescript
// Load from JSON
import mobileConfig from './src/config/mobile-config.json';

// Apply runtime overrides
const customConfig = {
  ...mobileConfig.components.primaryButton.config,
  label: 'Custom Label',
  disabled: false
};
```

## 🧪 Testing

### Jest Unit Tests

**Location**: `tests/unit/`

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Structure:**
```typescript
describe('TLCButton - Core Functionality', () => {
  it('renders with correct properties', () => {
    const config = createButtonConfig('test-button');
    const { getByText, getByTestId } = renderWithProvider(
      <TLCButton config={config} />
    );
    expect(getByText('Press me')).toBeTruthy();
    expect(getByTestId('test-button')).toBeTruthy();
  });
});
```

### Cypress Component Tests

**Location**: `tests/component/`

```bash
# Interactive testing
npm run cypress

# Headless testing
npm run cypress:run
```

**Test Example:**
```typescript
describe('TLCButton Component', () => {
  it('handles user interactions', () => {
    const config = createButtonConfig('cypress-test');
    cy.mount(<TLCButton config={config} />);
    cy.get('[data-testid="cypress-test"]').should('be.visible');
    cy.get('[data-testid="cypress-test"]').click();
  });
});
```

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Environment Setup

```bash
# Clone repository
git clone <repository-url>
cd unit-testing-demo

# Install dependencies
npm install

# Start development server
npm start
```

### Development Workflow

1. **Component Development**: Create new components in `projects/tlc-components-mobile/`
2. **Configuration**: Update `src/config/mobile-config.json`
3. **Testing**: Add unit tests in `tests/unit/` and component tests in `tests/component/`
4. **Demo**: Test in interactive demo at `app/index.tsx`

## 📜 Scripts

### Primary Commands
| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm test` | Run Jest test suite |
| `npm run test:coverage` | Generate test coverage report |

### Testing Commands
| Command | Description |
|---------|-------------|
| `npm run test:watch` | Jest in watch mode |
| `npm run cypress` | Interactive Cypress testing |
| `npm run cypress:run` | Headless Cypress testing |

## 🎯 Event System

All components emit standardized events:

```typescript
interface TLCComponentEvent {
  type: string;                    // 'initialized', 'press', 'textChanged'
  componentId: string;             // Unique component identifier
  timestamp: number;               // Event timestamp
  data?: any;                      // Event-specific payload
  eventMeta?: EventMeta;          // Additional metadata
}
```

**Event Handling:**
```typescript
const handleComponentEvent = (event: TLCComponentEvent) => {
  switch (event.type) {
    case 'initialized':
      console.log(`Component ${event.componentId} ready`);
      break;
    case 'press':
      console.log('Button pressed:', event.data);
      break;
    case 'textChanged':
      console.log('Text updated:', event.data);
      break;
  }
};
```

## 🎨 Demo Application

The interactive demo (`app/index.tsx`) showcases:

- **Live Configuration Testing**: Real-time property modification
- **Side-by-Side Comparison**: Default vs. custom configurations
- **Event Monitoring**: Real-time event logging
- **Component Showcase**: Visual display of all components

## 🛡️ Type Safety

Full TypeScript integration with:

- **Generic Base Classes**: Type-safe component extensions
- **Configuration Interfaces**: Compile-time validation
- **Event Type Safety**: Strongly typed event system
- **Path Mapping**: Clean import resolution

## 📈 Coverage & Quality

- **Jest Coverage**: Unit test coverage reporting
- **Cypress Testing**: Interactive component validation
- **TypeScript Strict Mode**: Maximum type safety
- **ESLint Integration**: Code quality enforcement

## 🚀 Production Ready

The framework provides:

- **Optimized Builds**: Production-ready bundling
- **Environment Configuration**: Dev/prod environment support
- **Performance Monitoring**: Event tracking and analytics
- **Accessibility**: ARIA compliance and screen reader support

---

**TLC React Native Component Library** - Built with ❤️ for modern mobile development