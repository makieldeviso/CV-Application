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
  console.log(refArr)

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

    return (
      <div className='expertise-content' key={expertise.keyId}>
        <p>{expertise.skill}</p>
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