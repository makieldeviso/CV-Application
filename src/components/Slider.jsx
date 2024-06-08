import { useState, useRef } from 'react'

import LeftChevronIcon from '@mdi/react';
import RightChevronIcon from '@mdi/react';

import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

const SlideButton = function () {
  // Note: formView === true; form is in full view, CV template is cropped
  const [formView, setFormView] = useState(true);

  const handleSlide = function () {
    const main = document.querySelector('main');
      
    if (formView) {
      // Switch to CV view
      setFormView(false);
      main.classList.remove('form-view');
      main.classList.add('cv-view');
   
    } else {
       // Switch to form view
      setFormView(true);
      main.classList.remove('cv-view');
      main.classList.add('form-view');
    }    
  }


  return (
    <button className='slide-btn' onClick={handleSlide}>
      {formView ? <LeftChevronIcon path={mdiChevronLeft}/> : <RightChevronIcon path={mdiChevronRight}/> }
    </button>
  )
}


export default SlideButton