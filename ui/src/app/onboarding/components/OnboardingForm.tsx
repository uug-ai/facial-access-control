import { Button, Input, Password, Row, Stack, Text } from '@/components/ui'
import { Box } from '@react-three/drei'
import React from 'react'

const OnboardingForm = () => {
  return (
    <form className='w-full h-full'>
        <Stack className='gap-4 grow-0'>
            <Row className='gap-4'>
                <Stack>
                <Text as='label' htmlFor="firstname">First Name</Text>
                <Input type="text" id="firstname" name="firstname" placeholder='first name' required/>
                </Stack>
                <Stack>
                <Text as='label' htmlFor='lastname'>Last Name</Text>
                <Input type='text' id='lastname' name='lastname' placeholder='last name' required/>
                </Stack>
            </Row>
            <Row>
            <Stack className='w-full'>
                <Text as='label' htmlFor='email'>Email</Text>
                <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email"
                    required
                />
            </Stack>
            </Row>
            <Stack>
                <Text as='label' htmlFor='password'>Password</Text>
                <Password
                    name="password"
                    id="password"
                    placeholder="password"
                    required
                />
            </Stack>
            <div className='border-2'><Text as='p'>No recording added yet</Text></div>
            <Button type="submit" name="Sign in" variant="solid" width='full' className='place-self-end'>
                Submit
            </Button>
        </Stack>   
        
    </form>
  )
}

export default OnboardingForm