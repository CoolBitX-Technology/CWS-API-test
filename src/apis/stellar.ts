import { Server, NotFoundError as NotFound } from 'stellar-sdk';


export async function getBalance(address: string, testnet = false) {
  try {
    const server = testnet 
      ? new Server("https://horizon-testnet.stellar.org") 
      : new Server("https://horizon.stellar.org");
    const account = await server.accounts().accountId(address).call();
    const res = account.balances.find((obj) => {
      return obj.asset_type === 'native';
    });
    return { detail: res?.balance || '0', status: 1 };
  } catch (err) {
    if (err instanceof NotFound) {
      return { detail: '0', status: 1 };
    } else {
      return { detail: err.toString(), status: 2 };
    }
  }
}
