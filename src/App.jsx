import { useState } from 'react'
import Form from './components/Form.jsx'
import CVTemplate from './components/Template.jsx'

import {setLocalStorageSubmittedValues, getLocalStorageSubmittedValues, getLocalStorageFormValues } from './scripts/memoryHandler.js';

function App() {
  // Check local storage if submitted values are stored
  const savedState = getLocalStorageSubmittedValues();
  
  const [verifiedValues, setVerifiedValues] = useState(savedState);
  
  const handleSubmitVerified = async function (verifiedState) {
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
