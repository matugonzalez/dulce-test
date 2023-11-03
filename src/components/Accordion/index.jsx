import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from '@chakra-ui/react'

function Acordion({title, body}){
  return(
    <>
      <Accordion allowToggle>
          <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {body}
        </AccordionPanel>
      </AccordionItem>
      </Accordion>
    </>
  )
}
export default Acordion