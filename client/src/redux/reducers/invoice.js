const invoice = (state = { data: [], total: 0, pages: 0 }, action) => {
    switch (action.type) {
        case 'LOAD_INVOICE_SUCCESS':
            const data = action.data.data.map(item => {
                item.sent = true
                return item
            })
            return { data, total: action.data.total, pages: action.data.pages }

        case 'LOAD_INVOICE_FAILURE':
            return state;

        case 'LOAD_DETAIL_INVOICE_SUCCESS':
            return {
                ...state,
                data: action.data.data
            }
        case 'LOAD_DETAIL_INVOICE_FAILURE':
            return state;
        default:
            return state;
    }
}

export default invoice