import React from 'react'
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      {progress.toFixed(0)}% Loading...
    </Html>
  )
}

export default Loader
