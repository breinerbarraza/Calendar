import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'

export const AddNewFab = () => {
    const dispath = useDispatch()

    const handleClickNew = () => {
        dispath(uiOpenModal())
    }
  return (
    <button
        className='btn btn-primary fab'
        onClick={handleClickNew}
    >
        <i className='fas fa-plus'></i>
    </button>
  )
}
