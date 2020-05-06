import request from './request';

export async function getBalanceGraphQL(address: string) {
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
      // 'Content-Type': 'application/json',
      // Accept: 'application/json',
    },
  };
  const url = `https://route.cbx.io/api/v2/rippleELBGetApi?query=${encodeURIComponent(query)}`;
  return await request(url, init);
}
