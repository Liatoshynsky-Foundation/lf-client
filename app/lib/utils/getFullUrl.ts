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
    if (Array.isArray(parameterValue)) {
      parameterValue.forEach((arrayItem, index) => {
        if (arrayItem !== null && arrayItem !== undefined) {
          queryEntries.push([`${parameterName}[${index}]`, String(arrayItem)]);
        }
      });
    } else if (typeof parameterValue === 'object' && parameterValue !== null) {
      for (const [objectKey, objectValue] of Object.entries(parameterValue)) {
        if (objectValue !== null && objectValue !== undefined) {
          queryEntries.push([`${parameterName}[${objectKey}]`, String(objectValue)]);
        }
      }
    } else if (parameterValue !== null && parameterValue !== undefined) {
      queryEntries.push([parameterName, String(parameterValue)]);
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
  let resultUrl: string = pathname;

  if (parameters) {
    for (const [param, value] of Object.entries(parameters)) {
      resultUrl = resultUrl.replace(`[${param}]`, String(value));
    }
  }

  if (searchParameters) {
    const query = new URLSearchParams(getSearchParametersEntries(searchParameters)).toString();
    return `${resultUrl}?${query}`;
  }

  return resultUrl;
};
