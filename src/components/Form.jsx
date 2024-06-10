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
// import verifySubmitted from "../scripts/verifyForm";

const Form = function ({submitVerified}) {
  
  const [formValues, setFormValues] = useState(getLocalStorageFormValues());
  const [submitOnce, setSubmitOnce] = useState(false);

  const dialogRef = useRef(null);

  // Note: every time the user edits the input field saveFormValues is executed
  // from the onChange event of the input field
  const handleSaveFormValues = async function (formSection, saveState) {
    const updatedFormValues = {...formValues, [formSection]: saveState}; 

    setFormValues(updatedFormValues);

    // Save form values to the local storage
    setLocalStorageFormValues(updatedFormValues);
  }

  const handleSubmit = function () {
    // const results = await verifySubmitted(formValues);
    setSubmitOnce(true);

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

  const assignProps = function (infoType) {
    // Note: infoType parameter receives string of info type identifier as argument

    return (
      {
        handleSaveFormValues: handleSaveFormValues,
        savedFormValues: formValues[infoType],
        submitOnce: submitOnce
      }
    )
  }
  console.log(formValues)
  return (
    
      <form className='info-form' action="">
        <div className='form-fields'> 
          <BasicInfo {...assignProps('basicInfo')}/>
          <ContactInfo {...assignProps('contactsInfo')}/>
          <EducationInfo {...assignProps('educationInfo')}/>
          <ExpertiseInfo {...assignProps('expertiseInfo')}/>
          <ExperienceInfo {...assignProps('experienceInfo')}/>
          <ReferenceInfo {...assignProps('referencesInfo')}/>
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