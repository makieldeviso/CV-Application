import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { WarnIcon, CloseIcon, AddIcon } from "./Icons";
import { hideFormNav } from "../scripts/utilities";

const ExperienceField = function ({refObj, changeExpValueFunc, removeExpFunc, expLength, submitOnce}) {
 
  const assignProps = (role, inputType) => {
    return ({
      'data-role': role,
      'data-key':  refObj.keyId,
      type: `${!inputType ? 'text' : inputType}`,
      name: `${role}-${refObj.keyId}`,
      id: `${role}-${refObj.keyId}`,
      value: refObj[role],
      onChange: changeExpValueFunc,
      onFocus: hideFormNav,
      'aria-invalid': `${submitOnce && refObj[role].length === 0 ? 'true' : 'false'}`   
    })
  } 

  return(
    <div className='input-fields'>
     
      <div key={`start-${refObj.keyId}`} className={`input-field exp-start`} >
        <label htmlFor={`start-${refObj.keyId}`}>
           Start: 
        </label>
        {submitOnce && refObj.start.length === 0 && <WarnIcon/>}
        <input 
          {...assignProps('start')}
          placeholder="Enter date/ year you started this job"/>
      </div>

      <div key={`end-${refObj.keyId}`} className={`input-field exp-end`} >
        <label htmlFor={`end-${refObj.keyId}`}>
          End:
        </label>
        {submitOnce && refObj.end.length === 0 && <WarnIcon/>}
        <input 
          {...assignProps('end')}
          placeholder="Enter date/ year you left this job "
        />
      </div>

      <div key={`company-${refObj.keyId}`} className={`input-field exp-company`} >
        <label htmlFor={`company-${refObj.keyId}`}>
          Company:
        </label>
        {submitOnce && refObj.company.length === 0 && <WarnIcon/>}
        <input 
          {...assignProps('company')}
          placeholder="Enter company name"
        />
      </div>

      <div key={`companyAddress-${refObj.keyId}`} className={`input-field exp-companyAddress`} >
        <label htmlFor={`companyAddress-${refObj.keyId}`}>
          Company Address:
        </label>
        {submitOnce && refObj.companyAddress.length === 0 && <WarnIcon/>}
        <input 
          {...assignProps('companyAddress')}
          placeholder="Enter company address"
        />
      </div>

      <div key={`position-${refObj.keyId}`} className={`input-field exp-position`} >
        <label htmlFor={`position-${refObj.keyId}`}>
          Position:
        </label>
        {submitOnce && refObj.position.length === 0 && <WarnIcon/>}
        <input 
          {...assignProps('position')}
          placeholder="Enter position for this previous job"
        />
      </div>

      <div key={`desc-${refObj.keyId}`} className={`input-field exp-desc`} >
        <label htmlFor={`desc-${refObj.keyId}`}>
          Description/ Contribution:
        </label>
        {submitOnce && refObj.desc.length === 0 && <WarnIcon/>}
        <textarea
          {...assignProps('desc')} 
          rows={5}
          placeholder="Enter your job description and contributions for this previous job"
        />
      </div>

      <button
        aria-label='Remove experience information'
        className='remove-btn'
        type='button'
        value={refObj.keyId}
        onClick={removeExpFunc}
        disabled={expLength <= 1}
      >
        <CloseIcon/>
      </button>    
    </div>
  )
}

const ExperienceInfo = function ({handleSaveFormValues, savedFormValues, submitOnce}) {
  const [experiences, setExperiences] = useState(savedFormValues);

  useEffect(() => {
    setExperiences(savedFormValues)
  }, [savedFormValues, submitOnce])

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
    handleSaveFormValues('experienceInfo', remainExp);
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
    handleSaveFormValues('experienceInfo', sortedByTimeAdded);
  }
  
  const Experiences = experiences.map((exp) => {
    return (
      <ExperienceField
        key = {exp.keyId}
        refObj = {exp}
        removeExpFunc = {handleExpRemove}
        changeExpValueFunc = {handleExpChangeValue}
        expLength={experiences.length}
        submitOnce={submitOnce}
      />
    )
  })
  
  return (
    <div className="experience-info info-grp" id='form-experience'>
      <h3>Experience</h3>
      <>{Experiences}</>
      
      <button type="button" className='add-info-btn' onClick={handleAddExperience}>
        <AddIcon/>
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
  expLength: PropTypes.number,
  submitOnce: PropTypes.bool
}

ExperienceInfo.propTypes = {
  handleSaveFormValues: PropTypes.func,
  savedFormValues: PropTypes.array,
  submitOnce: PropTypes.bool
}

export default ExperienceInfo