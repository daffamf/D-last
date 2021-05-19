const member = (state = { data: [], total: 0, pages: 0 }, action) => {
    switch (action.type) {
        case 'LOAD_MEMBER_SUCCESS':
            const data = action.data.data.map(item => {
                item.sent = true
                return item
            })
            return { data, total: action.data.total, pages: action.data.pages }
        case 'LOAD_MEMBER_FAILURE':
            return state;

        default:
            return state;
    }
}

export default member