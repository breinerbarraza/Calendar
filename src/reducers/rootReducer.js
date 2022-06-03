import {combineReducers} from 'redux'
import { authReducer } from './authReducer'
import { calendarReduder } from './calendarReducer'
import { uiReducer } from './uiReducer'

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReduder,
    auth: authReducer, 
})