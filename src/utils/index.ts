import queryString from 'query-string';
/**
 * 获取URL参数
 */
export function parseQuery() {
  return queryString.parseUrl(window.location.href).query;
}
