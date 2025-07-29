# Codebase Documentation

## Table of Contents

1. [Project Overview and Purpose](#project-overview-and-purpose)
   - [Core Objectives](#core-objectives)
2. [Architecture Overview](#architecture-overview)
   - [Component Relationships](#component-relationships)
3. [File Structure Mapping](#file-structure-mapping)
   - [Root Directory Structure](#root-directory-structure)
   - [Source Code Organization](#source-code-organization)
   - [Test Suite Organization](#test-suite-organization)
   - [Configuration Files](#configuration-files)
   - [Build Artifacts and Reports](#build-artifacts-and-reports)
   - [TypeScript Configuration](#typescript-configuration)
4. [Dependencies Analysis](#dependencies-analysis)
   - [Production Dependencies](#production-dependencies)
   - [Development Dependencies](#development-dependencies)
   - [Dependency Relationships](#dependency-relationships)
5. [Key Functionality Breakdown](#key-functionality-breakdown)
   - [Component System](#component-system)
   - [Wrapper Architecture](#wrapper-architecture)
   - [Configuration Utilities](#configuration-utilities)
6. [API Documentation](#api-documentation)
   - [TLCButton API](#tlcbutton-api)
   - [TLCLabel API](#tlclabel-api)
   - [Configuration Utilities API](#configuration-utilities-api)
7. [Testing Strategy and Coverage](#testing-strategy-and-coverage)
   - [Dual Testing Approach](#dual-testing-approach)
   - [Test Organization](#test-organization)
   - [Testing Best Practices](#testing-best-practices)
8. [Setup and Usage Instructions](#setup-and-usage-instructions)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Development Workflow](#development-workflow)
   - [Using Components](#using-components)
   - [Adding New Components](#adding-new-components)
9. [Code Patterns and Conventions](#code-patterns-and-conventions)
   - [Naming Conventions](#naming-conventions)
   - [Architectural Patterns](#architectural-patterns)
   - [TypeScript Conventions](#typescript-conventions)
   - [Testing Conventions](#testing-conventions)
   - [Code Quality Standards](#code-quality-standards)
10. [Architecture Decisions and Rationale](#architecture-decisions-and-rationale)

## Project Overview and Purpose

The **unit-testing-demo** project is a comprehensive React Native component library demonstration that showcases enterprise-grade testing strategies and architecture patterns. It serves as a reference implementation for building testable, maintainable, and scalable React Native applications with a focus on component reusability and quality assurance.

### Core Objectives
- Demonstrate dual testing strategy using Jest (unit testing) and Cypress (component testing)
- Provide a scalable component architecture using the wrapper pattern
- Enable cross-platform component development with React Native Web compatibility
- Showcase TypeScript best practices with complete type safety
- Implement comprehensive test coverage and quality metrics

## Architecture Overview

The project implements a sophisticated three-layer architecture that promotes separation of concerns and framework flexibility:

```
┌─────────────────────────────────────────────────────────────┐
│                    Component Layer                           │
│         (TLCButton, TLCLabel - Business Logic)              │
├─────────────────────────────────────────────────────────────┤
│              ReactBaseTLCWrapper Layer                       │
│    (React Native Specific - Theme, Styling, Platform)       │
├─────────────────────────────────────────────────────────────┤
│                  BaseTLCWrapper Layer                        │
│        (Framework Agnostic - Core State, Events)            │
└─────────────────────────────────────────────────────────────┘
```

### Component Relationships

1. **Base Layer**: Framework-agnostic foundation providing core lifecycle management
2. **React Native Layer**: Platform-specific implementations and integrations
3. **Component Layer**: Individual component implementations with business logic
4. **Configuration Layer**: Utilities for component configuration management
5. **Testing Layer**: Dual testing approach with Jest and Cypress

## File Structure Mapping

### Root Directory Structure

```
unit-testing-demo/
├── src/                    # Source code
├── tests/                  # Test suites
├── config/                 # Build and test configurations
├── coverage/               # Test coverage reports
├── cypress/                # Cypress testing environment
├── types/                  # Global TypeScript definitions
└── app/                    # Application entry point
```

### Source Code Organization (`src/`)

#### Components Directory (`src/components/`)
- **Purpose**: Contains all UI component implementations
- **Structure**: Each component in its own directory with index exports

##### Component Index
| Component | Location | Description |
|-----------|----------|-------------|
| TLCButton | `src/components/tlc-button/` | Material Design button with wrapper pattern |
| TLCLabel | `src/components/tlc-label/` | Text display component with change detection |

##### TLC Button Component (`src/components/tlc-button/`)
- `TLCButtonComponent.tsx`: Main button implementation with wrapper pattern
  - Implements press/long-press events
  - Manages loading, disabled, and visibility states
  - Integrates with React Native Paper theming
- `index.ts`: Public API exports including component and config utilities

##### TLC Label Component (`src/components/tlc-label/`)
- `TLCLabelComponent.tsx`: Text display component with wrapper pattern
  - Handles dynamic text updates with change detection
  - Manages visibility and disabled states
  - Provides accessibility support
- `index.ts`: Public API exports

#### Core Directory (`src/core/`)
- **Purpose**: Contains foundational architecture classes and type definitions

##### Base Classes (`src/core/base/`)
- `ReactBaseTLCWrapper.ts`: Abstract base class for all TLC components
  - Lifecycle management (init/destroy)
  - Theme integration and management
  - Static and dynamic styling computation
  - Configuration management with defaults
  - Accessibility property generation

##### Type Definitions (`src/core/types/`)
- `TLCButtonTypes.ts`: Button-specific TypeScript interfaces
  - Configuration interface with all button properties
  - Event types for button interactions
  - Props interface for React component
  - Helper functions for type conversions
- `TLCLabelTypes.ts`: Label-specific TypeScript interfaces
  - Configuration interface for label properties
  - Event types for text changes
  - Props interface for React component

#### Utilities Directory (`src/utils/`)
- `ConfigurationUtils.ts`: Configuration helper functions
  - Factory functions for creating component configs
  - Default configuration generators
  - Configuration merging utilities

#### Mocks Directory (`src/mocks/`)
- `SafeAreaContext.ts`: Mock implementation for React Native Safe Area
  - Required for testing React Native components in web environment
  - Provides compatibility layer for Cypress testing

#### Config Directory (`src/config/`)
- `mobile-config.json`: Mobile-specific configuration settings

### Test Suite Organization (`tests/`)

#### Unit Tests (`tests/unit/`)
- `tlc-button.test.tsx`: Jest unit tests for button component
  - Rendering and basic functionality tests
  - Event handling verification
  - Configuration management tests
  - Lifecycle event testing
  - Disabled state handling
- `tlc-label.test.tsx`: Jest unit tests for label component
  - Text rendering tests
  - Dynamic text update verification
  - Visibility and state management tests

#### Component Tests (`tests/component/`)
- `tlc-button.cy.tsx`: Cypress component tests for button
  - Visual rendering validation
  - User interaction testing
  - Theme integration verification
- `tlc-label.cy.tsx`: Cypress component tests for label
  - Visual appearance testing
  - Text update validation

### Configuration Files (`config/`)

- `jest.config.ts`: Jest testing framework configuration
  - Uses jest-expo preset for React Native compatibility
  - Coverage collection settings
  - Transform configuration for React Native modules
- `cypress.config.ts`: Cypress testing framework configuration
  - Component testing setup
  - Webpack integration for React Native Web
- `webpack.config.ts`: Webpack bundler configuration
  - React Native to React Native Web aliasing
  - TypeScript and JSX compilation
  - Module resolution for browser environment
- `babel.config.ts`: Babel transpiler configuration
  - TypeScript compilation
  - React JSX transformation
  - Module resolution plugins

### Build Artifacts and Reports

#### Coverage Directory (`coverage/`)
- `lcov-report/`: HTML coverage reports
  - Interactive file-by-file coverage analysis
  - Visual coverage metrics
- `lcov.info`: LCOV format coverage data
- `coverage-final.json`: JSON coverage summary
- `clover.xml`: Clover format coverage report

### TypeScript Configuration

- `tsconfig.json`: Main TypeScript configuration
  - Strict mode enabled
  - React Native types included
  - Module resolution for React Native
- `tsconfig.expo.json`: Expo-specific TypeScript settings
- `tsconfig.test.json`: Test environment TypeScript configuration
- `cypress/tsconfig.json`: Cypress-specific TypeScript configuration
  - DOM types for browser testing
  - JSX configuration for React components

## Dependencies Analysis

### Production Dependencies

#### Core React Native Stack
- `react` (19.1.0): Core React library
- `react-native` (0.79.5): React Native framework
- `react-dom` (19.1.0): React DOM for web compatibility
- `react-native-web` (~0.20.0): Web implementation of React Native

#### Expo Platform
- `expo` (~53.0.20): Development platform and SDK
- Various expo modules for native functionality

#### UI Libraries
- `react-native-paper` (^5.14.5): Material Design components
- `react-native-vector-icons` (^10.2.0): Icon library
- `@expo/vector-icons` (^14.1.0): Expo icon integration

#### Navigation and Utilities
- `@react-navigation/*`: Navigation library suite
- `react-native-safe-area-context` (^5.4.0): Safe area handling
- `react-native-gesture-handler` (~2.24.0): Gesture management

### Development Dependencies

#### Testing Framework
- `jest` (^29.7.0): JavaScript testing framework
- `jest-expo` (^53.0.9): Jest preset for Expo
- `@testing-library/react-native` (^13.2.0): React Native testing utilities
- `@testing-library/jest-native` (^5.4.3): Jest matchers for React Native

#### Cypress Testing
- `cypress` (^14.5.2): Component and E2E testing framework

#### Build Tools
- `typescript` (~5.8.3): TypeScript compiler
- `@babel/core` (^7.25.2): JavaScript compiler
- `webpack` (via dependencies): Module bundler
- `ts-jest` (^29.4.0): TypeScript Jest transformer

#### Code Quality
- `eslint` (^9.25.0): JavaScript linter
- `eslint-config-expo` (~9.2.0): Expo ESLint configuration

### Dependency Relationships

1. **React Native Paper** depends on:
   - React Native Vector Icons for icon rendering
   - React Native core components

2. **Testing Stack** integration:
   - Jest with React Native Testing Library for unit tests
   - Cypress with React Native Web for component tests

3. **Build Pipeline**:
   - TypeScript → Babel → JavaScript
   - Webpack bundles for Cypress browser testing

## Key Functionality Breakdown

### Component System

#### TLCButton Component
**Primary Functions**:
- `render()`: Renders React Native Paper Button with configuration
- `handlePress()`: Manages button press events with keyboard dismissal
- `handleLongPress()`: Handles long press interactions
- `getButtonColor()`: Computes button color based on theme and config
- `getTextColor()`: Determines text color for different button modes

**Configuration Management**:
- Supports multiple button types (contained, outlined, text)
- Size variants (small, medium, large)
- Loading and disabled states
- Icon support (left icon)
- Dynamic styling through `stl` property

**Event System**:
- Emits lifecycle events: initialized, destroyed
- User interaction events: press, longPress
- Includes metadata like timestamps and component data

#### TLCLabel Component
**Primary Functions**:
- `render()`: Renders React Native Paper Text component
- `checkTextChange()`: Detects and emits text change events
- `updateConfig()`: Updates configuration with change detection

**Configuration Management**:
- Dynamic text updates
- Visibility control
- Disabled state with opacity
- Custom styling support

**Event System**:
- Text change notifications with previous/new values
- Lifecycle events for initialization and cleanup

### Wrapper Architecture

#### ReactBaseTLCWrapper
**Core Responsibilities**:
- Configuration lifecycle management
- Theme integration and management
- Style computation (static vs dynamic)
- Accessibility property generation
- Component cleanup and memory management

**Key Methods**:
- `useLifecycle()`: Initializes component with configuration
- `computeStaticStyle()`: One-time style calculations
- `computeDynamicStyle()`: Runtime style updates
- `getAccessibilityProps()`: Generates a11y attributes

### Configuration Utilities

**Factory Functions**:
- `createButtonConfig()`: Creates button configuration with defaults
- `createLabelConfig()`: Creates label configuration with defaults
- `createDefaultButtonConfig()`: Returns minimal button config
- `createDefaultLabelConfig()`: Returns minimal label config

## API Documentation

### TLCButton API

```typescript
// Component Props
interface TLCButtonProps {
  config: TLCButtonConfig;
  onEvent?: (event: TLCButtonEvent) => void;
}

// Configuration Interface
interface TLCButtonConfig {
  id: string;                    // Unique identifier
  label: string;                 // Button text
  type: ButtonType;              // Visual style
  color?: string;                // Theme color
  size?: 'small' | 'medium' | 'large';
  icon?: string;                 // Icon name
  loading?: boolean;             // Loading state
  disabled?: boolean;            // Interaction state
  visible?: boolean;             // Visibility
  longPress?: boolean;           // Enable long press
  accessibilityLabel?: string;   // A11y label
  stl?: ViewStyle;              // Custom styles
}

// Event Types
type TLCButtonEvent = 
  | { type: 'initialized'; componentId: string; timestamp: number }
  | { type: 'press'; componentId: string; data: {...}; timestamp: number }
  | { type: 'longPress'; componentId: string; data: {...}; timestamp: number }
  | { type: 'destroyed'; componentId: string; timestamp: number }
```

### TLCLabel API

```typescript
// Component Props
interface TLCLabelProps {
  config: TLCLabelConfig;
  onEvent?: (event: TLCLabelEvent) => void;
}

// Configuration Interface
interface TLCLabelConfig {
  id: string;                    // Unique identifier
  text: string;                  // Display text
  visible?: boolean;             // Visibility
  disabled?: boolean;            // Visual state
  stl?: TextStyle;              // Custom styles
  setState?: (config: TLCLabelConfig) => void;
}

// Event Types
type TLCLabelEvent = 
  | { type: 'initialized'; componentId: string; timestamp: number }
  | { type: 'textChanged'; componentId: string; data: {...}; timestamp: number }
  | { type: 'destroyed'; componentId: string; timestamp: number }
```

### Configuration Utilities API

```typescript
// Button Configuration
function createButtonConfig(
  id: string, 
  overrides?: Partial<TLCButtonConfig>
): TLCButtonConfig

// Label Configuration  
function createLabelConfig(
  id: string,
  overrides?: Partial<TLCLabelConfig>  
): TLCLabelConfig
```

## Testing Strategy and Coverage

### Dual Testing Approach

#### Jest Unit Testing
**Purpose**: Fast, isolated testing of component logic

**Test Categories**:
1. **Rendering Tests**: Verify components render with correct props
2. **Event Handling**: Validate event callbacks and data
3. **Configuration**: Test default values and overrides
4. **Lifecycle**: Verify initialization and cleanup
5. **State Management**: Test disabled, loading, visibility states

**Coverage Metrics**:
- Target: 90%+ code coverage
- Current: Check `coverage/lcov-report/index.html`
- Excludes: Test files, type definitions, mocks

#### Cypress Component Testing
**Purpose**: Visual validation and real browser testing

**Test Categories**:
1. **Visual Rendering**: Verify appearance in browser
2. **User Interactions**: Test clicks, taps, gestures
3. **Theme Integration**: Validate Material Design rendering
4. **Accessibility**: Test keyboard navigation and screen readers
5. **Cross-browser**: Ensure compatibility across browsers

### Test Organization

```
tests/
├── unit/                     # Jest tests
│   ├── tlc-button.test.tsx   # Button logic tests
│   └── tlc-label.test.tsx    # Label logic tests
└── component/                # Cypress tests
    ├── tlc-button.cy.tsx     # Button UI tests
    └── tlc-label.cy.tsx      # Label UI tests
```

### Testing Best Practices

1. **Isolation**: Each test should be independent
2. **Descriptive Names**: Test names describe what is being tested
3. **Arrange-Act-Assert**: Clear test structure
4. **Mock External Dependencies**: Use provided mocks
5. **Test User Behavior**: Focus on how users interact

## Setup and Usage Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- macOS recommended for development

### Installation

```bash
# Clone repository
git clone <repository-url>
cd unit-testing-demo

# Install dependencies
npm install

# For Apple Silicon Macs
arch -x86_64 npx cypress install
```

### Development Workflow

```bash
# Run Jest tests
npm test                    # Run once
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage

# Run Cypress tests
npm run cypress            # Open interactive UI
npm run cypress:run        # Headless mode

# View coverage report
open coverage/lcov-report/index.html
```

### Using Components

```typescript
import { TLCButton, createButtonConfig } from './src/components/tlc-button';

// Basic usage
const config = createButtonConfig('my-button', {
  label: 'Click Me',
  color: 'primary',
  size: 'medium'
});

<TLCButton 
  config={config}
  onEvent={(event) => {
    console.log('Button event:', event);
  }}
/>
```

### Adding New Components

1. Create component directory structure
2. Implement wrapper class extending ReactBaseTLCWrapper
3. Define TypeScript types in core/types
4. Add configuration utilities
5. Create Jest unit tests
6. Add Cypress component tests
7. Update documentation

## Code Patterns and Conventions

### Naming Conventions
- **Components**: PascalCase with TLC prefix (e.g., TLCButton)
- **Files**: Component files use Component suffix (e.g., TLCButtonComponent.tsx)
- **Types**: Interface names match component with Config/Props/Event suffix
- **Tests**: Test files use .test.tsx (Jest) or .cy.tsx (Cypress)

### Architectural Patterns

#### Wrapper Pattern
All components use a wrapper pattern for:
- Separation of React hooks from core logic
- Framework-agnostic base implementation
- Easier testing and mocking
- Memory management and cleanup

#### Configuration Pattern
Components accept configuration objects:
- Immutable configuration updates
- Default values through utilities
- Type-safe property access
- Dynamic updates without re-rendering

#### Event System Pattern
Standardized event emission:
- Lifecycle events (initialized, destroyed)
- User interaction events
- State change notifications
- Consistent event metadata

### TypeScript Conventions
- Strict mode enabled
- No implicit any
- Explicit return types
- Comprehensive interface definitions
- Proper generic constraints

### Testing Conventions
- Test file location mirrors source structure
- Descriptive test names
- Comprehensive edge case coverage
- Mock external dependencies
- Focus on behavior over implementation

### Code Quality Standards
- ESLint configuration via eslint-config-expo
- TypeScript strict checks
- 90%+ test coverage requirement
- Accessibility compliance
- Performance optimization (render < 100ms)

## Architecture Decisions and Rationale

### Three-Layer Architecture
**Decision**: Separate framework-agnostic, React Native-specific, and component layers

**Rationale**:
- Enables potential migration to other frameworks
- Clearer separation of concerns
- Easier unit testing of core logic
- Reusable base functionality

### Wrapper Pattern Implementation
**Decision**: Use wrapper classes instead of hooks-only approach

**Rationale**:
- Better encapsulation of component logic
- Easier to test in isolation
- Clear lifecycle management
- Memory leak prevention

### Dual Testing Strategy
**Decision**: Use both Jest and Cypress for testing

**Rationale**:
- Jest provides fast unit testing for CI/CD
- Cypress offers real browser validation
- Complete coverage of logic and UI
- Better debugging capabilities

### Configuration-Driven Components
**Decision**: Components accept configuration objects

**Rationale**:
- Immutable state management
- Easy serialization for state persistence
- Type-safe property access
- Dynamic updates without prop drilling

### React Native Paper Integration
**Decision**: Build on top of React Native Paper

**Rationale**:
- Production-ready Material Design
- Comprehensive theming system
- Accessibility built-in
- Active maintenance and community

---

This documentation provides a comprehensive overview of the unit-testing-demo codebase, its architecture, and implementation details. For specific implementation examples and usage patterns, refer to the test files and component implementations.