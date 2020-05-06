import request from './request';

export async function getBalanceBlockInfo(address: string) {
  const url = `https://blockchain.info/multiaddr?active=${address}&cors=true`;
  return await request(url);
}

export async function getBalanceOwnNode(address: string) {
  const init = {
    headers: {
      authKey: process.env.REACT_APP_CBX_PROXY_KEY,
    },
  };
  const url = `https://route.cbx.io/api/proxy/btc/addr/${address}`;
  return await request(url, init);
}

export async function getUSDTBalance(address: string) {
  const paramStr = `addr=${address}`;
  const init = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: paramStr,
  };
  const url = `https://api.omniexplorer.info/v2/address/addr/`;
  return await request(url, init);
}
