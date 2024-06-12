import { useState, useRef } from 'react'
import Form from './components/Form.jsx'
import CVTemplate from './components/Template.jsx'
import SlideButton from './components/Slider.jsx';

import { setLocalStorageSubmittedValues, getLocalStorageSubmittedValues } from './scripts/memoryHandler.js';

import ProfileIcon from '@mdi/react';
import GithubIcon from '@mdi/react';

import { mdiFaceManProfile, mdiGithub} from '@mdi/js';

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

      <SlideButton/>
    </header>

    <main className='main-content form-view'>
      <Form submitVerified={handleSubmitVerified}/>
      <div className='template-viewer'>

        <div className='cv-cont'>
          <CVTemplate refState={verifiedValues}/>
        </div>
        
        {/* pseudo footer */}
        <div className="footer-cont">
          <p>Copyright&copy; 2024 - Fred Mark Baldeviso</p>
          <a className="github-link" href="https://github.com/makieldeviso" target="_blank" >
            <GithubIcon path={mdiGithub} />
            <span className="link-text">makieldeviso</span>
          </a>
        </div>

      </div>
    </main>

    </>
   
  )
}

export default App
