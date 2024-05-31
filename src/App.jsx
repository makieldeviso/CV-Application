import { useState } from 'react'
import Form from './components/Form.jsx'
import CVTemplate from './components/Template.jsx'

import { defaultEmptyState } from './scripts/utilities.js'

function App() {
  const [verifiedValues, setVerifiedValues] = useState(defaultEmptyState);
  
  const handleSubmitVerified = function (verifiedState) {
    setVerifiedValues(verifiedState);
  }

  return (
    <div className='main-content'>
      <Form submitVerified={handleSubmitVerified}/>
      <CVTemplate refState={verifiedValues}/>
    </div>
  )
}

export default App
