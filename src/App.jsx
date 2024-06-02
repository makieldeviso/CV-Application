import { useState } from 'react'
import Form from './components/Form.jsx'
import CVTemplate from './components/Template.jsx'

import { setLocalStorageSubmittedValues, getLocalStorageSubmittedValues } from './scripts/memoryHandler.js';

// Check local storage if submitted values are stored
const savedSubmittedValues = getLocalStorageSubmittedValues();

function App() {
  
  const [verifiedValues, setVerifiedValues] = useState(savedSubmittedValues);
  
  const handleSubmitVerified = function (verifiedState) {
    console.log(verifiedState)
    setVerifiedValues(verifiedState);

    setLocalStorageSubmittedValues(verifiedState);
  }

  return (
    <div className='main-content'>
      <Form submitVerified={handleSubmitVerified}/>
      <CVTemplate refState={verifiedValues}/>
    </div>
  )
}

export default App
