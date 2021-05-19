import { all, takeEvery, put, call } from 'redux-saga/effects';
import request from '../actions/connect';
import * as actions from '../actions/index';

const readMerchant = async (path, params) =>
    await request.get(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const readMember = async (path, params) =>
    await request.get(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const readInvoice = async (path, params) =>
    await request.get(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const addResto = async (path, params) =>
    await request.post(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        });

const updateResto = async (path, params) =>
    await request.put(path, params)
        .then()
        .catch(err => {
            throw err
        });

const login = async (path, params) =>
    await request.post(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        })

  const profile = async (path,params)=>
        await request.put(path,params)
        .then(response => response.data)
        .catch(err => {
            throw err
        })

const readMerchantwithID = async (path, params) =>
    await request.get(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        })

const readDetailInvoice = async (path, params) =>
    await request.get(path, params)
        .then(response => response.data)
        .catch(err => {
            throw err
        })

const PATH = '/api';

//login
function* loginUser(payload) {
    const { email, password ,token} = payload
    try {
        const data = yield call(login, `${PATH}/users/login`, {email,password,token})
        if(data.data && data.data.length > 0){
        yield put(actions.loginSuccess(data))
        }else{
        yield put(actions.loginFailure(data))
        }
    } catch (error) {
        console.log(error);
        yield put(actions.loginFailure());
    }
}

//Restaurant
function* loadRestaurant(payload) {
    try {
        const { kategori, current_page, search } = payload
        const cPage = current_page ? current_page : 1
        const data = yield call(readMerchant, `${PATH}/merchants/${kategori}/${cPage}/${search}`);
        yield put(actions.loadRestaurantSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(actions.loadRestaurantFailure());
    }
}

function* addRestaurant(payload) {
    const { kategori, alamat, nama, email, phone, coordinate, file } = payload;
    const merchant_id = 'LH' + Date.now();
    const status = true;
    var formData = new FormData();
    formData.append('merchant_id', merchant_id)
    formData.append('kategori', kategori)
    formData.append('alamat', alamat)
    formData.append('nama', nama)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('coordinate', coordinate)
    formData.append('status', status)
    formData.append('file', file)
    try {
        const data = yield call(addResto, `${PATH}/merchants`, formData)
        yield put(actions.addRestaurantSuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.addRestaurantFailure());
    }
}

function* updateRestaurant(payload) {
    const { id, kategori, alamat, nama, email, phone, coordinate } = payload;
    const status = true;
    var formData = new FormData();
    formData.append('id', id)
    formData.append('kategori', kategori)
    formData.append('alamat', alamat)
    formData.append('nama', nama)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('coordinate', coordinate)
    formData.append('status', status)
    try {
        yield call(updateResto, `${PATH}/merchants`, formData)
        yield put(actions.updateRestaurantSuccess())
    } catch (error) {
        console.log(error);
        yield put(actions.updateRestaurantFailure(id));
    }
}

function* loadMerchantwithID(payload) {
    const { id } = payload;
    try {
        const data = yield call(readMerchantwithID, `${PATH}/merchants/${id}`)
        yield put(actions.loadMerchantwithIdSuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.loadMerchantwithIdFailure());
    }
}

function* addBakery(payload) {
    const { kategori, alamat, nama, email, phone, coordinate, file } = payload;
    const merchant_id = 'LH' + Date.now();
    const status = true;
    var formData = new FormData();
    formData.append('merchant_id', merchant_id)
    formData.append('kategori', kategori)
    formData.append('alamat', alamat)
    formData.append('nama', nama)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('coordinate', coordinate)
    formData.append('status', status)
    formData.append('file', file)
    try {
        const data = yield call(addResto, `${PATH}/merchants`, formData)
        yield put(actions.addBakerySuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.addBakeryFailure());
    }
}

function* updateBakery(payload) {
    const { id, kategori, alamat, nama, email, phone, coordinate } = payload;
    const status = true;
    var formData = new FormData();
    formData.append('id', id)
    formData.append('kategori', kategori)
    formData.append('alamat', alamat)
    formData.append('nama', nama)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('coordinate', coordinate)
    formData.append('status', status)
    try {
        yield call(updateResto, `${PATH}/merchants`, formData)
        yield put(actions.updateBakerySuccess())
    } catch (error) {
        console.log(error);
        yield put(actions.updateBakeryFailure(id));
    }
}


//Member
function* loadMember(payload) {
    try {
        const { current_page, search } = payload
        const cPage = current_page ? current_page : 1
        const data = yield call(readMember, `${PATH}/members/${cPage}/${search}`);
        yield put(actions.loadMemberSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(actions.loadMemberFailure());
    }
}

//Invoice
function* loadInvoice(payload) {
    try {
        const { current_page, search } = payload
        const cPage = current_page ? current_page : 1
        const data = yield call(readInvoice, `${PATH}/invoices/${cPage}/${search}`);
        yield put(actions.loadInvoiceSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(actions.loadInvoiceFailure());
    }
}

function* loadDetailInvoice(payload) {
    const { id_invoice } = payload;
    try {
        const data = yield call(readDetailInvoice, `${PATH}/invoices/${id_invoice}`)
        yield put(actions.loadDetailInvoiceSuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.loadDetailInvoiceFailure());
    }
}


// profile
function* loadprofile(payload) {
    try {
        const { current_page, search } = payload
        const cPage = current_page ? current_page : 1
        const data = yield call(profile, `${PATH}/profile/${cPage}/${search}/2`);
        yield put(actions.loadprofileSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(actions.loadprofileFailure());
    }
}

function* addprofile(payload) {
    const { username, email, oldpassword, password,file } = payload;
    const status = true;
    var formData = new FormData();
    formData.append('username', username)
    formData.append('email', email)
    formData.append('oldpassword', oldpassword)
    formData.append('password', password)
    formData.append('file', file)
    formData.append('status', status)
    try {
        const data = yield call(addprofile, `${PATH}/profile`, formData)
        yield put(actions.addprofileSuccess(data))
    } catch (error) {
        console.log(error);
        yield put(actions.addprofileFailure());
    }
}

//Export default
export default function* rootSaga() {
    yield all([
        takeEvery('LOAD_RESTAURANT', loadRestaurant),
        takeEvery('ADD_RESTAURANT', addRestaurant),
        takeEvery('LOGIN_VIEW', loginUser),
        takeEvery('LOAD_BAKERY', loadRestaurant),
        takeEvery('ADD_BAKERY', addBakery),
        takeEvery('LOAD_MEMBER', loadMember),
        takeEvery('LOAD_INVOICE', loadInvoice),
        takeEvery('LOAD_PROFILE', loadprofile),
        takeEvery('ADD_PROFILE', addprofile),
        takeEvery('UPDATE_RESTAURANT', updateRestaurant),
        takeEvery('LOAD_MERCHANT_WITH_ID', loadMerchantwithID),
        takeEvery('UPDATE_BAKERY', updateBakery),
        takeEvery('LOAD_DETAIL_INVOICE', loadDetailInvoice),
    ])
}