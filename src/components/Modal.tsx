import React, { useContext, useEffect, useRef } from 'react'
import './Modal.scss'

import { ModalContext } from '../App'

const Modal = ({ setTableData }: any) => {
  
  const modalContext = useContext<any>(ModalContext)
  const { display: { show, onModalClose, modalData }  } = modalContext
  
  const modalRef = useRef<any>()
    
    useEffect(() => {
    })
    
    if (!show) return null

    return (
      <div className="modal">
        <div ref={modalRef} className="modal-content px-3 pt-3">
          <div className="modal-head px-3">
            <h4 className="modal-title mb-2">{ modalData?.title }</h4>
          </div>
          <div className="modal-body">
            { modalData.name === 'remove' ? <RemoveComponent /> : <ModalForm /> }
          </div>
          <div className="modal-footer">
              <button className="btn cancel-btn" onClick={() => onModalClose()}>CANCEL</button>
              <button 
                className={ modalData.name === 'remove' ? 'btn remove-btn' : 'btn confirm-btn' }
              >
                { modalData.name === 'remove' ? 'REMOVE' : 'CONFIRM' }
              </button>
          </div>
        </div>
      </div>
    )
}
export default Modal

const ModalForm = () => {
    return (
      <form>

      </form>
    )
}

const RemoveComponent = () => {
  return (
    <div className="d-flex flex-column">
      <h5 className="mb-3">Are you sure you want to remove the current student from the list?</h5>
      <div className="data-group my-1">
        <p className="mb-1">STUDENT NAME</p>
        <h6>Name</h6>
      </div>
      <div className="data-group my-1">
        <p className="mb-1">CLASS</p>
        <h6>9th</h6>
      </div>
    </div>
  )
}