import React from 'react'
import './Sidebar.scss'

const Sidebar = () => {
    return (
        <aside className='d-flex flex-column pt-4'>
            <div className="brand mb-4">
                <div className="brand-image">
                    <img src={require('../assets/brand-logo.png')} alt="brand-logo" />
                </div>
                <div className='brand-text'>
                    <p className='m-0'>School Space</p>
                </div>
            </div>
            <hr />
            <nav className='px-3'>
                <ul className='m-0 p-0'>
                    { data.map((entry, index) => {
                        return (
                            <li role='button' key={index} className={`${entry.name  === 'Students' ? 'active' : ''} d-flex flex-row align-items-center my-3 py-2`} >
                                <img src='' alt='' />
                                <p className='m-0'>{entry.name}</p>
                            </li>
                        )
                    }) }
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar

const data = [
    { name: 'Dashboard', logo: '../assets/nav/dashboard.png' },
    { name: 'Courses', logo: '../assets/nav/book.png' },
    { name: 'Students', logo: '../assets/nav/students.png' },
    { name: 'Exams', logo: '../assets/nav/exams.png' },
    { name: 'Results', logo: '../assets/nav/results.png' },
    { name: 'Notice Board', logo: '../assets/nav/notice-board.png' },
    { name: 'Live Classes', logo: '../assets/nav/live-classes.png' },
    { name: 'Notifications', logo: '../assets/nav/notification.png' },
]