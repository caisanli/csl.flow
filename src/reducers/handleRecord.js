const initState = {
    records: [],
    step: 0
}
export default function(state = initState, action) {
    let records = [...state.records]
    switch(action.type) {
        case 'ADD':
            console.log([...records, action.handle])
            return Object.assign({}, state, {
                records: [...records, action.handle]
            })
        case 'SET': 
            return Object.assign({}, state, {
                step: action.step
            })
        case 'SPLICE':
            records.splice(action.index);
            return Object.assign({}, state, {
                records
            })
        default:
            return state;
    }
}