import { useState } from "react";

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import ExpertiseInfo from "./ExpertiseInfo";
import ExperienceInfo from "./ExperienceInfo";
import ReferenceInfo from "./ReferenceInfo";

const Form = function ({submitVerified}) {
  const [formValues, setFormValues] = useState({
    basicInfo: {},
    contact: {},
    education: {},
    expertise: {},
    experience: {},
    reference: {},
  })

  const saveFormValues = function (formSection, saveState) {

    setFormValues({...formValues, [formSection]: saveState} )
  }

  const handleSubmit = function () {
    submitVerified(formValues);
  }

  return (
    <div className='form-fields'>
      <BasicInfo saveStateFunc={saveFormValues}/>
      <ContactInfo/>
      <EducationInfo/>
      <ExpertiseInfo/>
      <ExperienceInfo/>
      <ReferenceInfo/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    
  ) 

}

export default Form