import request from './request'

export async function getBalanceOwnNode (address: string) {
  const init = {
    headers: {
      'Content-Type': 'application/json',
			Accept: 'application/json',
			authKey: process.env.REACT_APP_CBX_PROXY_KEY,
    }
  }
  const url = `https://route.cbx.io/api/bch/addrs/${address}`
  return await request(url, init)
}