import { useState } from "react";
import PropTypes from 'prop-types';

const ExperienceField = function ({refObj, changeExpValueFunc, removeExpFunc}) {
 
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
    <div className='exp-field'>
     
      <div key={`start-${refObj.keyId}`} className={`exp-field exp-start`} >
        <label htmlFor={`start-${refObj.keyId}`}> Start: </label>
        <input {...inputAttributes('start')}/>
      </div>

      <div key={`end-${refObj.keyId}`} className={`exp-field exp-end`} >
        <label htmlFor={`end-${refObj.keyId}`}> End: </label>
        <input {...inputAttributes('end')}/>
      </div>

      <div key={`company-${refObj.keyId}`} className={`exp-field exp-company`} >
        <label htmlFor={`company-${refObj.keyId}`}> Company: </label>
        <input {...inputAttributes('company')}/>
      </div>

      <div key={`companyAddress-${refObj.keyId}`} className={`exp-field exp-companyAddress`} >
        <label htmlFor={`companyAddress-${refObj.keyId}`}> Company Address: </label>
        <input {...inputAttributes('companyAddress')}/>
      </div>

      <div key={`position-${refObj.keyId}`} className={`exp-field exp-position`} >
        <label htmlFor={`position-${refObj.keyId}`}> Position: </label>
        <input {...inputAttributes('position')}/>
      </div>

      <div key={`desc-${refObj.keyId}`} className={`exp-field exp-desc`} >
        <label htmlFor={`desc-${refObj.keyId}`}> Description/ Contribution: </label>
        <textarea {...inputAttributes('desc')}/>
      </div>

      <button
        className='remove-btn'
        type='button'
        value={refObj.keyId}
        onClick={removeExpFunc}
      >
      {/* Inset Button Text Here*/} x
      </button>    
    </div>
  )
}

const ExperienceInfo = function ({saveStateFunc, savedFormValues}) {
  const [experiences, setExperiences] = useState(savedFormValues);

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
      />
    )
  })
  
  return (
    <div className="experience-info info-grp">
      <h3>Experience</h3>
      <>{Experiences}</>
      
      <button type="button"  onClick={handleAddExperience}> Add Experience </button>
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
  removeExpFunc: PropTypes.func
}

ExperienceInfo.propTypes = {
  saveStateFunc: PropTypes.func,
  savedFormValues: PropTypes.array
}

export default ExperienceInfo