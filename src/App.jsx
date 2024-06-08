import { useState, useRef } from 'react'
import Form from './components/Form.jsx'
import CVTemplate from './components/Template.jsx'

import { setLocalStorageSubmittedValues, getLocalStorageSubmittedValues } from './scripts/memoryHandler.js';

import ProfileIcon from '@mdi/react';
import { mdiFaceManProfile } from '@mdi/js';

// Check local storage if submitted values are stored
const savedSubmittedValues = getLocalStorageSubmittedValues();

function App() {
  
  const [verifiedValues, setVerifiedValues] = useState(savedSubmittedValues);
  
  const handleSubmitVerified = function (verifiedState) {
    setVerifiedValues(verifiedState);

    setLocalStorageSubmittedValues(verifiedState);
  }

  return (
    <> 
    <header className='header-content'>
      <div className='banner'>
        <ProfileIcon className='page-logo' path={mdiFaceManProfile} size={1} />
        <h1 className='page-title'>CV Application</h1>
      </div>
    </header>

    <main className='main-content'>
      <Form submitVerified={handleSubmitVerified}/>
      <div className='template-viewer'>
        <CVTemplate refState={verifiedValues}/>
      </div>
    </main>
    </>
   
  )
}

export default App
