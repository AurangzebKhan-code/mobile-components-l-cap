declare global {
  namespace jest {
    interface Mock<T = unknown, Y extends unknown[] = unknown[]> {
      (...args: Y): T;
      mockClear(): this;
      mockReset(): this;
      mockRestore(): void;
      mockImplementation(fn?: (...args: Y) => T): this;
      mockReturnValue(value: T): this;
      mockResolvedValue(value: T extends Promise<infer U> ? U : T): this;
      mockRejectedValue(value: unknown): this;
      mock: {
        calls: Y[];
        results: Array<{ type: 'return' | 'throw'; value: T }>;
      };
    }
  }

  interface Assertion {
    toBe(expected: unknown): this;
    toEqual(expected: unknown): this;
    toBeTruthy(): this;
    toBeFalsy(): this;
    toBeNull(): this;
    toBeUndefined(): this;
    toBeDefined(): this;
    toHaveBeenCalled(): this;
    toHaveBeenCalledWith(...args: unknown[]): this;
    toHaveBeenCalledTimes(times: number): this;
    not: Assertion;
  }

  interface ExpectStatic {
    (actual: unknown): Assertion;
    objectContaining(obj: Record<string, unknown>): unknown;
    any(constructor: new (...args: unknown[]) => unknown): unknown;
    anything(): unknown;
    arrayContaining(array: unknown[]): unknown;
    stringContaining(str: string): unknown;
    stringMatching(str: string | RegExp): unknown;
  }

  var jest: {
    fn<T extends (...args: unknown[]) => unknown>(): jest.Mock<ReturnType<T>, Parameters<T>>;
    fn<T extends (...args: unknown[]) => unknown>(implementation: T): jest.Mock<ReturnType<T>, Parameters<T>>;
    spyOn<T extends Record<string, unknown>, M extends keyof T>(
      object: T, 
      method: M
    ): T[M] extends (...args: unknown[]) => unknown 
      ? jest.Mock<ReturnType<T[M]>, Parameters<T[M]>> 
      : jest.Mock<T[M], unknown[]>;
    clearAllMocks(): void;
    resetAllMocks(): void;
    restoreAllMocks(): void;
  };
}

export {};