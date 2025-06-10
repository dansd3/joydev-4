type FunnelLog = { level: 'log' | 'warn' | 'error'; message: string };

const funnelLogs: FunnelLog[] = [];

export const createFunnel = () => {
  return {
    $log: (msg: string) => {
      funnelLogs.push({ level: 'log', message: msg });
    },
    $warn: (msg: string) => {
      funnelLogs.push({ level: 'warn', message: msg });
    },
    $error: (msg: string) => {
      funnelLogs.push({ level: 'error', message: msg });
    },
    $clear: () => {
      funnelLogs.length = 0;
    },
    $print: () => {
      console.group('funnel');
      funnelLogs.forEach(({ level, message }) => {
        console[level](`[${level}]`, message);
      });
      console.groupEnd();
    },
    getLogs: () => funnelLogs,
  };
};
