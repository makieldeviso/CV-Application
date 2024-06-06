import { useState } from "react";
import PropTypes from 'prop-types';

import CloseIcon from '@mdi/react';
import AddIcon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';

const SkillField = function ({refObj, changeSkillValueFunc, removeSkillFunc, changeRatingFunc, skillLength}) {

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
        onClick={changeRatingFunc}
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
        placeholder = "Enter Skill"
        value = {refObj.skill} 
        onChange = {changeSkillValueFunc}
      />

      <div className='rate-btns-cont'>
        <>{RateBtns}</>
      </div>
    
    <button className='remove-btn' type='button' value={refObj.keyId} onClick={removeSkillFunc} disabled={skillLength <= 1}>
      <CloseIcon path={mdiClose} size={1}/>
    </button>
    </div>
  )
}

const ExpertiseInfo = function ({saveStateFunc, savedFormValues}) {
  const [skills, setSkills] = useState(savedFormValues);

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
    saveStateFunc('expertiseInfo', sortedByTimeAdded);
  }

  const handleChangeRating = function (event) {
    const skillForChange = skills.find((skill) => skill.keyId === event.target.dataset.key);
    const skillsAsIs = skills.filter((skill) => skill.keyId !== event.target.dataset.key);

    skillForChange.rating = Number(event.target.value);
    const sortedByTimeAdded = [...skillsAsIs, skillForChange].sort((a, b) => a.timeStamp - b.timeStamp);

    // Save to this component state
    setSkills(sortedByTimeAdded);
    
    // Save to Form component state
    saveStateFunc('expertiseInfo', sortedByTimeAdded);
  }

  const handleRemoveSkill = function (event) {
    const skillsRemain = skills.filter((skill) => skill.keyId !== event.target.value);
    setSkills(skillsRemain);

    // Save to Form component state
    saveStateFunc('expertiseInfo', skillsRemain);
  }
  
  const SkillInputFields = skills.map((skill) => {
    return (
      <SkillField
        key = {skill.keyId}
        refObj = {skill}
        changeSkillValueFunc = {handleChangeSkillValue}
        removeSkillFunc = {handleRemoveSkill}
        changeRatingFunc={handleChangeRating}
        skillLength={skills.length}
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
  changeRatingFunc: PropTypes.func,
  removeSkillFunc: PropTypes.func,
  changeSkillValueFunc: PropTypes.func,
  skillLength: PropTypes.number
}

ExpertiseInfo.propTypes = {
  saveStateFunc: PropTypes.func,
  savedFormValues: PropTypes.array
}

export default ExpertiseInfo