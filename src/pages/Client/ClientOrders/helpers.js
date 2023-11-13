function TranslateState(state) {
    if (state === 'just arrived') return 'recién llegado'
    if (state === 'accepted') return 'aceptado'
    if (state === 'started') return 'comenzado'
    if (state === 'to be delivered') return 'para entregar'
    if (state === 'finished') return 'finalizado'
}

export { TranslateState }
