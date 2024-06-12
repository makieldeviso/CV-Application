import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import CloseIcon from '@mdi/react';
import AddIcon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';

const SkillField = function ({refObj, handleChangeSkillValue, handleRemoveSkill, handleChangeRating, skillLength, submitOnce}) {

  // Loop through 5  to create rate buttons
  const RateBtns = [];
  for(let i = 1; i <= 5; i++) {
    RateBtns.push(
      <button 
        type='button'
        data-key = {refObj.keyId}
        key={i} 
        className={i <= refObj.rating ? 'rate-btn clicked': 'rate-btn unclicked'} 
        value={i}
        onClick={handleChangeRating}
      >
          {i}
      </button>
    )
  }

  return (
    <div className='skill-cont' >
      <input
        type = "text"
        data-key = {refObj.keyId}
        id = {`skill-${refObj.keyId}`}
        placeholder = "Enter Skill"
        value = {refObj.skill} 
        onChange = {handleChangeSkillValue}
        aria-invalid = {`${submitOnce && refObj.skill.length === 0 ? 'true' : 'false'}`}
      />

      <div className='rate-btns-cont'>
        <>{RateBtns}</>
      </div>
    
    <button aria-label='Remove expertise information' className='remove-btn' type='button' value={refObj.keyId} onClick={handleRemoveSkill} disabled={skillLength <= 1}>
      <CloseIcon path={mdiClose}/>
    </button>
    </div>
  )
}

const ExpertiseInfo = function ({handleSaveFormValues, savedFormValues, submitOnce}) {
  const [skills, setSkills] = useState(savedFormValues);

  useEffect(() => {
    setSkills(savedFormValues)
  }, [savedFormValues])

  const handleAddExpertise = function () {
    const keyId = crypto.randomUUID();
    const newSkill = {
      skill: '',
      rating: 0,
      keyId: keyId,
      timeStamp: new Date().valueOf()
    }

    setSkills([...skills, newSkill]);
  }

  const handleChangeSkillValue = function (event) {
    const skillForChange = skills.find((skill) => skill.keyId === event.target.dataset.key);
    const skillsAsIs = skills.filter((skill) => skill.keyId !== event.target.dataset.key);

    skillForChange.skill = event.target.value;
    const sortedByTimeAdded = [...skillsAsIs, skillForChange].sort((a, b) => a.timeStamp - b.timeStamp);

    setSkills(sortedByTimeAdded);

    // Save to Form component state
    handleSaveFormValues('expertiseInfo', sortedByTimeAdded);
  }

  const handleChangeRating = function (event) {
    const skillForChange = skills.find((skill) => skill.keyId === event.target.dataset.key);
    const skillsAsIs = skills.filter((skill) => skill.keyId !== event.target.dataset.key);

    skillForChange.rating = Number(event.target.value);
    const sortedByTimeAdded = [...skillsAsIs, skillForChange].sort((a, b) => a.timeStamp - b.timeStamp);

    // Save to this component state
    setSkills(sortedByTimeAdded);
    
    // Save to Form component state
    handleSaveFormValues('expertiseInfo', sortedByTimeAdded);
  }

  const handleRemoveSkill = function (event) {
    const skillsRemain = skills.filter((skill) => skill.keyId !== event.target.value);
    setSkills(skillsRemain);

    // Save to Form component state
    handleSaveFormValues('expertiseInfo', skillsRemain);
  }
  
  const SkillInputFields = skills.map((skill) => {
    return (
      <SkillField
        key = {skill.keyId}
        refObj = {skill}
        handleChangeSkillValue = {handleChangeSkillValue}
        handleRemoveSkill = {handleRemoveSkill}
        handleChangeRating = {handleChangeRating}
        skillLength = {skills.length}
        submitOnce = {submitOnce}
      />
    )
  })

  return (
    <div className="expertise-info info-grp">
      <h3>Expertise</h3>
      <div className='skill-header'>
        <p>Skills</p>
        <p>Rating</p>
      </div>

      <div className='skills-cont'>
        <>{SkillInputFields}</>
      </div>
      
      <button type="button"  className='add-info-btn' onClick={handleAddExpertise}>
        <AddIcon className='add-icon' path={mdiPlus}/>
        Add Expertise
      </button>
    </div>
  ) 
}

const refObjPropTypes = {
  skill: PropTypes.string,
  rating: PropTypes.number,
  keyId: PropTypes.string,
  timeStamp: PropTypes.number
}

SkillField.propTypes = {
  refObj: PropTypes.shape(refObjPropTypes),
  handleChangeRating: PropTypes.func,
  handleRemoveSkill: PropTypes.func,
  handleChangeSkillValue: PropTypes.func,
  skillLength: PropTypes.number,
  submitOnce: PropTypes.bool
}

ExpertiseInfo.propTypes = {
  handleSaveFormValues: PropTypes.func,
  savedFormValues: PropTypes.array,
  submitOnce: PropTypes.bool
}

export default ExpertiseInfo