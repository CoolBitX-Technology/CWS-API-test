import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, TextInput, TextArea } from 'grommet'

import { getBalanceBlockInfo, getBalanceOwnNode, getUSDTBalance } from '../apis/bitcoin'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function BTCCheck() {

  const [address, setaddress] = useState("32GW31BBrRyEUoga6etp4dCmxNDACyBqKa")
  const [status, setStatus] = useState(0)

  const [blockchainInfoRes, setBlockchainInfoRes] = useState<types.status>({ status: 0, detail: '' })
  const [cbxNodeRes, setCBXNodeRes] = useState<types.status>({ status: 0, detail: '' })
  const [omniRes, setOmniRes] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [blockInfo, cbxNode, omniData] = await Promise.all([
      getBalanceBlockInfo(address),
      getBalanceOwnNode(address),
      getUSDTBalance(address)
    ])

    if (!isCanceled) {
      setBlockchainInfoRes(blockInfo)
      setCBXNodeRes(cbxNode)
      setOmniRes(omniData)
      if (blockInfo.status === 1 && cbxNode.status === 1 && omniData.status === 1) {
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
      <AccordionPanel label={<StatusTitle status={status} detail="Bitcoin API" />}>
        <Box pad="small">
          <TextInput size="small" type="text" value={address} onChange={(e) => {
            setaddress(e.target.value)
          }
          } />
          <br />
          <Accordion>
            <AccordionPanel label={<StatusText status={blockchainInfoRes.status} detail="Blockchain Info API" />}>
              <Box pad="small">
                <TextArea disabled value={blockchainInfoRes.detail} />
              </Box>
            </AccordionPanel>
            <AccordionPanel label={<StatusText status={cbxNodeRes.status} detail="CoolBitX Electrum API" />}>
              <Box pad="small">
                <TextArea disabled value={cbxNodeRes.detail} />
              </Box>
            </AccordionPanel>
            <AccordionPanel label={<StatusText status={omniRes.status} detail="Omni API USDT Balance" />}>
              <Box pad="small">
                <TextArea disabled value={omniRes.detail} />
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </AccordionPanel>
    </Accordion>

  )
}

export default BTCCheck