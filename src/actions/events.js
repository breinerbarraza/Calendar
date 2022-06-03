import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/type";

export const eventStartAddNew = (event) => {
    
    
    return async ( dispath, getState ) => {
        const { name, uid } = getState().auth;
        // const { name, id } = useSelector( state => state.auth )
        
        try {
            const resp = await fetchConToken('events', event , 'POST')
            const body = await resp.json()

            if ( body.ok ) {

                event.id = body.evento.id
                event.user = {
                    _id: uid,
                    name: name }
                    dispath(eventAddNew(event))
                    Swal.fire('Exito','Evento guardado')
            }
            
            console.log(event)
        } catch (error) {
            console.log(error)
        }
        
    }
}
const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
})
export const eventStartUpdate = ( event ) => {
    
    return async ( dispath ) => {
        try {
            const resp = await fetchConToken( `events/${event.id}`, event, 'PUT' )
            const body = await resp.json()
            
            if( body.ok ) {
                dispath(eventUpdated(event))
                Swal.fire('Exito','Evento Actualizado')
            } else {
                Swal.fire('Error',body.msg,'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
})
export const eventStartDelete = (  ) => {
    return async ( dispath, getState ) => {
        const {id} = getState().calendar.activeEvent
        try {
            const resp = await fetchConToken(`events/${id}`,{},'DELETE')
            const body = await resp.json()

            if( body.ok ) {
                dispath(eventDeleted())
                Swal.fire('Exito','Evento Eliminado')
            } else {
                Swal.fire('Error',body.msg,'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
})


export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
})

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
})



export const eventStartLoading = () => {
    return async (dispath) => {
        try {
            const resp = await fetchConToken('events')
            const body = await resp.json();
            const events = body.eventos
            dispath(eventLoaded(events))
        } catch (error) {
            console.log(error)
        }
        

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => ({
    type: types.eventLogout
})