type SearchParameterValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | null
  | undefined
  | Record<string, string | number | boolean | null | undefined>;

const getSearchParametersEntries = (searchParameters: Record<string, SearchParameterValue>): [string, string][] => {
  const queryEntries: [string, string][] = [];

  for (const [parameterName, parameterValue] of Object.entries(searchParameters)) {
    if (parameterValue == null) continue;

    if (Array.isArray(parameterValue)) {
      parameterValue.forEach((arrayItem) => {
        if (arrayItem !== null && arrayItem !== undefined) {
          queryEntries.push([parameterName, String(arrayItem)]);
        }
      });
      continue;
    }

    // remove nested object queries — skip parameter values that are plain objects
    // (prevents generating "nested" JSON or "[object Object]" entries)
    if (typeof parameterValue === 'object') {
      continue;
    }
    queryEntries.push([parameterName, String(parameterValue)]);
  }

  return queryEntries;
};

type ExtractDynamicParameters<Path extends string> = Path extends `${string}[${infer Param}]/${infer Rest}`
  ? Param | ExtractDynamicParameters<`/${Rest}`>
  : Path extends `${string}[${infer Param}]`
    ? Param
    : never;

type Options<Path extends string> = {
  pathname: Path;
  searchParameters?: Record<string, SearchParameterValue>;
} & (ExtractDynamicParameters<Path> extends never
  ? { parameters?: never }
  : { parameters: Record<ExtractDynamicParameters<Path>, string> });

export const getFullUrl = <Path extends string>({ pathname, parameters, searchParameters }: Options<Path>): string => {
  let resultUrl: string = pathname;

  if (parameters) {
    for (const [param, value] of Object.entries(parameters)) {
      const raw: unknown = value as unknown;
      const replacement =
        raw !== null && typeof raw === 'object'
          ? encodeURIComponent(JSON.stringify(raw))
          : encodeURIComponent(String(raw));
      resultUrl = resultUrl.replace(`[${param}]`, replacement);
    }
  }

  if (searchParameters) {
    const query = new URLSearchParams(getSearchParametersEntries(searchParameters)).toString();
    return `${resultUrl}${query ? `?${query}` : ''}`;
  }
  return resultUrl;
};
