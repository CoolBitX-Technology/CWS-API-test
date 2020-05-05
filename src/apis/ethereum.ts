import request from './request'

const pre = process.env.REACT_APP_PREFIX || ''

export async function getBalanceEtherscan (address: string) {
  const url = `${pre}https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=SZZWK7FDQ6QFAE9UX3M2W52BNM85K7DRZR`
  return await request(url)
}

export async function getBalanceInfura (address: string) {
  const headers = { 'Content-Type': 'application/json' };
	const method = 'POST';
	const body = {
		id: 1,
		jsonrpc: '2.0',
		method: 'eth_getBalance',
		params: [address, 'latest'],
  };
  const option = { headers, method, body: JSON.stringify(body) };
  const url = `https://mainnet.infura.io/v3/dd7e77cc740a4a32ab3c94d9a08b90ae`
  return await request(url, option)
}