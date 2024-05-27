import { useState } from "react";
import PropTypes from 'prop-types';

const EducationField = function ({assignId, removeFieldFunc}) {

  return (
    <div className='educ-field'>
      <div className='year-field'>
        <label htmlFor={`year-${assignId}`}>Year finished:</label>
        <input type="text" id={`year-${assignId}`} name={`year-${assignId}`}/>
      </div>

      <div className='degree-field'>
        <label htmlFor={`degree-${assignId}`}>Degree:</label>
        <input 
          type="text"
          id={`degree-${assignId}`}
          name={`degree-${assignId}`}
          placeholder="e.g. High School, Computer Science"/>
      </div>

      <div className='school-field'>
        <label htmlFor={`school-${assignId}`}>School:</label>
        <input 
          type="text"
          id={`school-${assignId}`}
          name={`school-${assignId}`}
          placeholder="e.g. Dulag High School, Harvard University"/>
      </div>

      <button className='remove-btn' type='button' value={assignId} onClick={removeFieldFunc}>x</button>

    </div>
  )
}

EducationField.propTypes = {
  assignId: PropTypes.string,
  removeFieldFunc: PropTypes.func
}


const EducationInfo = function () {
  const [fields, setFields] = useState([{keyId:'c8ff53be-5659-424d-80a4-071ea1e0cb4a'}]);
  
  const handleAddEducation = function () {
    const newKey = crypto.randomUUID();
    setFields([...fields, {keyId: newKey}]);
  }

  const handleRemoveField = function (event) {
    const remainFields = fields.filter((field => field.keyId !== event.target.value));

    if (remainFields.length < 1) {
      return
    } else {
      setFields(remainFields);
    }    
  }

  const EducInputFields = fields.map((field) => {
    return (
      <EducationField key={field.keyId} assignId={field.keyId} removeFieldFunc={handleRemoveField} />
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