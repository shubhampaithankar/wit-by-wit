import React, { useState }  from 'react'

//css
import './App.scss'

//components
import Table from './components/Table'

//data
import data from './data.json'

const App = () => {
    const [tableData, setTableData] = useState<any>(data)
    return (
      <>
        <main className='container'>
          <div className="d-flex flex-column h-100 w-100 p-2">
            <div className="col-12 my-2">
              <div className="d-flex justify-content-between align-items-center px-2">
                <h3 className='p-0 m-0'>Students</h3>
                <button className='btn add-btn'>Add</button>
              </div>
            </div>
            <div className="col-12 my-2 h-100">
              <Table tableData={tableData}/>
            </div>
          </div>
        </main>
      </>
    )
}

export default App