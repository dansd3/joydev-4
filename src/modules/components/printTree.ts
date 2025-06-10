export const printTree = (tree: any, expand: boolean) => {
  const group = expand ? console.group : console.groupCollapsed;
  group('logger');

  for (const section in tree) {
    const content = tree[section];
    console.group(section);

    if (Array.isArray(content.messages)) {
      printLogs(content.messages, expand);
    }

    if (Array.isArray(content.funnel)) {
      console.group('funnel');
      printLogs(content.funnel, expand);
      console.groupEnd();
    }

    console.groupEnd();
  }

  console.groupEnd();
};

const printLogs = (logs: { level: string; content: any }[], expand: boolean) => {
  logs.forEach(({ level, content }, index) => {
    if (typeof content === 'object' && content !== null) {
      const group = expand ? console.group : console.groupCollapsed;
      group(`#${index}`);
      console[level](content);
      console.groupEnd();
    } else {
      console[level](content);
    }
  });
};
