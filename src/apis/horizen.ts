import request from './request';

export function getBalanceZenSystem(address: string) {
  const url = `https://explorer.zensystem.io/api/addr/${address}/balance`;
  return request(url);
}
