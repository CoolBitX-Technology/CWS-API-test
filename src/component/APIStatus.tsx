import React from 'react'

import * as types from '../types'

import { Text, Heading } from 'grommet'

function StatusTitle({status, detail}: types.status) {
  return (
    status === 0 
    ? <Heading textAlign="center" level={3} color="#FFCA58"> {detail} </Heading> // waiting
    : status === 1
      ? <Heading textAlign="center" level={3} color="#00C781"> {detail} </Heading> // success
      : <Heading textAlign="center" level={3} color="#FF4040"> {detail} </Heading> // failed
  )
}

function StatusText({status, detail}: types.status) {
  return (
    status === 0 
    ? <Text color="#FFCA58"> {detail} </Text> // waiting
    : status === 1
      ? <Text color="#00C781"> {detail} </Text> // success
      : <Text color="#FF4040"> {detail} </Text> // failed
  )
}

export { StatusText, StatusTitle}