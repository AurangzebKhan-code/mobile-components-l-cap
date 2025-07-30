# Unified Event Handler Implementation

This document describes the implementation of a unified event handler system for TLC React Native components, designed to match the Angular implementation's event structure.

## Overview

The unified event handler provides:
- **Consistent event structure** between Angular and React Native platforms
- **Separation of concerns** between lifecycle events and user interaction events
- **Type safety** with TypeScript interfaces
- **Platform-specific event metadata** extraction

## Key Components

### 1. TLCClickEvent Interface

```typescript
interface TLCClickEvent {
    id: string;          // Component ID
    label?: string;      // Component label
    eventMeta?: {
        timestamp?: number;
        x?: number;       // Touch/click coordinates
        y?: number;
        pointerType?: "mouse" | "touch" | "pen";
    };
}
```

### 2. Updated Component Props

```typescript
interface TLCButtonProps {
    config: TLCButtonConfig;
    tlcClick?: (event: TLCClickEvent) => void;  // Click events
    tlcInit?: () => void;                       // Component initialized
    tlcDestroy?: () => void;                    // Component destroyed
}

interface TLCLabelProps {
    config: TLCLabelConfig;
    tlcTextChanged?: (event: { text: string; previousText: string }) => void;
    tlcInit?: () => void;                       // Component initialized
    tlcDestroy?: () => void;                    // Component destroyed
}
```

## Usage Examples

### Basic Button with Separate Handlers

```tsx
import { TLCButton, TLCClickEvent } from './tlc-components-mobile/tlc-button';

function MyComponent() {
    const handleClick = (event: TLCClickEvent) => {
        console.log('Button clicked:', {
            id: event.id,
            label: event.label,
            coordinates: { x: event.eventMeta?.x, y: event.eventMeta?.y },
            timestamp: event.eventMeta?.timestamp
        });
    };

    const handleInit = () => {
        console.log('Button initialized');
    };

    const handleDestroy = () => {
        console.log('Button destroyed');
    };

    return (
        <TLCButton
            config={{
                id: 'my-button',
                label: 'Click Me',
                type: 'contained'
            }}
            tlcClick={handleClick}
            tlcInit={handleInit}
            tlcDestroy={handleDestroy}
        />
    );
}
```

### Label with Text Change Handler

```tsx
import { TLCLabel } from './tlc-components-mobile/tlc-label';

function MyLabelComponent() {
    const handleTextChange = (event: { text: string; previousText: string }) => {
        console.log('Text changed:', event.text, 'from:', event.previousText);
    };

    return (
        <TLCLabel
            config={{
                id: 'my-label',
                text: 'Dynamic Text'
            }}
            tlcTextChanged={handleTextChange}
            tlcInit={() => console.log('Label initialized')}
            tlcDestroy={() => console.log('Label destroyed')}
        />
    );
}
```

### Comparison: Angular vs React Native

#### Angular Implementation
```typescript
// Angular component template
<tlc-button 
    [config]="buttonConfig"
    (tlcClick)="onButtonClick($event)"
    (tlcInit)="onButtonInit()"
    (tlcDestroy)="onButtonDestroy()">
</tlc-button>

// Angular component code
onButtonClick(event: TLCClickEvent) {
    console.log('Button clicked:', event.id, event.label);
}
onButtonInit() {
    console.log('Button initialized');
}
onButtonDestroy() {
    console.log('Button destroyed');
}
```

#### React Native Implementation
```tsx
// React Native component
<TLCButton
    config={buttonConfig}
    tlcClick={(event) => onButtonClick(event)}
    tlcInit={() => onButtonInit()}
    tlcDestroy={() => onButtonDestroy()}
/>

// Event handlers
const onButtonClick = (event: TLCClickEvent) => {
    console.log('Button clicked:', event.id, event.label);
};
const onButtonInit = () => {
    console.log('Button initialized');
};
const onButtonDestroy = () => {
    console.log('Button destroyed');
};
```

## Event Flow

1. **User Interaction**: User taps/clicks the button
2. **Native Event Capture**: React Native captures the GestureResponderEvent
3. **Event Transformation**: Component transforms native event to TLCClickEvent
4. **Event Emission**: Unified event handler emits the standardized event
5. **Consumer Handling**: Parent component receives the event

## Platform-Specific Event Metadata

### React Native (Touch Events)
```typescript
eventMeta: {
    timestamp: event.nativeEvent.timestamp,
    x: event.nativeEvent.pageX,
    y: event.nativeEvent.pageY,
    pointerType: 'touch'
}
```

### Angular (Mouse/Pointer Events)
```typescript
eventMeta: {
    timestamp: event.timeStamp,
    x: event.clientX,
    y: event.clientY,
    pointerType: event.pointerType // 'mouse', 'touch', or 'pen'
}
```

## Benefits

1. **Cross-Platform Consistency**: Same event structure across Angular and React Native
2. **Type Safety**: Full TypeScript support with proper interfaces
3. **Separation of Concerns**: Lifecycle events vs user interaction events
4. **Extensibility**: Easy to add new event types or metadata
5. **Developer Experience**: Familiar API for developers working on both platforms

## Migration Guide

### From Old Event Handler
```tsx
// Old approach
<TLCButton
    config={buttonConfig}
    onEvent={(e) => {
        if (e.type === 'press') {
            handlePress(e);
        } else if (e.type === 'initialized') {
            handleInit();
        }
    }}
/>
```

### To New Separate Handlers (Angular Pattern)
```tsx
// New approach - matches Angular exactly
<TLCButton
    config={buttonConfig}
    tlcClick={(e) => handleClick(e)}      // Dedicated click handler
    tlcInit={() => handleInit()}          // Dedicated init handler
    tlcDestroy={() => handleDestroy()}    // Dedicated destroy handler
/>
```

## Testing

The demo app in `app/index.tsx` demonstrates all separate handlers working together:

```tsx
<TLCButton 
    config={buttonConfig}
    tlcClick={(e) => logEvent('Button', 'click', { 
        label: e.label, 
        x: e.eventMeta?.x, 
        y: e.eventMeta?.y 
    })}
    tlcInit={() => logEvent('Button', 'initialized')}
    tlcDestroy={() => logEvent('Button', 'destroyed')}
/>

<TLCLabel
    config={labelConfig}
    tlcTextChanged={(e) => logEvent('Label', 'textChanged', {
        text: e.text,
        previousText: e.previousText
    })}
    tlcInit={() => logEvent('Label', 'initialized')}
    tlcDestroy={() => logEvent('Label', 'destroyed')}
/>
```

## Future Enhancements

1. **Additional Event Types**: Support for hover, focus, blur events
2. **Event Bubbling**: Implement event propagation system
3. **Performance Optimization**: Event pooling for high-frequency events
4. **Analytics Integration**: Built-in analytics event emission