import React, { useContext, useEffect, useRef, useState } from 'react'

import './Modal.scss'

import { ModalContext } from '../App'
import { UtilityService } from '../services'

const Modal = ({ setTableData }: any) => {

    const modalContext = useContext<any>(ModalContext)
    const { display: { show, onModalClose, modalData }  } = modalContext
    const modalRef = useRef<any>()
   
    const props = { modalData }

    const handleSubmit = (e: any) => {
      e.preventDefault()

      if (modalData.name !== 'remove') {
        const formData = new FormData(e.target)
        let name = formData.get('name')
        let stdClass = formData.get('class')
        let score = formData.get('score')

        if (modalData.name === 'add') {
          setTableData((prevState: any) => [...prevState, { name, class: stdClass, score }])
        } else {
          setTableData((prevState: any) => prevState.map((std: any) => std.name === name ? { ...std, name, class: stdClass, score } : std))
        }
      } else {
        setTableData((prevState: any) => {
          return prevState.filter((std: any) => std.name !== modalData.entry.name)
        })
      }

      onModalClose()
      return
    }

    if (!show) return null

    return (
      <div className="modal">
        <div ref={modalRef} className="modal-content px-3 pt-3">
        <form onSubmit={e => handleSubmit(e)}>
          <div className="modal-head px-3">
            <h4 className="modal-title mb-2">{ modalData?.title }</h4>
          </div>
            <div className="modal-body">
              <ModalForm {...props} />
            </div>
            <div className="modal-footer">
              <button className="btn cancel-btn" onClick={()=> onModalClose()}>CANCEL</button>
              <button type='submit' className={ modalData.name==='remove' ? 'btn remove-btn' : 'btn confirm-btn' }>
                { modalData.name === 'remove' ? 'REMOVE' : 'CONFIRM' }
              </button>
            </div>
          </form>
        </div>
      </div>
    )
}
export default Modal

const ModalForm = ({ modalData }: any) => {
    const [score, setScore] = useState('')

    useEffect(() => {
      setScore(modalData.entry?.score)
    }, [modalData.entry?.score])
      
    return modalData.name !== 'remove' ? (
      <>
        <div className="form-group mb-3">
          <label htmlFor="name" className='mb-2'>STUDENT NAME*</label>
          <input type="text" name="name" className='form-control' 
            // onChange={(e) => setName(e.target.value)}
            defaultValue={modalData.name === 'edit' ? modalData.entry.name : ''}/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="class" className='mb-2'>CLASS*</label>
          <input type="text" name="class" className='form-control'
            // onChange={(e) => setStdClass(e.target.value)} 
            defaultValue={modalData.name === 'edit' ? modalData.entry.class : ''}/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="score" className='mb-2'>SCORE*</label>
          <input type="text" name="score" className='form-control' 
            onChange={(e)=> setScore(e.target.value)} 
            defaultValue={modalData.name === 'edit' ? score : ''}
          />
        </div>
        <div className="form-group mb-3 d-flex flex-column">
          <label htmlFor="result" className='mb-2'>RESULT</label>
          <p className={`${ UtilityService.calculateResult(score).result.toLowerCase() } status m-0 text-left`}>{
            UtilityService.calculateResult(score).result }</p>
        </div>
        <div className="form-group mb-3 d-flex flex-column">
          <label htmlFor="grade" className='mb-2'>GRADE</label>
          <p className={`${ UtilityService.calculateResult(score).grade.toLowerCase() } status m-0 text-left`}>{
            UtilityService.calculateResult(score).grade }</p>
        </div>
      </>
      ) : (
      <>
        <h6 className='mb-4'>Are you sure you want to remove the current student from the list?</h6>
        <div className="form-group mb-4 d-flex flex-column">
          <label htmlFor="name" className='mb-1'>STUDENT NAME</label>
          <p className='m-0'>{ modalData?.entry?.name }</p>
        </div>
        <div className="form-group mb-2 d-flex flex-column">
          <label htmlFor="class" className='mb-1'>CLASS</label>
          <p className='m-0'>{ modalData?.entry?.class }</p>
        </div>
      </>
    )
}