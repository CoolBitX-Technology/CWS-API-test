import request from './request';

export function getBalanceBinanceDex(address: string) {
  const init = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const url = `https://dex.binance.org/api/v1/account/${address}`;
  return request(url, init);
}
