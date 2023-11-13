import './AdminOrderInfo.css'
import { Box, Spinner, Heading, Text } from '@chakra-ui/react'

const AdminOrderInfo = ({ order }) => {
    return (
        <div className="AdminOrderInfo">
            {!order 
            ? <Spinner className='Spinner' size='xl'/>
            :
                <Box height='xl' width='6xl' backgroundColor='pink.200' padding={4} display='flex' flexDirection='row' gap={4} borderRadius='xl'>
                    <Box flexGrow='0' flexShrink='0' flexBasis='35%' display='flex' flexDirection='column' gap={4} >
                        <Box fontSize='xl' padding={2} backgroundColor='gray.100' borderRadius='lg'>
                            <Heading fontSize='4xl'>Pedido #{order.order_id}</Heading>
                        </Box>
                        <Box fontSize='xl' padding={2} backgroundColor='gray.100' borderRadius='lg'>
                            <Heading>Usuario</Heading>
                            <Text>Nombre completo: {order.fullname}</Text>
                            <Text>Email: {order.email}</Text>
                            <Text>Celular: {order.cellphone}</Text>
                        </Box>
                        <Box marginTop='auto' marginBottom='0' width='max-content' padding={4} backgroundColor='green.700' borderRadius='lg'>
                            <Text fontSize='xl' fontWeight='bold' color='pink.100'>Total: ${order.total_price}</Text>
                        </Box>
                    </Box>
                    <Box flexGrow='1' flexShrink='0' flexBasis='auto' display='flex' flexDirection='column' gap={2} backgroundColor='gray.100' borderRadius='xl' padding={2}>
                        <Heading>Menu</Heading>
                        <Box display='flex' flexDirection='column' gap={4}>
                            {order.menu.map((v, i) => (
                                <Box key={i} border='4px' borderColor='pink.200' backgroundColor='gray.200' borderRadius='xl' padding={2}>
                                    <Text fontSize='2xl' fontWeight='bold'>{v.body}</Text>
                                    <Text fontSize='xl' fontWeight='semibold'>{v.detail}</Text>
                                    <Text>Precio: ${v.price}</Text>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            }
        </div>
    )
}
export default AdminOrderInfo
