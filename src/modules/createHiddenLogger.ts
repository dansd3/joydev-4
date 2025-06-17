import type { LoggerNode, NestedLoggerNode } from "./types";

export function createHiddenLogger<T extends Record<string, any>>(config: T): NestedLoggerNode<T> {
  const buildNode = (path: string[] = []): LoggerNode => {
    const logs: { level: string; args: any[] }[] = [];

    const node: any = {
      $log: (...args: any[]) => {
        logs.push({ level: 'log', args });
      },
      $warn: (...args: any[]) => {
        logs.push({ level: 'warn', args });
      },
      $error: (...args: any[]) => {
        logs.push({ level: 'error', args });
      },
      $clear: () => {
        logs.length = 0;

        Object.entries(node).map(([_, child]) => {
          const loggerNode = child as Partial<LoggerNode>;
          if (loggerNode && typeof loggerNode.$clear === 'function') {
            loggerNode.$clear();
          }
        });
      },
      $print: (expand: boolean = false) => {
        const name = path.length === 0 ? 'logger' : path[path.length - 1];
        const open = expand ? console.group : console.groupCollapsed;
        open(name);

        logs.map(({ level, args }) => {
          const output = args.map((arg, index) => {
            if (index === 0 && typeof arg === 'object' && arg !== null) {
              return level === "log" ? arg : ['\n', arg];
            }
            if (typeof arg === 'string') {
              return arg + '\n';
            }
            return arg;
          }).flat(); 

          console[level as 'log' | 'warn' | 'error'](...output);
        });

        Object.entries(node).map(([_, child]) => {
          const loggerNode = child as Partial<LoggerNode>;
          if (loggerNode && typeof loggerNode.$print === 'function') {
            loggerNode.$print(expand);
          }
        });

        console.groupEnd();
      }
    };

    return node;
  };

  const buildFromConfig = (cfg: any, path: string[] = []): LoggerNode => {
    const node = buildNode(path);

    Object.entries(cfg).map(([key, value]) => {
      node[key] = buildFromConfig(value, [...path, key]);
    });

    return node;
  };

  return buildFromConfig(config) as NestedLoggerNode<T>;
}