const initState = {
    records: [],
    step: 0
}
export default function(state = initState, action) {
    switch(action.type) {
        case 'ADD':
            console.log([...state.records, action.handle]);
            return Object.assign({}, state, {
                records: [...state.records, action.handle]
            })
        case 'SET': 
            return Object.assign({}, state, {
                step: action.step
            })
        default:
            return state;
    }
}