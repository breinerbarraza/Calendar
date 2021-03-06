import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/type";

export const startlogin = (email, password) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' )
        const body = await resp.json();

        // console.log(body)

        if( body.ok ) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))


        } else {
            Swal.fire('Error', body.msg , 'error');
        }
    }
}

export const startRegister = ( name, email, password ) => {
    return async ( dispatch ) => {
        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST')
        const body = await resp.json()

        if( body.ok ) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))


        } else {
            Swal.fire('Error', body.msg , 'error');
        }
    }
}

export const startChecking = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken('auth/renew')
        const body = await resp.json()
        //console.log(body)

        if ( body.ok ) {
            localStorage.setItem('token', body.token,)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            // Swal.fire('Error', body.msg, 'error');
            dispatch(checkingFinish());
        }
    } 
}

const checkingFinish = () => {
    return{
        type: types.authCheckingFinish
    }
}


const login = ( user ) => ({
    type: types.authLogin,
    payload: user
}) 

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear('token');
        dispatch(logouth());
    }
}
const logouth = () => ({
    type: types.authLogout
})