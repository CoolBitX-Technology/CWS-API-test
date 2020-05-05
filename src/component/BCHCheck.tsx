import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, TextArea, TextInput } from 'grommet'

import { getBalanceOwnNode } from '../apis/bitcoincash'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function BCHCheck() {

  const [address, setaddress] = useState("bitcoincash:qrd9khmeg4nqag3h5gzu8vjt537pm7le85lcauzezc")
  const [status, setStatus] = useState(0)

  const [cbxNodeRes, setCBXNodeRes] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [cbxNode] = await Promise.all([
      getBalanceOwnNode(address)
    ])

    if (!isCanceled) {
      setCBXNodeRes(cbxNode)
      if (cbxNode.status === 1) {
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
        <AccordionPanel label={<StatusTitle status={status} detail="BitcoinCash API" />}>

          <Box pad="small">
            <TextInput size="small" type="text" value={address} onChange={(e) => {
              setaddress(e.target.value)
            }
            } />
            <br />
            <Accordion>
              <AccordionPanel label={<StatusText status={cbxNodeRes.status} detail="CoolBitX Electrum API" />}>
                <Box pad="small">
                  <TextArea value={cbxNodeRes.detail} disabled></TextArea>
                </Box>
              </AccordionPanel>
            </Accordion>
          </Box>
        </AccordionPanel>
      </Accordion>
    </Box>
  )
}

export default BCHCheck