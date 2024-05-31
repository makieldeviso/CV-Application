import { useState } from "react";
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';

const IntroTemplate = function ({refObj}) {
  const nameDisplay = refObj.name.length !== 0 ? refObj.name : 'Full Name';
  const designationDisplay = refObj.designation.length !== 0 ? refObj.designation : 'Designation';
  const competencyDisplay = refObj.competency.length !== 0 ? refObj.competency : 'Competency';

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

const AddressTemplate = function ({refObj}) {
  const nameDisplay = refObj.address.length !== 0 ? refObj.address : 'Address';

  return (
    <div className='address-sec'>
      <p>Address</p>
      <div className='address-info'>
        <p>{nameDisplay}</p>
      </div>        
    </div>
  )
}

const ContactsTemplate = function ({refArr}) {

  const Contacts = [...refArr].map((contact) => {
    return (
      <div className='contact-info' key={contact.keyId}>
        <p>{contact.label}</p>
        <p>{contact.address}</p>
      </div> 
    )
  })

  return (
    <div className='contact-sec'>
      <p>Contact</p>
      <>{Contacts}</>
             
    </div>
  )
}

const CVTemplate = function ({refState}) {
  
  return (
    <div className='cv-template'>

      <IntroTemplate refObj={refState.basicInfo}/>


      <div className='column-1'>

        <AddressTemplate refObj={refState.basicInfo}/>
        <ContactsTemplate refObj={refState.contactsInfo}/>

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