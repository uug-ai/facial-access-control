import { Row, Box, Stack, Text, Input, Password, VideoCapture, Button, Icon, Socials, Logo } from '@/components/ui'
import React from 'react'

const Onboarding = () => {
  return (
    <Box className='bg-gray-100 h-lvh p-16'>
      <Row className='rounded-xl overflow-hidden h-full shadow-2xl shadow-gray-400/50'>
        <Stack className='bg-white p-8'>
          <Text as='h1' size='4xl' weight='semibold' className='mb-8'>Welcome, name!{/* ${user.firstname} */}</Text> 
          <Text as='p' size='md' color='light' className='mb-4'>
            Please enter your information and record a short video so we can get you up and running in no time!
          </Text>
          <Text as='p' size='md' color='light' className='mb-4'>
          For more information, visit &nbsp;
            <Text
            as="a"
            variant="link"
            color="light"
            href="https://uug.ai"
            >
            uug.ai.
            </Text>
          </Text>
        </Stack>
        <Stack className='bg-primary-900 p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-primary-900 to-primary-950'>
          <Logo color="white" className='place-self-end'/>
          <Box className='grow'/>
          <Socials color="secondary" className='place-self-center justify-self-end'/>
        </Stack>
      </Row>
    </Box>
  )
}

export default Onboarding