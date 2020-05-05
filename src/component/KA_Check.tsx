import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, TextArea, TextInput } from 'grommet'

import { getKAGBalance, getKAUBalance } from '../apis/kinesis'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function XLMCheck() {

  const [address, setaddress] = useState("GAOO4W4NHRSUVFPCVUA2BZTAMCJ6O7MBMXMDMUL6XEQ7Q6DBT6UTFD7V")
  const [status, setStatus] = useState(0)

  const [kauMainnet, setKAUMainnetRes] = useState<types.status>({ status: 0, detail: '' })
  const [kauTestnet, setKAUTestnetRes] = useState<types.status>({ status: 0, detail: '' })
  const [kagMainnet, setKAGMainnetRes] = useState<types.status>({ status: 0, detail: '' })
  const [kagTestnet, setKAGTestnetRes] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [kaumainnet, kautestnet, kagmainnet, kagtestnet] = await Promise.all([
      getKAUBalance(address),
      getKAUBalance(address, true),
      getKAGBalance(address),
      getKAGBalance(address, true)
    ])

    if (!isCanceled) {
      setKAUMainnetRes(kaumainnet)
      setKAUTestnetRes(kautestnet)
      setKAGMainnetRes(kagmainnet)
      setKAGTestnetRes(kagtestnet)
      if (kaumainnet.status === 1 && kautestnet.status === 1 && kagmainnet.status === 1 && kagtestnet.status === 1 ) {
        setStatus(1)
      } else {
        setStatus(2)
      }
    }

    return () => {
      isCanceled = true
    }
  }, [address])


  return (
    <Accordion>
      <AccordionPanel label={<StatusTitle status={status} detail="Kinesis API" />}>

        <Box pad="small">
          <TextInput size="small" type="text" value={address} onChange={(e) => {
            setaddress(e.target.value)
          }
          } />
          <br />
          <Accordion>
            <AccordionPanel label={<StatusText status={kauMainnet.status} detail="KAU Mainnet API" />}>
              <Box pad="small">
                <TextArea disabled value={kauMainnet.detail}/>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={<StatusText status={kauTestnet.status} detail="KAU Testnet API" />}>
              <Box pad="small">
                <TextArea disabled value={kauTestnet.detail}/>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={<StatusText status={kagMainnet.status} detail="KAG Mainnet API" />}>
              <Box pad="small">
                <TextArea disabled value={kagMainnet.detail}/>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={<StatusText status={kagTestnet.status} detail="KAG Testnet API" />}>
              <Box pad="small">
                <TextArea disabled value={kagTestnet.detail}/>
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </AccordionPanel>
    </Accordion>
  )
}

export default XLMCheck