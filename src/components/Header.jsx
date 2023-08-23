import { Button, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <HStack position={'sticky'} top={0} p={4} shadow={'base'} bgColor={'blackAlpha.900'}>

        <Text fontSize={'2xl'}  width={'60'} color={'white'} >KK-Coins</Text>

        <HStack justifyContent={'flex-end'} w={'full'}>


        <Button variant={'unstyled'} color={'white'}>
            <Link to={'/'}>Home</Link>
        </Button>
        
        <Button variant={'unstyled'} color={'white'}>
            <Link to={'/exchanges'}>Exhanges</Link>
        </Button>
        
        <Button variant={'unstyled'} color={'white'}>
            <Link to={'/coin'}>Coins</Link>
        </Button>
        
        </HStack>
    </HStack>
  )
}

export default Header