import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { WarnIcon, CloseIcon, AddIcon } from "./Icons";

const EducField = function ({refObj, handleRemoveEduc, handleChangeEducValue, educLength, submitOnce}) {
  
  const assignProps = function (role, inputType) {

    return ({
      className: "input-cont",
      type: `${!inputType ? 'text' : inputType}`,
      'data-role': role,
      'data-key': refObj.keyId,
      id: `${role}-${refObj.keyId}`,
      'name': `${role}-${refObj.keyId}`,
      value: refObj[role],
      onChange: handleChangeEducValue,
      'aria-invalid': `${submitOnce && refObj[role].length === 0 ? 'true' : 'false'}`
    })
  }
  
  return (
    <div className='input-fields'>
      <div className='year-field input-field'>
        <label htmlFor={`yearGraduated-${refObj.keyId}`}>
          Year Graduated:
          {submitOnce && refObj.yearGraduated.length === 0 && <WarnIcon/>}
        </label>
        <input
          {...assignProps('yearGraduated')}
          placeholder="Enter year graduated"
        />
      </div>

      <div className='degree-field input-field'>
        <label htmlFor={`degree-${refObj.keyId}`}>
          Degree:
          {submitOnce && refObj.degree.length === 0 && <WarnIcon/>}
        </label>
        <input 
          {...assignProps('degree')}
          placeholder="e.g. High School, Computer Science"
        />
      </div>

      <div className='school-field input-field'>
        <label htmlFor={`school-${refObj.keyId}`}>
          School:
          {submitOnce && refObj.school.length === 0 && <WarnIcon/>}
        </label>
        <input 
          {...assignProps('school')}
          placeholder="e.g. Manila High School, Harvard University"
        />
      </div>

      <button aria-label='Remove education information' className='remove-btn' type='button' value={refObj.keyId} onClick={handleRemoveEduc} disabled={educLength <= 1}>
        <CloseIcon/>
      </button>

    </div>
  )
}

const EducationInfo = function ({handleSaveFormValues, savedFormValues, submitOnce}) {
  const [educations, setEducations] = useState(savedFormValues);

  useEffect(() => {
    setEducations(savedFormValues)
  }, [savedFormValues, submitOnce])
  
  const handleAddEducation = function () {
    const newKey = crypto.randomUUID();
    const newEduc = {yearGraduated:'', degree:'', school:'', keyId: newKey, timeStamp: new Date().valueOf()}

    setEducations([...educations, newEduc]);
  }

  const handleRemoveEduc = function (event) {
    const remainEduc = educations.filter((field => field.keyId !== event.target.value));
    setEducations(remainEduc); 
    
    // Save deletion to Form component state
    handleSaveFormValues('educationInfo', remainEduc);
  }

  const handleChangeEducValue = function (event) {
    const inputRole = event.target.dataset.role;
    const educForChange = educations.find((educ) => educ.keyId === event.target.dataset.key);
    const educAsIs = educations.filter((educ) => educ.keyId !== event.target.dataset.key);

    educForChange[inputRole] = event.target.value;
    const sortedByTimeAdded = [...educAsIs, educForChange].sort((a, b) => a.timeStamp - b.timeStamp);

    setEducations(sortedByTimeAdded);

    // Save to Form component state
    handleSaveFormValues('educationInfo', sortedByTimeAdded);
  }
  
  const EducInputFields = educations.map((field) => {
    return (
      <EducField
        key={field.keyId}
        refObj={field}
        handleRemoveEduc={handleRemoveEduc}
        handleChangeEducValue={handleChangeEducValue} 
        educLength={educations.length}
        submitOnce={submitOnce}
      />
    )
  })

  return (
    <div className="education-info info-grp">
      <h3>Education</h3>
      <>{EducInputFields}</>

      <button type="button" className='add-info-btn' onClick={handleAddEducation}>
        <AddIcon/>
        Add Education
      </button>
    </div>
  )
}

const refObjPropTypes = {
  yearGraduated: PropTypes.string,
  degree: PropTypes.string,
  school: PropTypes.string,
  keyId: PropTypes.string,
  timeStamp: PropTypes.number
}


EducField.propTypes = {
  refObj: PropTypes.shape(refObjPropTypes),
  handleRemoveEduc: PropTypes.func,
  handleChangeEducValue: PropTypes.func,
  educLength: PropTypes.number,
  submitOnce: PropTypes.bool
}

EducationInfo.propTypes = {
  handleSaveFormValues: PropTypes.func,
  savedFormValues: PropTypes.array,
  submitOnce: PropTypes.bool
}

export default EducationInfo