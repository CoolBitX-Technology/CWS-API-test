// import { Server,  as NotFound } from 'stellar-sdk';
const { Server, NotFoundError } = require('js-kinesis-sdk');

// KAU_TEST: {
//   networkPassphrase: 'Kinesis UAT',
//   horizonURL: 'https://kau-testnet.kinesisgroup.io',
// },
// KAG_TEST: {
//   networkPassphrase: 'Kinesis KAG UAT',
//   horizonURL: 'https://kag-testnet.kinesisgroup.io',
// },
// KAU: {
//   networkPassphrase: 'Kinesis Live',
//   horizonURL: 'https://kau-mainnet.kinesisgroup.io',
// },
// KAG: {
//   networkPassphrase: 'Kinesis KAG Live',
//   horizonURL: 'https://kag-mainnet.kinesisgroup.io',
// },

export async function getKAUBalance(address: string, testnet = false) {
  const server = testnet
  ? new Server("https://kau-testnet.kinesisgroup.io") 
  : new Server("https://kau-mainnet.kinesisgroup.io");
  return getBalance(server, address)
}

export async function getKAGBalance(address: string, testnet = false) {
  const server = testnet 
    ? new Server("https://kag-testnet.kinesisgroup.io") 
    : new Server("https://kag-mainnet.kinesisgroup.io");
  return getBalance(server, address)
}


async function getBalance(server, address) {
  try {
    
    const account = await server.accounts().accountId(address).call();
    const res = account.balances.find((obj) => {
      return obj.asset_type === 'native';
    });
    return { detail: res?.balance || '0', status: 1 };
  } catch (err) {
    if (err instanceof NotFoundError) {
      return { detail: '0', status: 1 };
    } else {
      return { detail: err.toString(), status: 2 };
    }
  }
}
