import { useState } from "react";
import PropTypes from 'prop-types';

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import ExpertiseInfo from "./ExpertiseInfo";
import ExperienceInfo from "./ExperienceInfo";
import ReferenceInfo from "./ReferenceInfo";

import {setLocalStorageFormValues, getLocalStorageFormValues} from "../scripts/memoryHandler";

// Check local storage for saved values
const savedFormValues = getLocalStorageFormValues();

const Form = function ({submitVerified}) {
  const [formValues, setFormValues] = useState(savedFormValues);

  // Note: every time the user edits the input field saveFormValues is executed
  // from the onChange event of the input field
  const saveFormValues = async function (formSection, saveState) {
    const updatedFormValues = {...formValues, [formSection]: saveState}; 

    setFormValues(updatedFormValues);

    // Save form values to the local storage
    setLocalStorageFormValues(updatedFormValues);
  }

  const handleSubmit = function () {
    submitVerified(formValues);

  }
  
  return (
    
      <form className='info-form' action="">
        <div className='form-fields'> 
          <BasicInfo saveStateFunc={saveFormValues} savedFormValues={savedFormValues.basicInfo}/>
          <ContactInfo saveStateFunc={saveFormValues} savedFormValues={savedFormValues.contactsInfo}/>
          <EducationInfo saveStateFunc={saveFormValues} savedFormValues={savedFormValues.educationInfo}/>
          <ExpertiseInfo saveStateFunc={saveFormValues} savedFormValues={savedFormValues.expertiseInfo}/>
          <ExperienceInfo saveStateFunc={saveFormValues} savedFormValues={savedFormValues.experienceInfo}/>
          <ReferenceInfo saveStateFunc={saveFormValues} savedFormValues={savedFormValues.referencesInfo}/>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>

  ) 
}

Form.propTypes = {
  submitVerified: PropTypes.func
}

export default Form