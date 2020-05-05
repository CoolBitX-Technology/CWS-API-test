import React, { useMemo, useState } from 'react'

import { Box, WorldMap } from 'grommet'

function Map() {

  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)

  useMemo(() => {
if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res)=>{
        console.log(res.coords)
        setLatitude(res.coords.latitude)
        setLongitude(res.coords.longitude)
      }, err=>{
        console.error(err)
      });
    }
  }
  , [])

  return(
    <Box width="100%">
    { latitude && longitude 
      ? <WorldMap
        alignSelf="center"
        places={[
          { location: [latitude, longitude],
            color: 'brand' },
        ]}
        /> 
      : null
    } </Box>
  )
}

export default Map