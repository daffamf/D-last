// RESTAURANT
export const loadRestaurantSuccess = (data) => ({
    type: 'LOAD_RESTAURANT_SUCCESS',
    data
})

export const loadRestaurantFailure = () => ({
    type: 'LOAD_RESTAURANT_FAILURE'
})

export const loadRestaurant = (kategori, current_page, search) => ({ 
    type: 'LOAD_RESTAURANT',
    kategori, current_page, search
})

export const addRestaurant = (kategori, alamat, nama, email, phone, coordinate, file) => ({
    type: 'ADD_RESTAURANT',
    kategori, alamat, nama, email, phone, coordinate, file
})

export const addRestaurantSuccess = (data) => ({
    type: 'ADD_RESTAURANT_SUCCESS',
    data
})

export const addRestaurantFailure = (id) => ({
    type: 'ADD_RESTAURANT_FAILURE',
    id
})

export const addRestaurantView = (merchant_id, kategori, alamat, nama, email, phone, coordinate, status) => ({
    type: 'ADD_RESTAURANT_VIEW',
    merchant_id, kategori, alamat, nama, email, phone, coordinate, status
})

export const loadMerchantwithIdSuccess = (data) => ({
    type:'LOAD_MERCHANT_WITH_ID_SUCCESS',
    data
})

export const loadMerchantwithIdFailure = (id) => ({
    type:'LOAD_MERCHANT_WITH_ID_FAILURE',
    id
})

export const loadMerchantwithId = (id) => ({
    type:'LOAD_MERCHANT_WITH_ID',
    id
})

export const editRestaurant = (id, kategori, alamat, nama, email, phone, coordinate) => ({
    type: 'UPDATE_RESTAURANT',
    id, kategori, alamat, nama, email, phone, coordinate
})

export const updateRestaurantSuccess = () => ({
    type: 'UPDATE_RESTAURANT_SUCCESS'
})

export const updateRestaurantFailure = (id) => ({
    type: 'UPDATE_RESTAURANT_FAILURE',
    id
})

export const updateRestaurantView = (merchant_id, kategori, alamat, nama, email, phone, coordinate, status) => ({
    type: 'UPDATE_RESTAURANT_VIEW',
    merchant_id, kategori, alamat, nama, email, phone, coordinate, status
})


//LOGIN
export const loginSuccess = (data) => ({
    type: 'LOGIN_SUCCESS',
    data
})

export const loginFailure = (id) => ({
    type: 'LOGIN_FAILURE',
    id
})

export const loginUser = (email, password,token) => ({
    type: 'LOGIN_VIEW',
    email, password,token
})


//BAKERY
export const loadBakerySuccess = (data) => ({
    type: 'LOAD_BAKERY_SUCCESS',
    data
})

export const loadBakeryFailure = () => ({
    type: 'LOAD_BAKERY_FAILURE'
})

export const loadBakery = (kategori, current_page, search) => ({ 
    type: 'LOAD_BAKERY',
    kategori, current_page, search
})

export const addBakery = (kategori, alamat, nama, email, phone, coordinate, file) => ({
    type: 'ADD_BAKERY',
    kategori, alamat, nama, email, phone, coordinate, file
})

export const addBakerySuccess = (data) => ({
    type: 'ADD_BAKERY_SUCCESS',
    data
})

export const addBakeryFailure = (id) => ({
    type: 'ADD_BAKERY_FAILURE',
    id
})

export const addBakeryView = (merchant_id, kategori, alamat, nama, email, phone, coordinate, status) => ({
    type: 'ADD_BAKERY_VIEW',
    merchant_id, kategori, alamat, nama, email, phone, coordinate, status
})

export const editBakery = (id, kategori, alamat, nama, email, phone, coordinate) => ({
    type: 'UPDATE_BAKERY',
    id, kategori, alamat, nama, email, phone, coordinate
})

export const updateBakerySuccess = () => ({
    type: 'UPDATE_BAKERY_SUCCESS'
})

export const updateBakeryFailure = (id) => ({
    type: 'UPDATE_BAKERY_FAILURE',
    id
})

export const updateBakeryView = (merchant_id, kategori, alamat, nama, email, phone, coordinate, status) => ({
    type: 'UPDATE_BAKERY_VIEW',
    merchant_id, kategori, alamat, nama, email, phone, coordinate, status
})


//MEMBERS
export const loadMemberSuccess = (data) => ({
    type: 'LOAD_MEMBER_SUCCESS',
    data
})

export const loadMemberFailure = () => ({
    type: 'LOAD_MEMBER_FAILURE'
})

export const loadMember = (current_page, search) => ({ 
    type: 'LOAD_MEMBER',
    current_page, search
})


//INVOICES
export const loadInvoiceSuccess = (data) => ({ 
    type: 'LOAD_INVOICE_SUCCESS',
    data
})

export const loadInvoiceFailure = () => ({
    type: 'LOAD_INVOICE_FAILURE'
})

export const loadInvoice = (current_page, search) => ({
    type: 'LOAD_INVOICE',
    current_page, search
})
export const loadDetailInvoiceSuccess = (data) => ({
    type:'LOAD_DETAIL_INVOICE_SUCCESS',
    data
})
export const loadDetailInvoiceFailure = (id_invoice) => ({
    type:'LOAD_DETAIL_INVOICE_FAILURE',
    id_invoice
})
export const loadDetailInvoice = (id_invoice) => ({
    type:'LOAD_DETAIL_INVOICE',
    id_invoice
})






//PROPFILE

 export const loadprofileSuccess = (data) => ({
    type: 'LOAD_PROFILE_SUCCESS',
    data
})

export const loadprofileFailure = () => ({
    type: 'LOAD_PROFILE_FAILURE'
})

export const loadprofile = (current_page, search) => (
    {
    type: 'LOAD_PROFILE',
    current_page, search
})



export const addprofile = (username, email, oldpasswoard, password,file) => ({
    
    type: 'ADD_PROFILE',
    username, email, oldpasswoard, password,file
})

export const addprofileSuccess = (data) => ({
    type: 'ADD_PROFILE_SUCCESS',
    data
})

export const addprofileFailure = (id) => ({
    type: 'ADD_PROFILE_FAILURE',
    id
})


