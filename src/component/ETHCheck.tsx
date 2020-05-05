import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, TextArea, TextInput } from 'grommet'

import { getBalanceEtherscan, getBalanceInfura } from '../apis/ethereum'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function ETHCheck() {

  const [address, setaddress] = useState("0x9e68b67660c223b3e0634d851f5df821e0e17d84")
  const [status, setStatus] = useState(0)

  const [infuraRes, setInfuraRes] = useState<types.status>({ status: 0, detail: '' })
  const [etherscanRes, setEtherscanRes] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [infuraRes, etherscanRes] = await Promise.all([
      getBalanceInfura(address),
      getBalanceEtherscan(address)
    ])

    if (!isCanceled) {
      setInfuraRes(infuraRes)
      setEtherscanRes(etherscanRes)
      if (infuraRes.status === 1 && etherscanRes.status === 1) {
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
      <AccordionPanel label={<StatusTitle status={status} detail="Ethereum API" />}>

        <Box pad="small">
          <TextInput size="small" type="text" value={address} onChange={(e) => {
            setaddress(e.target.value)
          }
          } />
          <br />
          <Accordion>
            <AccordionPanel label={<StatusText status={infuraRes.status} detail="Infura API" />}>
              <Box pad="small">
                <TextArea value={infuraRes.detail} disabled/>
              </Box>
            </AccordionPanel>
            <AccordionPanel label={<StatusText status={etherscanRes.status} detail="Etherscan API" />}>
              <Box pad="small">
                <TextArea value={etherscanRes.detail} disabled/>
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </AccordionPanel>
    </Accordion>
  )
}

export default ETHCheck