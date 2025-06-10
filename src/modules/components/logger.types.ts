export type TConsoleMethod = {
  $log: (...args: any[]) => void;
  $warn: (...args: any[]) => void;
  $error: (...args: any[]) => void;
  $clear: () => void;
  $print: (expand?: boolean) => void;
};

export type TLogger = TConsoleMethod & {
  echo: {
    funnel: TConsoleMethod;
    $log: (...args: any[]) => void;
    $clear: () => void;
    $print: (expand?: boolean) => void;
  };
};
