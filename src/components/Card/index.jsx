//Chakra
import { Card, CardHeader, CardBody, CardFooter, Stack, Box, Text, Heading, Divider, Button, ButtonGroup, Image, Badge  } from '@chakra-ui/react'
import './Cards.css'
function Cards({image, alt, Body, Price, BtnPrimary, BtnSecondary, Title}){
    return(
        <>
        <Card maxW='sm'>
                <CardBody>
                    <Image className='card_image'
                    src={image}
                    alt={alt}
                    borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                    <Heading size='lg'>
                        {Title}
                    <Badge ml='1' colorScheme='green'>
                        New
                    </Badge>
                    </Heading>
                    
                    <Text>
                        {Body}
                    </Text>
                    <Text color='pink.600' fontSize='2xl'>
                        {Price}
                    </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='pink'>
                        {BtnPrimary}
                    </Button>
                    <Button variant='ghost' colorScheme='pink'>
                        {BtnSecondary}
                    </Button>
                    </ButtonGroup>
                </CardFooter>
                </Card>
        </>
    )
}
export default Cards