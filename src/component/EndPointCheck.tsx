import React, { useState, useMemo } from 'react'

import { Accordion, AccordionPanel, Box, TextArea } from 'grommet'

import { getGraphqlNodeEndpoint } from '../apis/nodegraphql'
import { StatusText, StatusTitle } from './APIStatus'

import * as types from '../types'

function EndPointCheck() {
    const [status, setStatus] = useState(0)
    const [prod_env, setProdRes] = useState<types.status>({ status: 0, detail: '' })
    const [dev_env, setDevRes] = useState<types.status>({ status: 0, detail: '' })


    useMemo(async () => {
        setStatus(0)
        let isCanceled = false

        const [prod_env, dev_env] = await Promise.all([
            getGraphqlNodeEndpoint(),
            getGraphqlNodeEndpoint("dev")
        ]);
    
        if (!isCanceled) {
          setProdRes(prod_env);
          setDevRes(dev_env);
          if (prod_env.status === 1 && dev_env.status === 1) {
            setStatus(1)
          } else {
            setStatus(2)
          }
        }
    
        return () => {
          isCanceled = true
        }
      }, [])

      return (
        <Accordion>
          <AccordionPanel label={<StatusTitle status={status} detail="GraphQL EndPoint" />}>
            <Box pad="small">
              <Accordion>
                <AccordionPanel label={<StatusText status={prod_env.status} detail="Production EndPoint" />}>
                  <Box pad="small">
                    <TextArea value={prod_env.detail} disabled/>
                  </Box>
                </AccordionPanel>
                <AccordionPanel label={<StatusText status={dev_env.status} detail="Development EndPoint" />}>
                  <Box pad="small">
                    <TextArea value={dev_env.detail} disabled/>
                  </Box>
                </AccordionPanel>
              </Accordion>
            </Box>
          </AccordionPanel>
        </Accordion>
      )
}

export default EndPointCheck
