import Swal from 'sweetalert2';

const bakery = (state = { data: [], total: 0, pages: 0 }, action) => {
    switch (action.type) {
        case 'LOAD_BAKERY_SUCCESS':
            const data = action.data.data.map(item => {
                item.sent = true
                return item
            })
            return { data, total: action.data.total, pages: action.data.pages }

        case 'LOAD_BAKERY_FAILURE':
            return state;

        case 'LOAD_MERCHANT_WITH_ID_SUCCESS':
            return {
                ...state,
                data: action.data.data
            }

        case 'LOAD_MERCHANT_WITH_ID_FAILURE':
            return state;

        case 'ADD_BAKERY_VIEW':
            return {
                ...state,
                data: [
                    {
                        merchant_id: action.merchant_id,
                        kategori: action.kategori,
                        alamat: action.alamat,
                        nama: action.nama,
                        email: action.email,
                        phone: action.phone,
                        coordinate: action.coordinate,
                        status: action.status,
                    },
                    ...state
                ]
            }

        case 'ADD_BAKERY_SUCCESS':
            return Swal.fire({
                icon: 'success',
                title: 'Data has been Add!',
                text: ''
            }).then(function () {
                window.location = '/admin/bakery'
            });

        case 'ADD_BAKERY_FAILURE':
            const dataFail = state.data.map(item => {
                if (item.id === action.id) {
                    item.sent = false
                }
                return item
            })
            return { ...state, data: dataFail }

        case 'UPDATE_BAKERY_SUCCESS':
            return Swal.fire({
                icon: 'success',
                title: 'Data has been Add!',
                text: ''
            }).then(function () {
                window.location = '/admin/bakery'
            });

        case 'UPDATE_BAKERY_FAILURE':
            return state;

        case 'UPDATE_BAKERY_VIEW':
            return {
                ...state,
                data: [
                    {
                        merchant_id: action.merchant_id,
                        kategori: action.kategori,
                        alamat: action.alamat,
                        nama: action.nama,
                        email: action.email,
                        phone: action.phone,
                        coordinate: action.coordinate,
                        status: action.status,
                    },
                    ...state
                ]
            }

        default:
            return state;
    }
}

export default bakery;