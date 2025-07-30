/**
 * Standardized click event emitted by TLC components.
 * Designed to be compatible across Angular and React Native platforms.
 */
export interface TLCClickEvent {
    /**
     * Unique ID of the emitting component (from the config).
     */
    id: string;

    /**
     * Optional label or text associated with the component.
     * Useful for debugging or analytics.
     */
    label?: string;

    /**
     * Optional normalized metadata extracted from the original event.
     * Only platform-agnostic fields are included to support cross-framework use.
     */
    eventMeta?: {
        /**
         * Timestamp when the event occurred.
         * Derived from `MouseEvent.timeStamp` or `GestureResponderEvent.nativeEvent.timestamp`.
         */
        timestamp?: number;

        /**
         * X coordinate of the interaction in page space.
         * Derived from `clientX` (Angular) or `pageX` (React Native).
         */
        x?: number;

        /**
         * Y coordinate of the interaction in page space.
         * Derived from `clientY` (Angular) or `pageY` (React Native).
         */
        y?: number;

        /**
         * Pointer type if available: e.g., mouse, touch, or pen.
         * May not be supported on all platforms.
         */
        pointerType?: "mouse" | "touch" | "pen";
    };
}

