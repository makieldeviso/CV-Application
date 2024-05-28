import { useState } from "react";
import PropTypes from 'prop-types';

const SkillField = function ({refObj, changeSkillValueFunc, removeSkillFunc, changeRatingFunc}) {

  // Loop through 5  to create rate buttons
  const RateBtns = [];
  for(let i = 1; i <= 5; i++) {
    RateBtns.push(
      <button 
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
    
    <button className='remove-btn' type='button' value={refObj.keyId} onClick={removeSkillFunc}>x</button>
    </div>
  )
}

SkillField.propTypes = {
  refObj: PropTypes.shape({
    skill: PropTypes.string,
    rating: PropTypes.number,
    keyId: PropTypes.string,
    timeStamp: PropTypes.number
  }),
  changeRatingFunc: PropTypes.func,
  removeSkillFunc: PropTypes.func,
  changeSkillValueFunc: PropTypes.func,
}

const ExpertiseInfo = function () {
  const [skills, setSkills] = useState([]);

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
  }

  
  const handleChangeRating = function (event) {
    const skillForChange = skills.find((skill) => skill.keyId === event.target.dataset.key);
    const skillsAsIs = skills.filter((skill) => skill.keyId !== event.target.dataset.key);

    skillForChange.rating = Number(event.target.value);
    const sortedByTimeAdded = [...skillsAsIs, skillForChange].sort((a, b) => a.timeStamp - b.timeStamp);

    setSkills(sortedByTimeAdded);
  }

  const handleRemoveSkill = function (event) {
    const skillsRemain = skills.filter((skill) => skill.keyId !== event.target.value);
    setSkills(skillsRemain);
  }
  console.log(skills);
  const SkillInputFields = skills.map((skill) => {
    return (
      <SkillField
        key = {skill.keyId}
        refObj = {skill}
        changeSkillValueFunc = {handleChangeSkillValue}
        removeSkillFunc = {handleRemoveSkill}
        changeRatingFunc={handleChangeRating}
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
      <>{SkillInputFields}</>

      <button type="button"  onClick={handleAddExpertise}>Add Expertise</button>
    </div>
  ) 
}

export default ExpertiseInfo