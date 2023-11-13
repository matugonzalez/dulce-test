import {
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Box
} from '@chakra-ui/react'

function Steppers(passedProps) {
    const defaultProps = { steps: [], current: 0 }
    const props = !passedProps ? defaultProps : { ...defaultProps, ...passedProps }

    return (
        <Stepper index={props.current}>
            {props.steps.map((step) => (
                <Step key={step.state_id}>
                    <StepIndicator>
                        <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.state}</StepTitle>
                    </Box>

                    <StepSeparator />
                </Step>
            ))}
        </Stepper>
    )
}
  
export default Steppers

