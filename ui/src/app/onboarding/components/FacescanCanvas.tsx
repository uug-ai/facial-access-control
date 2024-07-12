import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {Head} from '@/models/Head.jsx'
import { Box, Button } from '@/components/ui'

const FacescanCanvas = () => {
  return (
    <Box className='grow flex p-8 flex-col justify-center align-center w-full' id="canvas-container">
        <Canvas className='' camera={{ near: 0.1, far: 1000, position: [0, 0, 10] }}>
            <Suspense fallback={null}>
            <directionalLight position={[0, 0, 5]} color="white" />
               <Head />
            </Suspense>
        </Canvas>
        <Button variant='light' colorscheme='secondary' className='mx-8'>Start recording</Button>
    </Box>
  )
}

export default FacescanCanvas