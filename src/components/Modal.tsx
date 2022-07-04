import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import './Modal.scss'

import { ModalContext } from '../App'
import { UtilityService } from '../services'

const Modal = ({ setTableData }: any) => {

    const { register, handleSubmit, formState: {errors} } = useForm()

    const modalContext = useContext<any>(ModalContext)
    const { display: { show, onModalClose, modalData }  } = modalContext
    const modalRef = useRef<any>()
   
    const props = { modalData, register, errors }

    const onSubmit = (data: any) => {
      if (modalData.name === 'remove') {
        setTableData((prevState: any) => {
          return prevState.filter((std: any) => std.name !== modalData.entry.name)
        })
      } else {
        if (modalData.name === 'add') {
          setTableData((prevState: any) => [...prevState, { name: data.name, class: data.class, score: data.score }])
        } else {
          setTableData((prevState: any) => prevState.map((std: any) => std.name === data.name ? { ...std, name: data.name, class: data.class, score: data.score } : std))
        }
      }
      onModalClose()
      return
    }

    if (!show) return null

    return (
      <div className="modal">
        <div ref={modalRef} className="modal-content px-3 pt-3">
        <form onSubmit={handleSubmit(onSubmit)}>
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

const ModalForm = ({ modalData, register, errors }: any) => {
    const [score, setScore] = useState('')

    useEffect(() => {
      setScore(modalData.entry?.score)
    }, [modalData.entry?.score])
      
    return modalData.name !== 'remove' ? (
      <>
        <div className="form-group mb-3">
          <label htmlFor="name" className='mb-2'>STUDENT NAME*</label>
          <input type="text" name="name" className={`${errors?.name?.type === 'required' ? 'error' : ''} form-control`}
            {...register('name', { required: true })}
            defaultValue={modalData.name === 'edit' ? modalData.entry.name : ''}/>
          { errors?.name?.type === 'required' ? <p className='m-0 error-text'>Error: Name field cannot be left blank</p> : null }
        </div>
        <div className="form-group mb-3">
          <label htmlFor="class" className='mb-2'>CLASS*</label>
          <input type="text" name="class" className={`${errors?.class ? 'error' : ''} form-control`}
            {...register('class', { required: true, min: 1, max: 12 })}
            defaultValue={modalData.name === 'edit' ? modalData.entry.class : ''}/>
          { errors?.class ? <p className='m-0 error-text'>Error: Please input values between 1 and 12</p> : null }
          { errors?.class?.type === 'required' ? <p className='m-0 error-text'>Error: Class field cannot be left blank</p> : null }
        </div>
        <div className="form-group mb-3">
          <label htmlFor="score" className='mb-2'>SCORE*</label>
          <input type="text" name="score" className={`${errors?.score ? 'error' : ''} form-control`}
            {...register('score', { required: true, min: 0, max: 100 })} 
            onChange={(e)=> setScore(e.target.value)} 
            defaultValue={modalData.name === 'edit' ? score : ''}
          />
          { errors?.score?.type === ('max' || 'min') ? <p className='m-0 error-text'>Error: Please input values between 0 and 100</p> : null }
          { errors?.score?.type === 'required' ? <p className='m-0 error-text'>Error: Score field cannot be left blank</p> : null }
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