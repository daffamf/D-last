import Swal from 'sweetalert2';

const profile = (state = { data: [], total: 0, pages: 0 }, action) => {
    switch (action.type) {
        case 'LOAD_PROFILE_SUCCESS':
            const data = action.data.data.map(item => {
                item.sent = true
                return item
            })
            return { data, total: action.data.total, pages: action.data.pages }

        case 'LOAD_PROFILE_FAILURE':
            return state;

        case 'ADD_PROFILE_SUCCESS':
            return Swal.fire({
                icon: 'success',
                title: 'Data has been Add!',
                text: ''
            }).then(function () {
                window.location.href = '/dashboard/admin'

            });

        case 'ADD_PROFILE_FAILURE':
            const dataFail = state.data.map(item => {
                if (item.id === action.id) {
                    item.sent = false
                }
                return item
            })
            return { ...state, data: dataFail }
        default:
            return state;
    }
}

export default profile;