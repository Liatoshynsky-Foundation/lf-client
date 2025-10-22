/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';

const dynamic = (loader) => {
  const functionString = loader.toString();

  // Regex to capture the module path from `import(...)` using single, double, or backticks.
  // Example: `import('path/to/module')`, `import("path/to/module")`, `import(`path/to/module`)`
  const importMatch = functionString.match(/import\((?:'([^']+)'|"([^"]+)"|`([^`]+)`)?\)/);

  let modulePath;
  if (importMatch) {
    // One of the capture groups (1, 2, or 3) will contain the path.
    modulePath = importMatch[1] || importMatch[2] || importMatch[3];
  }

  if (!modulePath) {
    // If we cannot extract the module path, fall back to a generic mock component.
    // This handles more complex `dynamic` usages or parsing failures.
    console.warn('next/dynamic mock: Could not extract module path from:', functionString);
    const FallbackDynamicComponent = (props) => {
      // Provide a data-testid for easier debugging and selection in tests.
      return <div data-testid="mock-dynamic-component" {...props} />;
    };
    FallbackDynamicComponent.displayName = 'MockedDynamicComponent';
    return FallbackDynamicComponent;
  }

  // Regex to capture named exports, e.g., `.then(mod => mod.ComponentName)`
  const namedExportMatch = functionString.match(/mod\.(.+?(?=\)))/);
  const componentName = namedExportMatch ? namedExportMatch[1] : 'default';

  try {
    // Attempt to synchronously require the module.
    // Jest's module resolution will handle path aliases and mocks for `require`.
    const resolvedModule = require(modulePath);

    // Check if the resolved module and the specified export exist.
    if (resolvedModule && resolvedModule[componentName]) {
      return resolvedModule[componentName];
    } else {
      // If the specific export is not found, log a warning and return a generic mock.
      console.warn(
        `next/dynamic mock: Could not find named export '${componentName}' in module '${modulePath}'. Falling back to generic mock.`
      );
      const FallbackDynamicComponent = (props) => {
        return <div data-testid={`mock-dynamic-component-${componentName}`} {...props} />;
      };
      FallbackDynamicComponent.displayName = `MockedDynamicComponent(${componentName})`;
      return FallbackDynamicComponent;
    }
  } catch (error) {
    // If `require` fails (e.g., module not found, or error during module evaluation),
    // log the error and return a generic mock component.
    console.error(
      `next/dynamic mock: Failed to synchronously require module '${modulePath}'. Error:`,
      error.message,
      'Falling back to generic mock.'
    );
    const FallbackDynamicComponent = (props) => {
      return <div data-testid={`mock-dynamic-component-error-${componentName}`} {...props} />;
    };
    FallbackDynamicComponent.displayName = `MockedDynamicComponentError(${componentName})`;
    return FallbackDynamicComponent;
  }
};

export default dynamic;