import request from './request';

export async function getBalanceCoinSpace(address: string) {
  const url = `https://ltc.coin.space/api/addrs/${address}`;
  return await request(url);
}

export async function getBalanceOwnNode(address: string) {
  const init = {
    headers: {
      authKey: process.env.REACT_APP_CBX_PROXY_KEY,
    },
  };
  const url = `https://route.cbx.io/api/proxy/litcoin/addr/${address}`;
  return await request(url, init);
}
