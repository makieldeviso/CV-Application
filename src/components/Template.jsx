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
  
  const Contacts = refArr.map((contact) => {
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

const EducationTemplate = function ({refArr}) {
  
  const Education = refArr.map((educ) => {

    const yearDisplay = educ.yearGraduated.length !== 0 ? educ.yearGraduated : 'Year Graduated';
    const degreeDisplay = educ.degree.length !== 0 ? educ.degree : 'Degree';
    const schoolDisplay = educ.school.length !== 0 ? educ.school : 'School';

    return (
      <div className='education-info' key={educ.keyId}>
        <p>{yearDisplay}</p>
        <p>{degreeDisplay}</p>
        <p>{schoolDisplay}</p>
      </div>    
    )
  })

  return (
    <div className='education-sec'>
      <p>Education</p>
      <>{Education}</>
          
    </div>
  )
}


const ExpertiseTemplate = function ({refArr}) {
 
  const Expertise = refArr.map((expertise) => {

    const Rating = [];
    for(let i = 1; i <= 5; i++) {
      Rating.push(
        <div
          key={i} 
          className={i <= expertise.rating ? 'rating rated': 'rating unrated'} 
        >
        </div>
      )
    }

    const skillName = expertise.skill.length !== 0 ? expertise.skill : 'Unnamed skill';

    return (
      <div className='expertise-content' key={expertise.keyId}>
        <p>{skillName}</p>
        <div className='rating-cont'>
          <>{Rating}</>
        </div>
      </div>
    )
  })

  return (
    <div className='expertise-sec'>
          <p>Expertise</p>

          <div className='expertise-info'>
            <div className='expertise-header'>
              <p>Skill</p>
              <p>Rating</p>
            </div>

            <>{Expertise}</>
          </div>        
        </div>
  )
}

const ExperienceTemplate = function ({refArr}) {

  const Experiences = refArr.map((exp) => {

    const start = exp.start.length !== 0 ? exp.start : 'Start';
    const end = exp.end.length !== 0 ? exp.end : 'End';
    const company = exp.company.length !== 0 ? exp.company : 'Company name';
    const companyAddress = exp.companyAddress.length !== 0 ? exp.companyAddress : 'Company Address';
    const position = exp.position.length !== 0 ? exp.position : 'Position';
    const desc= exp.desc.length !== 0 ? exp.desc : 'Describe your contributions to previous job';

    return (
      <div className='experience-info' key={exp.keyId}>
        <div className='exp-start-end'>
          <p>{start}</p>
          <p>{end}</p>
        </div>

        <div className='exp-company'>
          <p>{company}</p>
          <p>{companyAddress}</p>
        </div>
        
        <p>{position}</p>
        <p>{desc}</p>
        
      </div>  
    )
  })

  return (
    <div className='experience-sec'>
      <p>Experience</p>
      <>{Experiences}</>      
    </div>
  )
}

const ReferencesTemplate = function ({refArr}) {
  
  const References = refArr.map((reference) => {

    const name = reference.name.length !== 0 ? reference.name : "Reference Name";
    const position = reference.position.length !== 0 ? reference.position : "Position";
    const company = reference.company.length !== 0 ? reference.company : "Company";
    const companyAddress = reference.companyAddress.length !== 0 ? reference.companyAddress : "Company Address";
    const phone = reference.phone.length !== 0 ? reference.phone : "Phone Number";

    return (
      <div className='reference-info-1' key={reference.keyId}>
        <p>{name}</p>
        <p>{position}</p>
        <p>{company}</p>
        <p>{companyAddress}</p>
        <p><span>Phone:</span>{phone}</p>
      </div>
    )
  })

  return (
    <div className='references-sec'>
      <p>References</p>
      <div className='references-info'>
      <>{References}</>
      </div>
      
    </div>
  )

}

// CV Template assembly (start)
const CVTemplate = function ({refState}) {
  
  return (
    <div className='cv-template'>

      <IntroTemplate refObj={refState.basicInfo}/>

      <div className='column-1'>

        <AddressTemplate refObj={refState.basicInfo}/>
        <ContactsTemplate refArr={refState.contactsInfo}/>
        <EducationTemplate refArr={refState.educationInfo}/>
        <ExpertiseTemplate refArr={refState.expertiseInfo}/>

      </div>

      <div className='column-2'>

        <ExperienceTemplate refArr={refState.experienceInfo}/>
        <ReferencesTemplate refArr={refState.referencesInfo}/>
       

      </div>

    </div>
   
  )
}

const basicInfoPropTypes = {
  refObj: PropTypes.shape({
      name: PropTypes.string,
      designation: PropTypes.string,
      address: PropTypes.string,
      competency: PropTypes.string
  })
}

IntroTemplate.propTypes = basicInfoPropTypes;
AddressTemplate.propTypes = basicInfoPropTypes;
ContactsTemplate.propTypes = {refArr: PropTypes.array};
EducationTemplate.propTypes = {refArr: PropTypes.array};
ExpertiseTemplate.propTypes = {refArr: PropTypes.array};
ExperienceTemplate.propTypes = {refArr: PropTypes.array};
ReferencesTemplate.propTypes = {refArr: PropTypes.array};

CVTemplate.propTypes = {
  refState: PropTypes.shape({
    basicInfo: PropTypes.shape({
      name: PropTypes.string,
      designation: PropTypes.string,
      address: PropTypes.string,
      competency: PropTypes.string
    }),
    contactsInfo: PropTypes.array,
    educationInfo: PropTypes.array,
    expertiseInfo: PropTypes.array,
    experienceInfo: PropTypes.array,
    referencesInfo: PropTypes.array
  })
}

export default CVTemplate