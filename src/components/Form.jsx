import { useState, useRef } from "react";
import PropTypes from 'prop-types';

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import ExpertiseInfo from "./ExpertiseInfo";
import ExperienceInfo from "./ExperienceInfo";
import ReferenceInfo from "./ReferenceInfo";

import { ConfirmClearDialog } from "./ConfirmDialog";

import SubmitIcon from '@mdi/react';
import ClearIcon from '@mdi/react';
import { mdiSendVariant, mdiEraserVariant } from '@mdi/js';

import {defaultEmptyState, setLocalStorageFormValues, setLocalStorageSubmittedValues, getLocalStorageFormValues} from "../scripts/memoryHandler";

const Form = function ({submitVerified}) {
  
  const [formValues, setFormValues] = useState(getLocalStorageFormValues());

  const dialogRef = useRef(null);

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

  const handleOpenClearDialog = function (event) {
    // Note: verbose for readability
    // If event value === 'open-modal' set state to true, else false to close
    const buttonAction = event.target.value;
    const modalStatus = buttonAction === 'open-modal' ? true : false;
    
    modalStatus ? dialogRef.current.showModal() : dialogRef.current.close();
  }

  const handleClearForm = async function (action) {
    
    if (action === true) { 
      await setLocalStorageFormValues(defaultEmptyState);
      await setLocalStorageSubmittedValues(defaultEmptyState);
      setFormValues(await getLocalStorageFormValues());
      location.reload();
    }
  }

  return (
    
      <form className='info-form' action="">
        <div className='form-fields'> 
          <BasicInfo saveStateFunc={saveFormValues} savedFormValues={formValues.basicInfo}/>
          <ContactInfo saveStateFunc={saveFormValues} savedFormValues={formValues.contactsInfo}/>
          <EducationInfo saveStateFunc={saveFormValues} savedFormValues={formValues.educationInfo}/>
          <ExpertiseInfo saveStateFunc={saveFormValues} savedFormValues={formValues.expertiseInfo}/>
          <ExperienceInfo saveStateFunc={saveFormValues} savedFormValues={formValues.experienceInfo}/>
          <ReferenceInfo saveStateFunc={saveFormValues} savedFormValues={formValues.referencesInfo}/>
        </div>

        <div className='form-btns-cont'>
          <button className='clear-btn' type='button' onClick={handleOpenClearDialog} value='open-modal'>
            <ClearIcon path={mdiEraserVariant} size={1}/>
            Clear
          </button>

          <button className='submit-btn' type='button' onClick={handleSubmit}>
            <SubmitIcon path={mdiSendVariant} size={1}/>
            Submit
          </button>
        </div>

        <ConfirmClearDialog
          dialogRef={dialogRef}
          modalActionFunc={handleOpenClearDialog}
          clearFormFunc={handleClearForm}
        />
      </form>
  )
}

Form.propTypes = {
  submitVerified: PropTypes.func
}

export default Form