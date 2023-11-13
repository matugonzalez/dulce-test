function TranslateState(state) {
    if (state === 'just arrived') return 'recién llegado'
    if (state === 'accepted') return 'aceptado'
    if (state === 'started') return 'comenzado'
    if (state === 'to be delivered') return 'para entregar'
    if (state === 'finished') return 'finalizado'
    if (state === 'paused') return 'pausado'
    if (state === 'revising') return 'en revisión'
    if (state === 'canceled') return 'cancelado'
}

export { TranslateState }
