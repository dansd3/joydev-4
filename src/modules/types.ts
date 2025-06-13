export type LoggerMethods = {
  $log: (...args: any[]) => void;
  $warn: (...args: any[]) => void;
  $error: (...args: any[]) => void;
  $clear: () => void;
  $print: (args: boolean) => void;
};

export type LoggerNode = LoggerMethods & {
  [key: string]: LoggerNode;
};
