import { createFunnel } from './funnel';
import { printTree } from './printTree';

type EchoLog = { level: 'log' | 'warn' | 'error'; content: any };

const echoLogs: EchoLog[] = [];

export const createEcho = () => {
  const funnel = createFunnel();

  const push = (level: 'log' | 'warn' | 'error', content: any) => {
    echoLogs.push({ level, content });
  };

  return {
    funnel,
    $log: (...args: any[]) => push('log', args.length === 1 ? args[0] : args),
    $warn: (...args: any[]) => push('warn', args.length === 1 ? args[0] : args),
    $error: (...args: any[]) => push('error', args.length === 1 ? args[0] : args),
    $clear: () => {
      echoLogs.length = 0;
      funnel.$clear();
    },
    $print: (expand = false) => {
      printTree({
        echo: {
          messages: echoLogs,
          funnel: funnel.getLogs(),
        },
      }, expand);
    },
    getLogs: () => echoLogs,
  };
};
