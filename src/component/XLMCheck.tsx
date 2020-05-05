import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, Text, TextInput } from 'grommet'

import { getBalance } from '../apis/stellar'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function XLMCheck() {

  const [address, setaddress] = useState("GBLKRATZODTSJNU7XTB5HY5VAAN63CPRT77UYZT2VLCNXE7F3YHSW22M")
  const [status, setStatus] = useState(0)

  const [mainnet, setMainnetRes] = useState<types.status>({ status: 0, detail: '' })
  const [testnet, setTestnetRes] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [mainnet, testnet] = await Promise.all([
      getBalance(address),
      getBalance(address, true)
    ])

    if (!isCanceled) {
      setMainnetRes(mainnet)
      setTestnetRes(testnet)
      if (mainnet.status === 1 && testnet.status === 1 ) {
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
      <AccordionPanel label={<StatusTitle status={status} detail="Stellar API" />}>

        <Box pad="small">
          <TextInput size="small" type="text" value={address} onChange={(e) => {
            setaddress(e.target.value)
          }
          } />
          <br />
          <Accordion>
            <AccordionPanel label={<StatusText status={mainnet.status} detail="Mainnet API" />}>
              <Box pad="small">
                <Text>{mainnet.detail}</Text>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={<StatusText status={testnet.status} detail="Testnet API" />}>
              <Box pad="small">
                <Text>{testnet.detail}</Text>
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </AccordionPanel>
    </Accordion>
  )
}

export default XLMCheck