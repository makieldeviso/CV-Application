import { useState } from "react";
import PropTypes from 'prop-types';

const EducationField = function ({refObj, removeEducFunc, changeEducFunc}) {

  return (
    <div className='educ-field'>
      <div className='year-field'>
        <label htmlFor={`year-${refObj.keyId}`}>Year finished:</label>
        <input
          type="text"
          data-role='yearFinished'
          data-key={refObj.keyId}
          id={`year-${refObj.keyId}`}
          name={`year-${refObj.keyId}`}
          value={refObj.yearFinished}
          onChange={changeEducFunc}
        />
      </div>

      <div className='degree-field'>
        <label htmlFor={`degree-${refObj.keyId}`}>Degree:</label>
        <input 
          type="text"
          data-role='degree'
          data-key={refObj.keyId}
          id={`degree-${refObj.keyId}`}
          name={`degree-${refObj.keyId}`}
          placeholder="e.g. High School, Computer Science"
          value={refObj.degree}
          onChange={changeEducFunc}
        />
      </div>

      <div className='school-field'>
        <label htmlFor={`school-${refObj.keyId}`}>School:</label>
        <input 
          type="text"
          data-role='school'
          data-key={refObj.keyId}
          id={`school-${refObj.keyId}`}
          name={`school-${refObj.keyId}`}
          placeholder="e.g. Manila High School, Harvard University"
          value={refObj.school}
          onChange={changeEducFunc}
        />
      </div>

      <button className='remove-btn' type='button' value={refObj.keyId} onClick={removeEducFunc}>x</button>

    </div>
  )
}

EducationField.propTypes = {
  refObj: PropTypes.shape({
    yearFinished: PropTypes.string,
    degree: PropTypes.string,
    school: PropTypes.string,
    keyId: PropTypes.string
  }),
  removeEducFunc: PropTypes.func,
  changeEducFunc: PropTypes.func
}


const EducationInfo = function () {
  const [educations, setEducations] = useState([]);
  
  const handleAddEducation = function () {
    const newKey = crypto.randomUUID();
    const newEduc = {yearFinished:'', degree:'', school:'', keyId: newKey, timeStamp: new Date().valueOf()}

    setEducations([...educations, newEduc]);
  }

  const handleRemoveEduc = function (event) {
    const remainEduc = educations.filter((field => field.keyId !== event.target.value));
    setEducations(remainEduc);  
  }

  const handleChangeEducValue = function (event) {
    const inputRole = event.target.dataset.role;
    const educForChange = educations.find((educ) => educ.keyId === event.target.dataset.key);
    const educAsIs = educations.filter((educ) => educ.keyId !== event.target.dataset.key);

    educForChange[inputRole] = event.target.value;
    const sortedByTimeAdded = [...educAsIs, educForChange].sort((a, b) => a.timeStamp - b.timeStamp);

    setEducations(sortedByTimeAdded);
  }
  console.log(educations)
  const EducInputFields = educations.map((field) => {
    return (
      <EducationField
        key={field.keyId}
        refObj={field}
        removeEducFunc={handleRemoveEduc}
        changeEducFunc={handleChangeEducValue} 
      />
    )
  })

  return (
    <div className="education-info info-grp">
      <h3>Education</h3>
      <>{EducInputFields}</>

      <button type="button"  onClick={handleAddEducation}>Add Education</button>
    </div>
  )
}

export default EducationInfo