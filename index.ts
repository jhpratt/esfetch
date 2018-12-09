type ResponseFormat = 'json' | 'text' | 'response';

function _fetch(
  url: string,
  { responseAs = 'json', ...opts }: RequestInit & { responseAs?: ResponseFormat } = {},
  data?: {},
  queryParams?: {},
): Promise<any> {
  opts.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...opts.headers,
  };

  if (queryParams) {
    url += `?${new URLSearchParams(queryParams)}`;
  }

  if (data !== undefined) {
    opts.body = JSON.stringify(data);
  } else {
    delete opts.body;
  }

  return fetch(url, opts).then(response => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }
    if (responseAs === 'response') {
      return response;
    }
    if (response.status === 204) {
      return null;
    }
    return response[responseAs]();
  });
}

export default function esfetch(url: string, opts = {}) {
  const _ = (url_addition: string, opts_addition = {}) =>
    esfetch(url + '/' + url_addition, { ...opts, ...opts_addition });
  _.get = (queryParams?: { [key: string]: unknown } | [string, unknown][]) =>
    _fetch(url, { ...opts, method: 'GET' }, undefined, queryParams);
  _.post = (data?: any) => _fetch(url, { ...opts, method: 'POST' }, data);
  _.put = (data?: any) => _fetch(url, { ...opts, method: 'PUT' }, data);
  _.patch = (data?: any) => _fetch(url, { ...opts, method: 'PATCH' }, data);
  _.delete = () => _fetch(url, { ...opts, method: 'DELETE' });
  return _;
}
