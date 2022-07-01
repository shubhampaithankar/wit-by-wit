import React, { createContext, useState }  from 'react'

//css
import './App.scss'
import Modal from './components/Modal'

//components
import Sidebar from './components/Sidebar'
import Table from './components/Table'

//data
import data from './data.json'

export const ModalContext = createContext<{} | null>(null)

const App = () => {
    const [tableData, setTableData] = useState<any>(data)

    const [show, setShow] = useState(false)
    const [modalData, setModalData] = useState({})

    const onModalClose = () => {
      setShow(false)
      setModalData({})
    }

    const modalContextValue = {
      display: {
        show,
        setShow,
        modalData,
        setModalData,
        onModalClose,
      }
    }

    const onAddClick = () => {
      setShow(true)
      setModalData({
        name: 'add',
        title: 'Add Student',
      })
    }

    return (
      <ModalContext.Provider value={modalContextValue}>
        <Sidebar />
        <main className=''>
          <section className="container-fluid">
            <Modal setTableData={setTableData}/>
            <div className="d-flex flex-column h-100 w-100 mt-4">
              <div className="col-12 my-1">
                <div className="d-flex justify-content-between align-items-center px-2">
                  <h3 className='p-0 m-0'>Students</h3>
                  <button className='btn px-4 add-btn' onClick={() => onAddClick()}>+ ADD</button>
                </div>
              </div>
              <div className="col-12 my-1 p-2">
                <Table tableData={tableData}/>
              </div>
              <div className="col-12 my-1 pb-3">
                <p className="my-0">Showing { tableData.length } entries</p>
              </div>
            </div>
          </section>
        </main>
      </ModalContext.Provider>
    )
}

export default App