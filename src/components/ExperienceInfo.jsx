import { useState } from "react";
import PropTypes from 'prop-types';

const ExperienceField = function ({assignId, removeExpFunc}) {
  const [expValue, setExpValue] = useState(
    {start:'',
     end:'',
     company:'',
     address:'',
     position:'',
     desc:'' 
    });

  const handleValueChange = function (event) {
    const keyName = event.target.dataset.key;
    setExpValue({...expValue, [keyName]: event.target.value});
  }

  return(
    <div className='exp-field'>

      <div className='exp-start'>
        <label htmlFor={`start-${assignId}`}>Start:</label>
        <input data-key='start' type="text" name={`start-${assignId}`} id={`start-${assignId}`} onChange={handleValueChange} />
      </div>

      <div className='exp-end'>
        <label htmlFor={`end-${assignId}`}>End:</label>
        <input data-key='end' type="text" name={`end-${assignId}`} id={`end-${assignId}`} onChange={handleValueChange}/>
      </div>

      <div className='exp-company'>
        <label htmlFor={`company-${assignId}`}>Company:</label>
        <input data-key='company' type="text" name={`company-${assignId}`} id={`company-${assignId}`} onChange={handleValueChange}/>
      </div>

      <div className='exp-company-add'>
        <label htmlFor={`address-${assignId}`}>Company Address:</label>
        <input data-key='address' type="text" name={`address-${assignId}`} id={`address-${assignId}`} onChange={handleValueChange}/>
      </div>

      <div className='exp-position'>
        <label htmlFor={`position-${assignId}`}>Position:</label>
        <input data-key='position' type="text" name={`position-${assignId}`} id={`position-${assignId}`} onChange={handleValueChange}/>
      </div>

      <div className='exp-desc'>
        <label htmlFor={`desc-${assignId}`}>Description/ Contributions:</label>
        <textarea data-key='desc' name={`desc-${assignId}`} id={`desc-${assignId}`} onChange={handleValueChange}></textarea>
      </div>

      <button className='remove-btn' type='button' value={assignId} onClick={removeExpFunc}>x</button>
      
    </div>
  )
}

ExperienceField.propTypes = {
  assignId: PropTypes.string,
  removeExpFunc: PropTypes.func
}

const ExperienceInfo = function () {
  const [experienceArr, setExperienceArr] = useState([]);

  const handleAddExperience = function () {
    const keyId = crypto.randomUUID();
    setExperienceArr([...experienceArr, {keyId: keyId}]);
  }

  const handleExpRemove = function (event) {
    const remainExp = experienceArr.filter((exp) => exp.keyId !== event.target.value);
    setExperienceArr(remainExp);
  }

  const Experiences = experienceArr.map((exp) => {
    return (
      <ExperienceField key={exp.keyId} assignId={exp.keyId} removeExpFunc={handleExpRemove}/>
    )
  })

  return (
    <div className="experience-info info-grp">
      <h3>Experience</h3>
      <>{Experiences}</>
      
      <button type="button"  onClick={handleAddExperience}>Add Experience</button>
    </div>
  )
}

export default ExperienceInfo