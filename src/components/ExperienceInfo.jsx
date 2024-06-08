import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import CloseIcon from '@mdi/react';
import AddIcon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';

const ExperienceField = function ({refObj, changeExpValueFunc, removeExpFunc, expLength}) {
 
  const inputAttributes = (info) => {
    return ({
      'data-role': info,
      'data-key':  refObj.keyId,
      type: "text",
      name: `${info}-${refObj.keyId}`,
      id: `${info}-${refObj.keyId}`,
      value: refObj[info],
      onChange: changeExpValueFunc  
    })
  } 

  return(
    <div className='input-fields'>
     
      <div key={`start-${refObj.keyId}`} className={`input-field exp-start`} >
        <label htmlFor={`start-${refObj.keyId}`}> Start: </label>
        <input {...inputAttributes('start')} placeholder="Enter date/ year you started this job"/>
      </div>

      <div key={`end-${refObj.keyId}`} className={`input-field exp-end`} >
        <label htmlFor={`end-${refObj.keyId}`}> End: </label>
        <input {...inputAttributes('end')} placeholder="Enter date/ year you left this job "/>
      </div>

      <div key={`company-${refObj.keyId}`} className={`input-field exp-company`} >
        <label htmlFor={`company-${refObj.keyId}`}> Company: </label>
        <input {...inputAttributes('company')} placeholder="Enter company name"/>
      </div>

      <div key={`companyAddress-${refObj.keyId}`} className={`input-field exp-companyAddress`} >
        <label htmlFor={`companyAddress-${refObj.keyId}`}> Company Address: </label>
        <input {...inputAttributes('companyAddress')} placeholder="Enter company address"/>
      </div>

      <div key={`position-${refObj.keyId}`} className={`input-field exp-position`} >
        <label htmlFor={`position-${refObj.keyId}`}> Position: </label>
        <input {...inputAttributes('position')} placeholder="Enter position for this previous job"/>
      </div>

      <div key={`desc-${refObj.keyId}`} className={`input-field exp-desc`} >
        <label htmlFor={`desc-${refObj.keyId}`}> Description/ Contribution: </label>
        <textarea rows={5} {...inputAttributes('desc')} placeholder="Enter your job description and contributions for this previous job"/>
      </div>

      <button
        aria-label='Remove experience information'
        className='remove-btn'
        type='button'
        value={refObj.keyId}
        onClick={removeExpFunc}
        disabled={expLength <= 1}
      >
        <CloseIcon path={mdiClose} size={1}/>
      </button>    
    </div>
  )
}

const ExperienceInfo = function ({saveStateFunc, savedFormValues}) {
  const [experiences, setExperiences] = useState(savedFormValues);

  useEffect(() => {
    setExperiences(savedFormValues)
  }, [savedFormValues])

  const handleAddExperience = function () {
    const keyId = crypto.randomUUID();
    const timeAdded = new Date().valueOf();
    const newExp = {
      start: '',
      end: '',
      company: '',
      companyAddress: '',
      position: '',
      desc:'',
      keyId: keyId,
      timeStamp: timeAdded
    }

    setExperiences([...experiences, newExp]);
  }

  const handleExpRemove = function (event) {
    const remainExp = experiences.filter((exp) => exp.keyId !== event.target.value);
    setExperiences(remainExp);

    // Save deletion to form component state
    saveStateFunc('experienceInfo', remainExp);
  }

  const handleExpChangeValue = function (event) {
    const inputRole = event.target.dataset.role;
    const expForChange = experiences.find((exp) => exp.keyId === event.target.dataset.key);
    const expAsIs = experiences.filter((exp) => exp.keyId !== event.target.dataset.key);

    expForChange[inputRole] = event.target.value;
    const sortedByTimeAdded = [...expAsIs, expForChange].sort((a, b) => a.timeStamp - b.timeStamp);

    // Save to this component state
    setExperiences(sortedByTimeAdded);

    // Save to form component state
    saveStateFunc('experienceInfo', sortedByTimeAdded);
  }
  
  const Experiences = experiences.map((exp) => {
    return (
      <ExperienceField
        key = {exp.keyId}
        refObj = {exp}
        removeExpFunc = {handleExpRemove}
        changeExpValueFunc = {handleExpChangeValue}
        expLength={experiences.length}
      />
    )
  })
  
  return (
    <div className="experience-info info-grp">
      <h3>Experience</h3>
      <>{Experiences}</>
      
      <button type="button" className='add-info-btn' onClick={handleAddExperience}>
        <AddIcon className='add-icon' path={mdiPlus}/>
        Add Experience
      </button>
    </div>
  )
}


const refObjPropTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    company: PropTypes.string,
    companyAddress: PropTypes.string,
    position: PropTypes.string,
    desc:PropTypes.string,
    keyId: PropTypes.string,
    timeStamp: PropTypes.number
}

ExperienceField.propTypes = {
  refObj: PropTypes.shape(refObjPropTypes),
  changeExpValueFunc: PropTypes.func,
  removeExpFunc: PropTypes.func,
  expLength: PropTypes.number
}

ExperienceInfo.propTypes = {
  saveStateFunc: PropTypes.func,
  savedFormValues: PropTypes.array
}

export default ExperienceInfo