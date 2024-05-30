import { useState } from 'react'
import Form from './components/Form.jsx'
import CVTemplate from './components/Template.jsx'

function App() {
  const [verifiedValues, setVerifiedValues] = useState({
    basicInfo: {
      name: '',
      designation: '',
      address: '',
      competency: '',
    },



  })

  const handleSubmitVerified = function (verifiedState) {
    setVerifiedValues(verifiedState);
  }

  return (
    <div className='main-content'>
      <Form submitVerified={handleSubmitVerified}/>
      <CVTemplate refObj={verifiedValues}/>
    </div>
  )
}

export default App
