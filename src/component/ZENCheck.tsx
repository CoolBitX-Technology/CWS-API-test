import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, Text, TextInput } from 'grommet'

import { getBalanceZenSystem } from '../apis/horizen'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function ZENCheck() {

  const [address, setaddress] = useState("zsxWnyDbU8pk2Vp98Uvkx5Nh33RFzqnCpWN")
  const [status, setStatus] = useState(0)

  const [response, setReponse] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [res] = await Promise.all([
      getBalanceZenSystem(address)
    ])

    if (!isCanceled) {
      setReponse(res)
      if (res.status === 1) {
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
      <AccordionPanel label={<StatusTitle status={status} detail="Horizen API" />}>

        <Box pad="small">
          <TextInput size="small" type="text" value={address} onChange={(e) => {
            setaddress(e.target.value)
          }
          } />
          <br />
          <Accordion>
            <AccordionPanel label={<StatusText status={response.status} detail="Zen System" />}>
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

export default ZENCheck