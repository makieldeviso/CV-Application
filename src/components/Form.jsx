import { useState } from "react";

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import ExpertiseInfo from "./ExpertiseInfo";
import ExperienceInfo from "./ExperienceInfo";
import ReferenceInfo from "./ReferenceInfo";

import { defaultEmptyState } from "../scripts/utilities";

const Form = function ({submitVerified}) {
  const [formValues, setFormValues] = useState(defaultEmptyState)

  // Note: everytime the user edits the input field saveFormValues is executed
  // from the onChange event of the input field
  const saveFormValues = function (formSection, saveState) {
    setFormValues({...formValues, [formSection]: saveState} )
  }

  const handleSubmit = function () {
    submitVerified(formValues);
  }

  return (
    <div className='form-fields'>
      <BasicInfo saveStateFunc={saveFormValues}/>
      <ContactInfo saveStateFunc={saveFormValues}/>
      <EducationInfo/>
      <ExpertiseInfo/>
      <ExperienceInfo/>
      <ReferenceInfo/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    
  ) 
}

export default Form