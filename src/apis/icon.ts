
// const  IconService = require("icon-sdk-js");
import IconService from 'icon-sdk-js';
const { IconAmount } = IconService;
const walletApi = "https://wallet.icon.foundation/api/v3"
const httpProvider = new IconService.HttpProvider(walletApi);
const iconService = new IconService(httpProvider);

export async function getBalance (address: string) {
  try {
    const loopValue = await iconService.getBalance(address).execute();
    const balance = IconAmount.of(loopValue, IconAmount.Unit.LOOP)
    .convertUnit(IconAmount.Unit.ICX)
    .toString();
    return { detail: balance, status: 1 }
  } catch (error) {
    return { detail: error.toString(), status: 2 }
  }
}