const formatDate = (date) => {
    // Extract day, month, and year
    new Date(date)
    var day = date.getDate();
    var month = date.getMonth() + 1; // Adding 1 to display the actual month
    var year = date.getFullYear();

    // Construct the date string in the desired format
    var dateString = day + "/" + month + "/" + year;

    // Return the formatted date string
    return dateString
}

const getLastState = (orderStates) => {
    var lastState = orderStates[orderStates.length-1]
    return lastState
}

//just arrived, accepted, started, paused, revising, canceled, to be delivered y finished
const getNextState = (orderStates) => {
    var lastState = getLastState(orderStates)
    if (lastState.state === 'just arrived') return 'accepted'
    if (lastState.state === 'accepted') return 'started'
    if (lastState.state === 'paused') return 'started'
    if (lastState.state === 'revising') return 'started'
    if (lastState.state === 'to be delivered') return 'finished'
}

const getStateId = (orderState, states) => {
    stateId = states.indexOf(orderState)+1
    return stateId
}
export {formatDate, getLastState, getNextState, getStateId}