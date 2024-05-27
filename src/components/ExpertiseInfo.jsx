import { useState } from "react";
import PropTypes from 'prop-types';

const Skill = function ({skillName, assignId, removeSkillFunc}) {
  const [rating, setRating] = useState(0);
  const btnsArr = [
    {
      value: 1,
      keyId: crypto.randomUUID()
    },
    {
      value: 2,
      keyId: crypto.randomUUID()
    },
    {
      value: 3,
      keyId: crypto.randomUUID()
    },
    {
      value: 4,
      keyId: crypto.randomUUID()
    },
    {
      value: 5,
      keyId: crypto.randomUUID()
    }
  ]

  const handleRatingChange = function (event) {
    setRating(Number(event.target.value));
  }

  const RateBtns = btnsArr.map((btn) => {
  
    return (
      <button 
        className={btn.value <= rating ? 'clicked': 'unclicked'} 
        key={btn.keyId} 
        value={btn.value} 
        onClick={handleRatingChange}>
      {btn.value}
      </button>
    )
  })
  
  return (
    <div className="skill-cont">
      <p>{skillName}</p>
      <div className='rater'>
        <>{RateBtns}</>
      </div>
      <button className='remove-btn' type='button' onClick={removeSkillFunc} value={assignId}>x</button>
    </div>
  )
}

Skill.propTypes = {
  skillName: PropTypes.string,
  assignId: PropTypes.string,
  removeSkillFunc: PropTypes.func
}

const ExpertiseInfo = function () {
  const [skillsArr, setSkillsArr] = useState([]);
  const [skillValue, setSkillValue] = useState('');

  const handleSkillValueChange = function (event) {
    setSkillValue(event.target.value);
  }

  const handleAddExpertise = function (event) {
    if (skillValue.length < 1) {
      return
    }

    if (event.keyCode === 13 || event.type === 'click' ) {
      const keyId = crypto.randomUUID();
      const newSkill = {skillName: skillValue, keyId: keyId}
      setSkillsArr([...skillsArr, newSkill]);
      // Clear input field after adding new contact
      setSkillValue('');
    }
  }

  const handleRemoveSkill = function (event) {
    const remainSkills = skillsArr.filter((skill) => skill.keyId !== event.target.value);
    setSkillsArr(remainSkills);
  }


  const Skills = skillsArr.map((skill) => {
    return (
      <Skill
        key={skill.keyId}
        skillName={skill.skillName}
        assignId={skill.keyId}
        removeSkillFunc={handleRemoveSkill}
      />
    )
  });

  return (
    <div className="expertise-info info-grp">
      <h3>Expertise</h3>
      <div className='skill-header'>
        <p>Skills</p>
        <p>Rating</p>
      </div>
      <>{Skills}</>
      <label htmlFor="skill-input">Add skill name</label>
      <input
        type="text"
        value={skillValue}
        name="skill-input"
        id="skill-input"
        placeholder="e.g.UI/UX design, SEO, Programming" 
        onChange={handleSkillValueChange}
        onKeyDown={handleAddExpertise}
      />

     <button type="button"  onClick={handleAddExpertise}>Add Expertise</button>
    </div>
  )
}


export default ExpertiseInfo