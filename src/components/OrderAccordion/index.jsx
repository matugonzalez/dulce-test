import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Text,
  Box,
  Button
} from '@chakra-ui/react'

function OrderAccordion(passedProps) {
    const defaultProps = { body: [], total_price: 0, order_id: 0, last_state_at: null, onClick: () => {} }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }

    return (
        <Accordion>
            <AccordionItem>
                <AccordionButton>
                    <Box flex='1' textAlign='left' display='flex' alignItems='center' justifyContent='space-between'>
                        <Box>
                            <Text>Pedido #{props.order_id}</Text>
                            <Text>Actualizado por última vez: {props.last_state_at.toLocaleString()}</Text>
                        </Box>
                        <Button onClick={props.onClick}>Inspeccionar</Button>
                    </Box>
                </AccordionButton>
            </AccordionItem>
        </Accordion>
    )
}

export default OrderAccordion
