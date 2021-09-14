import request from './request';

export function getBalanceBlockInfo(address: string) {
  const url = `https://blockchain.info/multiaddr?active=${address}&cors=true`;
  return request(url);
}

export function getBalanceOwnNode(address: string) {
  const init = {
    headers: {
      authKey: process.env.REACT_APP_CBX_PROXY_KEY,
    },
  };
  const url = `https://route.cbx.io/api/proxy/btc/addr/${address}`;
  return request(url, init);
}

export function getUSDTBalance(address: string) {
  const paramStr = `addr=${address}`;
  const init = {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: paramStr,
  };
  const url = `https://api.omniexplorer.info/v2/address/addr/`;
  return request(url, init);
}
