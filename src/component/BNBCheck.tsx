import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, Text, TextInput } from 'grommet'

import { getBalanceBinanceDex } from '../apis/binance'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function BNBCheck() {

  const [address, setaddress] = useState("bnb1jpttcqa6703lv2zcpnq89gs24pw90udvjympg0")
  const [status, setStatus] = useState(0)

  const [response, setReponse] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [bnbRes] = await Promise.all([
      getBalanceBinanceDex(address)
    ])

    if (!isCanceled) {
      setReponse(bnbRes)
      if (bnbRes.status === 1) {
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
      <AccordionPanel label={<StatusTitle status={status} detail="Binance API" />}>

        <Box pad="small">
          <TextInput size="small" type="text" value={address} onChange={(e) => {
            setaddress(e.target.value)
          }
          } />
          <br />
          <Accordion>
            <AccordionPanel label={<StatusText status={response.status} detail="BinanceDex API" />}>
              <Box pad="small">
                <Text>{response.detail}</Text>
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </AccordionPanel>
    </Accordion>
  )
}

export default BNBCheck