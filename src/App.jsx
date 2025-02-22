import { useState, useEffect} from 'react'
import Form from './components/Form.jsx'
import CVTemplate from './components/Template.jsx'
import SlideButton from './components/Slider.jsx';
import { NavOpener } from './components/FormNav.jsx';
import PrintBtn from './components/PrintButton.jsx';

import { setLocalStorageSubmittedValues, getLocalStorageSubmittedValues } from './scripts/memoryHandler.js';

import ProfileIcon from '@mdi/react';
import GithubIcon from '@mdi/react';

import { mdiFaceManProfile, mdiGithub} from '@mdi/js';
import { calculateScale, disablePrintBtn } from './scripts/utilities.js';

// Check local storage if submitted values are stored
const savedSubmittedValues = getLocalStorageSubmittedValues();

function App() {
  
  const [verifiedValues, setVerifiedValues] = useState(savedSubmittedValues);

  useEffect(() => {
    window.addEventListener('resize', calculateScale);
    window.addEventListener('load', calculateScale);

    window.addEventListener('resize', disablePrintBtn);
    window.addEventListener('load', disablePrintBtn);
    
  }, [])
 
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

      <div className='menu-btns'>
        <NavOpener/>
        <SlideButton/>
      </div>
      
    </header>

    {/* transitionEnd to animate resize and responsive screen  */}
    <main className='main-content form-view' onTransitionEnd={() => calculateScale()}>

      <Form submitVerified={handleSubmitVerified}/>

      <div className='template-viewer'>
        <PrintBtn/>
        {/* CV template inside container */}
        <div className='cv-cont'>
          <CVTemplate refState={verifiedValues}/>
        </div>
        
        {/* pseudo footer */}
        <div className="footer-cont">
          <p>Copyright&copy; {(new Date()).getFullYear()} - Fred Mark Baldeviso</p>
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
