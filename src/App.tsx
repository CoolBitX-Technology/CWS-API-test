import React from 'react';

import {
  Box,
  Heading,
  Grommet
} from 'grommet';

import AppBar from './component/AppBar'
import BTCCheck from './component/BTCCheck'
import LTCCheck from './component/LTCCheck'
import ETHCheck from './component/ETHCheck'
import BCHCheck from './component/BCHCheck'
import XRPCheck from './component/XRPCheck'
import ICXCheck from './component/ICXCheck'
import BNBCheck from './component/BNBCheck'
import ZENCheck from './component/ZENCheck'
import XLMCheck from './component/XLMCheck'
import KAUCheck from './component/KA_Check'


const theme = {
  global: {
    colors: {
      brand: '#228BE6'
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};



function App() {

  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level='3' margin='none'>CoolWalletS API Test</Heading>
        </AppBar>
        <BTCCheck />
        <LTCCheck />
        <ETHCheck />
        <BCHCheck />
        <XRPCheck />
        <ICXCheck />
        <BNBCheck />
        <ZENCheck />
        <XLMCheck />
        <KAUCheck />
      </Box>
    </Grommet>
  );
}

export default App;
