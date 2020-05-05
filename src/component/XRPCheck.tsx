import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, TextArea, TextInput } from 'grommet'

import { getBalanceGraphQL } from '../apis/ripple'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function XRPCheck() {

  const [address, setaddress] = useState("r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV")
  const [status, setStatus] = useState(0)

  const [response, setReponse] = useState<types.status>({ status: 0, detail: '' })

  useMemo(async () => {
    setStatus(0)
    let isCanceled = false
    if (!address) {
      return
    }

    const [res] = await Promise.all([
      getBalanceGraphQL(address)
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
      <AccordionPanel label={<StatusTitle status={status} detail="Ripple API" />}>

        <Box pad="small">
          <TextInput size="small" type="text" value={address} onChange={(e) => {
            setaddress(e.target.value)
          }
          } />
          <br />
          <Accordion>
            <AccordionPanel label={<StatusText status={response.status} detail="CBX GraphQL Node" />}>
              <Box pad="small">
                <TextArea disabled value={response.detail}></TextArea>
              </Box>
            </AccordionPanel>
          </Accordion>
        </Box>
      </AccordionPanel>
    </Accordion>
  )
}

export default XRPCheck