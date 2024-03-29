import request from './request';

export function getBalanceGraphQL(address: string) {
  const query = `
    query {
      account(address: "${address}") {
        xrpBalance,
      }
    }
  `;
  const init = {
    headers: {
      authKey: process.env.REACT_APP_CBX_PROXY_KEY,
    },
  };
  const url = `https://route.cbx.io/api/v2/rippleELBGetApi?query=${encodeURIComponent(query)}`;
  return request(url, init);
}
