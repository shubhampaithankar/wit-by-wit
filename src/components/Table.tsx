import React, { useContext } from 'react'
import './Table.scss'

import { ModalContext } from '../App'

import { UtilityService } from '../services'

const Table = ({ tableData }: any) => {
    const modalContext = useContext(ModalContext) as any
    const { display: { setShow, setModalData }  } = modalContext

    const onEditClick = () => {
        setShow(true)
        setModalData({
            name: 'edit',
            title: 'Edit Student'
        })
    }

    const onremoveClick = () => {
        setShow(true)
        setModalData({
            name: 'remove',
            title: 'Remove Student'
        })
    }

    return (
        <div className='table-box w-100 mb-4'>
            <table className='w-100'>
                <thead className=''>
                    <tr className=''>
                        <td className=''>No.</td>
                        <td className=''>Student Name</td>
                        <td className=''>Class</td>
                        <td className=''>Result</td>
                        <td className=''>Score</td>
                        <td className=''>Grade</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                { tableData.map((entry: any) => {
                        return (
                            <tr key={entry.id}>
                                <td>{entry.id}.</td>
                                <td>{ entry.name }</td>
                                <td>{ entry.class }</td>
                                <td className={`${ UtilityService.calculateResult(entry.score).result.toLowerCase() } status`}>{ UtilityService.calculateResult(entry.score).result }</td>
                                <td>{ entry.score }/ 100</td>
                                <td className={`${UtilityService.calculateResult(entry.score).grade.toLowerCase()} grade`}>{ UtilityService.calculateResult(entry.score).grade }</td>
                                <td className=''>
                                    <img 
                                        role='button' 
                                        src={require('../assets/edit.png')} 
                                        alt="edit-btn"
                                        onClick={() => onEditClick()}
                                    />
                                    <img 
                                        role='button' 
                                        src={require('../assets/delete.png')} 
                                        alt="remove-btn" 
                                        onClick={() => onremoveClick()}
                                    />
                                </td>
                            </tr>
                        )
                }) }
                </tbody>
            </table>
        </div>
    )
}

export default Table