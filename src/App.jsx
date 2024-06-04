import { useState } from 'react'
import Form from './components/Form.jsx'
import CVTemplate from './components/Template.jsx'

import { setLocalStorageSubmittedValues, getLocalStorageSubmittedValues } from './scripts/memoryHandler.js';

// Check local storage if submitted values are stored
const savedSubmittedValues = getLocalStorageSubmittedValues();

function App() {
  
  const [verifiedValues, setVerifiedValues] = useState(savedSubmittedValues);
  
  const handleSubmitVerified = function (verifiedState) {
    setVerifiedValues(verifiedState);

    setLocalStorageSubmittedValues(verifiedState);
  }

  return (
    <main className='main-content'>
      <Form submitVerified={handleSubmitVerified}/>
      <CVTemplate refState={verifiedValues}/>
    </main>
    
  )
}

export default App
