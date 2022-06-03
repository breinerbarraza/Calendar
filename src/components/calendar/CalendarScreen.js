import React, { useEffect, useState } from 'react'
import {Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale('es')

const localizer = momentLocalizer(moment)

/* const events = [{
  title: 'Cumpleaños del jefe',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  bgColor: '#fafafa',
  user:{
    _id:'123',
    name:'breiner'
  }
}] */

export const CalendarScreen = () => {

  const dispath = useDispatch()
  const {events, activeEvent } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth)
  const [lastView, setLastView] = useState( localStorage.getItem('lasView') || 'month')
  useEffect(() => {
     dispath(eventStartLoading())
  }, [dispath])
  

  
  const onDobleClick = (e) => {
    dispath(uiOpenModal())
  }
  const onSelectEvent = (e) => {
    dispath(eventSetActive(e))
  }
  const onViewChange = (e) => {
    localStorage.setItem('lasView', e)
    setLastView(e)
  }
  

  const enventStyleGetter = ( event, start, end, isSelected) => {
    const style = {
      backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return{
      style
    }
  }
  const onSelectSlot = (e) => {
    dispath(eventClearActiveEvent())
  }
  return (
    <div className='calendar-screen'>
      <Navbar/>
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      eventPropGetter={enventStyleGetter}
      onDoubleClickEvent={onDobleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      onSelectSlot={ onSelectSlot }
      selectable={true}
      view={lastView}
      components={{
        event: CalendarEvent
      }}
      
    />
    <AddNewFab />
    {
      activeEvent &&
      <DeleteEventFab/>
    }
    
    <CalendarModal/>
    </div>
  )
}
