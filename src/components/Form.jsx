import { useState } from "react";
import PropTypes from 'prop-types';

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import ExpertiseInfo from "./ExpertiseInfo";
import ExperienceInfo from "./ExperienceInfo";
import ReferenceInfo from "./ReferenceInfo";

import {setLocalStorageFormValues, getLocalStorageFormValues } from "../scripts/memoryHandler";

const Form = function ({submitVerified}) {
  const [formValues, setFormValues] = useState({})

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
    <div className='form-fields'>
      <BasicInfo saveStateFunc={saveFormValues}/>
      <ContactInfo saveStateFunc={saveFormValues}/>
      <EducationInfo saveStateFunc={saveFormValues}/>
      <ExpertiseInfo saveStateFunc={saveFormValues}/>
      <ExperienceInfo saveStateFunc={saveFormValues}/>
      <ReferenceInfo saveStateFunc={saveFormValues}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    
  ) 
}

Form.propTypes = {
  submitVerified: PropTypes.func
}

export default Form