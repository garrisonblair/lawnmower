import queryString from "query-string";
import { UrlOptionParams } from "./urlOptionParams";

/**
 * find all placeholders of type :_placeholder_ in path and replaces them with value of key named _placeholder_ from pathOptions
 */
function formatPathVariables<T extends keyof UrlOptionParams>(
  rawPath: T,
  pathOptions: UrlOptionParams[T]
): string {
  let formattedPath = rawPath;

  // find all placeholders of type :_placeholder_ in path
  const regex = /[/]:([^/]+)($|\/)/gm;

  let res;
  while ((res = regex.exec(rawPath)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (res.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const match = res[1];
    if (match) {
      // check that match is a key of typeOptions
      if (pathOptions && match in pathOptions) {
        // @ts-expect-error match is a key of pathOptions
        formattedPath = formattedPath.replace(`:${match}`, pathOptions[match]);
      }
    }
  }

  return formattedPath;
}

/**
 * formats a path string based on inputs
 *
 * ! type input parameter is based on UrlOptionParams so that must be updated for every new PATH
 *
 * ! DO NOT USE THIS METHOD DIRECTLY, USE THE FRONT AND BACK END WRAPPERS INSTEAD
 *
 * FRONT => createPath()
 *
 * BACK => createUrl()
 *
 * @param type PATH enum option
 * @param options path id or query params based on type
 * @param baseUrl
 * @returns full path string
 */
function urlBuilder<T extends keyof UrlOptionParams>(
  type: T,
  options: UrlOptionParams[T],
  baseUrl = ""
): string {
  const typeOptions = options as UrlOptionParams[T];

  // replace placeholders with actual value from typeOptions
  const path = formatPathVariables(type, typeOptions);

  // if there are query params in typeOptions return stringified url with params
  if (typeOptions && "params" in typeOptions) {
    let fragmentIdentifier: string | undefined = undefined;

    if ("hash" in typeOptions) {
      fragmentIdentifier = typeOptions.hash;
    }

    return queryString.stringifyUrl(
      { url: baseUrl + path, query: typeOptions.params, fragmentIdentifier },
      { skipNull: true }
    );
  } else if (typeOptions && "hash" in typeOptions) {
    const fragmentIdentifier = typeOptions.hash;

    return queryString.stringifyUrl(
      { url: baseUrl + path, query: undefined, fragmentIdentifier },
      { skipNull: true }
    );
  }

  return baseUrl + path;
}

/**
 * @param path PATH enum option
 * @param options path id or query params based on type
 * @returns string with given path
 */
export function createPath<T extends keyof UrlOptionParams>(
  path: T,
  urlOptions: UrlOptionParams[T],
  options?: { baseUrl: string }
) {
  const createdPath = urlBuilder(path, urlOptions);

  return options ? options.baseUrl + createdPath : createdPath;
}
