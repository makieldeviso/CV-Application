import { useState } from "react";
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';

const IntroTemplate = function ({basicInfo}) {

  const nameDisplay = basicInfo.name.length !== 0 ? basicInfo.name : 'Full Name';
  const designationDisplay = basicInfo.designation.length !== 0 ? basicInfo.designation : 'Designation';
  const competencyDisplay = basicInfo.competency.length !== 0 ? basicInfo.competency : 'Competency';

  return (
    <div className='intro'>

        <div className='picture-sec'>
          <Icon className='picture-blank' path={mdiAccountOutline} size={1} />
        </div>

        <div className='header-sec'>
          <p>{nameDisplay}</p>
          <p>{designationDisplay}</p>
          <p>{competencyDisplay}</p>
        </div>

      </div>
  )
}

IntroTemplate.propTypes = {
  basicInfo: PropTypes.shape({
      name: PropTypes.string,
      designation: PropTypes.string,
      address: PropTypes.string,
      competency: PropTypes.string
  })
}


const CVTemplate = function ({refObj}) {
  
  return (
    <div className='cv-template'>

      <IntroTemplate basicInfo={refObj.basicInfo}/>


      <div className='column-1'>

        <div className='address-sec'>
          <p>Address</p>
          <div className='address-info'>
            <p>Address Place</p>
          </div>        
        </div>

        
        <div className='contact-sec'>
          <p>Contact</p>
          <div className='contact-info'>
            <p>Contact Label:</p>
            <p>#123567890</p>
          </div>        
        </div>

        <div className='education-sec'>
          <p>Education</p>
          <div className='education-info'>
            <p>year</p>
            <p>degree</p>
            <p>school</p>
          </div>        
        </div>

        <div className='expertise-sec'>
          <p>Expertise</p>

          <div className='expertise-info'>
            <div className='expertise-header'>
              <p>Skill</p>
              <p>Rating</p>
            </div>

            <div className='expertise-content'>
              <p>Skill-1</p>
              <p>Rating here</p>
            </div>
          </div>        
        </div>

      </div>

      <div className='column-2'>

        <div className='experience-sec'>
          <div className='experience-info'>
            <div className='exp-start-end'>
              <p>Start value</p>
              <p>End value</p>
            </div>

            <div className='exp-company'>
              <p>Company Name</p>
              <p>Company Address</p>
            </div>
            
            <p>position</p>
            <p>Contribution</p>
            
          </div>        
        </div>

        <div className='references-sec'>
          <div className='reference-1-sec'>
            <p>Name</p>
            <p>position</p>
            <p>company</p>
            <p>Phone</p>
          </div>

          <div className='reference-2-sec'>
            <p>Name</p>
            <p>position</p>
            <p>company</p>
            <p>Phone</p>
          </div>
        </div>

      </div>

    </div>
   
  )
}

export default CVTemplate