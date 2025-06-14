# @dansd5/logger

A logging library for large TypeScript projects. Organize logs in a tree structure

## Installation

The package is hosted on GitLab Package Registry. To install, configure your `.npmrc` to point to the GitLab registry:

```bash
dansd5:registry=https://gitlab.com/api/v4/projects/70813211/packages/npm/
```

Then install the package:

```bash
npm install @dansd5/logger
```

or with Yarn:

```bash
yarn add @dansd5/logger
```

## Usage

Create a logger with a nested configuration object to define the hierarchy. Use methods to log messages, clear logs, or print them to the console.

### Example

```typescript
import { createHiddenLogger } from '@dansd5/logger';

// Initialize logger 
const logger = createHiddenLogger({
  echo: {
    funnel: {}, 
  },
});

// Declare global window.logger type for TypeScript
declare global {
  interface Window {
    logger: typeof logger; // Makes window.logger type-safe
  }
}

function App() {
  useEffect(() => {
    window.logger = logger; // Makes logger globally accessible
  }, []); 
  ...
}

// Log messages from any part of the application
logger.$log('Root message');
logger.echo.$warn('Warning in echo');
logger.echo.funnel.$error('Error in funnel');

// Print all logs (collapsed by default)
logger.$print();

// Print with expanded groups
logger.$print(true);

// Clear all logs
logger.$clear();
```

### Output
When calling `logger.$print()`, logs are displayed in a nested console group:

```
▼ logger
  Root message
  ▼ echo
    Warning: Warning in echo
    ▼ funnel
      Error: Error in funnel
```

## API

### `createHiddenLogger(config: Record<string, any>): LoggerNode`

Creates a logger with a hierarchical structure based on the provided configuration object.

- **Parameters**:
  - `config`: An object defining the logger hierarchy (e.g., `{ echo: { tun: {} } }`).
- **Returns**: A `LoggerNode` with logging methods and nested nodes.

### `LoggerNode`

Each node in the logger hierarchy has the following methods:

- **`$log(...args: any[]): void`**
  Records a log message with level `log`.
- **`$warn(...args: any[]): void`**
  Records a log message with level `warn`.
- **`$error(...args: any[]): void`**
  Records a log message with level `error`.
- **`$clear(): void`**
  Clears all logs in the current node and its children.
- **`$print(expand?: boolean): void`**
  Prints all logs in the current node and its children to the console.
  - `expand`: If `true`, console groups are expanded; otherwise, collapsed (default: `false`).

Nested nodes are accessible as properties (e.g., `logger.echo.tun`).
