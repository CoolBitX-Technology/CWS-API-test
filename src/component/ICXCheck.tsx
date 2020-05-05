import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, Text, TextInput } from 'grommet'

import { getBalance } from '../apis/icon'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function ICXCheck() {

  const [address, setaddress] = useState("hxc102e44c2fe6bc235d9584d9d5a1b2e3c40d3985")
  const [status, setStatus] = useState(0)

  const [response, setResponse] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [result] = await Promise.all([
      getBalance(address)
    ])

    if (!isCanceled) {
      setResponse(result)
      if (result.status === 1) {
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
      <AccordionPanel label={<StatusTitle status={status} detail="Icon API" />}>

        <Box pad="small">
          <TextInput size="small" type="text" value={address} onChange={(e) => {
            setaddress(e.target.value)
          }
          } />
          <br />
          <Accordion>
            <AccordionPanel label={<StatusText status={response.status} detail="Official API" />}>
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

export default ICXCheck