import { combineReducers } from 'redux'

import login from './login'
import restaurant from './restaurant';
import bakery from './bakery';
import member from './member';
import invoice from './invoice';
import profile from './profile';

export default combineReducers({
    login,
    restaurant,
    bakery,
    member,
    invoice,
    profile
})
