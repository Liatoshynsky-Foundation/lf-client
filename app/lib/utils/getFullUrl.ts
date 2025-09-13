type Primitive = string | number | boolean;
type SearchParameterValue = Primitive | Primitive[] | null | undefined | Record<string, Primitive | null | undefined>;

const getSearchParametersEntries = (searchParameters: Record<string, SearchParameterValue>): [string, string][] => {
  const queryEntries: [string, string][] = [];

  const append = (key: string, value: unknown) => {
    if (value != null) queryEntries.push([key, String(value)]);
  };

  for (const [parameterName, parameterValue] of Object.entries(searchParameters)) {
    if (parameterValue == null) continue;

    if (Array.isArray(parameterValue)) {
      parameterValue.forEach((v) => append(parameterName, v));
    } else if (typeof parameterValue === 'object') {
      for (const [subKey, subValue] of Object.entries(parameterValue)) {
        append(`${parameterName}[${subKey}]`, subValue);
      }
    } else {
      append(parameterName, parameterValue);
    }
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
  let resultUrl = pathname;
  if (parameters) {
    for (const [param, value] of Object.entries(parameters)) {
      let replacement: string;

      if (value === null || value === undefined) {
        replacement = '';
      } else if (typeof value === 'object') {
        try {
          replacement = encodeURIComponent(JSON.stringify(value));
        } catch {
          replacement = '';
        }
      } else {
        replacement = encodeURIComponent(String(value));
      }
      resultUrl = resultUrl.replace(new RegExp(`\\[${param}\\]`, 'g'), replacement) as Path;
    }
  }

  if (searchParameters) {
    const query = new URLSearchParams(getSearchParametersEntries(searchParameters)).toString();
    return query ? resultUrl + '?' + query : resultUrl;
  }
  return resultUrl;
};
