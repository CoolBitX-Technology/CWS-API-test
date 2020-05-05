import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, Text, TextInput } from 'grommet'

import { getBalanceCoinSpace, getBalanceOwnNode } from '../apis/litecoin'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function LTCCheck() {

  const [address, setaddress] = useState("MKRHkR17wKzCHSjZxCbbeeEJ1gTcNpfzXj")
  const [status, setStatus] = useState(0)

  const [coinSpaceRes, setCoinSpaceRes] = useState<types.status>({ status: 0, detail: '' })
  const [cbxNodeRes, setCBXNodeRes] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [coinSpaceRes, cbxNode] = await Promise.all([
      getBalanceCoinSpace(address),
      getBalanceOwnNode(address)
    ])

    if (!isCanceled) {
      setCoinSpaceRes(coinSpaceRes)
      setCBXNodeRes(cbxNode)
      if (coinSpaceRes.status === 1 && cbxNode.status === 1) {
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
    <Box>
    <Accordion>
      <AccordionPanel label={<StatusTitle status={status} detail="Litecoin API" />}>

        <Box pad="small">
          <TextInput size="small" type="text" value={address} onChange={(e) => {
            setaddress(e.target.value)
          }
          } />
          <br />
          <Accordion>
            <AccordionPanel label={<StatusText status={coinSpaceRes.status} detail="Coin.Space API" />}>
              <Box pad="small">
                <Text>{coinSpaceRes.detail}</Text>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={<StatusText status={cbxNodeRes.status} detail="CoolBitX Electrum API" />}>
              <Box pad="small">
                <Text>{cbxNodeRes.detail}</Text>
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </AccordionPanel>
    </Accordion>
    </Box>
  )
}

export default LTCCheck