const SUPPORTED_LOCALES = ['uk', 'en'] as const;

export function normalizePath(path: string | null | undefined): string {
  if (!path) return '/';

  let result = path;

  for (const locale of SUPPORTED_LOCALES) {
    const prefix = `/${locale}`;

    if (result === prefix) {
      result = '/';
      break;
    }

    if (result.startsWith(prefix + '/')) {
      result = result.slice(prefix.length);
      break;
    }
  }

  if (!result.startsWith('/')) {
    result = `/${result}`;
  }

  while (result.length > 1 && result.endsWith('/')) {
    result = result.slice(0, -1);
  }

  return result;
}

export function isPathWithin(rootPath: string, currentPath: string): boolean {
  const root = normalizePath(rootPath);
  const path = normalizePath(currentPath);

  if (root === '/') {
    return path === '/';
  }

  const rootSegments = root.split('/').filter(Boolean);
  const pathSegments = path.split('/').filter(Boolean);

  if (pathSegments.length < rootSegments.length) return false;

  return rootSegments.every((seg, index) => seg === pathSegments[index]);
}
