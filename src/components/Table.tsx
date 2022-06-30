import React from 'react'
import './Table.scss'

const Table = ({ tableData }: any) => {
    return (
        <div className='table-box w-100 h-100 mb-4'>
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
                { tableData.map((entry: any, index: number) => {
                        return (
                            <tr key={entry.name}>
                                <td>{index + 1}</td>
                                <td>{ entry.name }</td>
                                <td>{ entry.class }</td>
                                <td className={`${ calculateResult(entry.score).result.toLowerCase() } status`}>{ calculateResult(entry.score).result }</td>
                                <td>{ entry.score }/100</td>
                                <td className={`${calculateResult(entry.score).grade.toLowerCase()} grade`}>{ calculateResult(entry.score).grade }</td>
                                <td className=''>
                                    <img role='button' src={require('../assets/edit.png')} alt="edit-btn" />
                                    <img role='button' src={require('../assets/delete.png')} alt="delete-btn" />
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

const calculateResult = (score: number) => {
    score = Number(score)
    switch (true) {
        case score < 30:
            return { result: 'Failed', grade: 'Poor' }
        case score > 30 && score < 75:
            return { result: 'Passed', grade: 'Average' }
        case score > 75 && score < 100:
            return { result: 'Passed', grade: 'Excellent' }
        default:
            return { result: '--', grade: '--' }
    }
}