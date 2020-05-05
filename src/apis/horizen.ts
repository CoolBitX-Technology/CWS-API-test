import request from './request'

export async function getBalanceZenSystem (address: string) {
  const url = `https://explorer.zensystem.io/api/addr/${address}/balance`
  return await request(url)
}
