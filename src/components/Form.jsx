import { useState, useRef } from "react";
import PropTypes from 'prop-types';

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import EducationInfo from "./EducationInfo";
import ExpertiseInfo from "./ExpertiseInfo";
import ExperienceInfo from "./ExperienceInfo";
import ReferenceInfo from "./ReferenceInfo";
import { FormNav } from "./FormNav";

import { SendIcon, EraserIcon } from "./Icons";

import { ConfirmClearDialog } from "./ConfirmDialog";
import {defaultEmptyState, setLocalStorageFormValues, setLocalStorageSubmittedValues, getLocalStorageFormValues} from "../scripts/memoryHandler";
import verifySubmission from "../scripts/verifyForm";

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

  const handleSubmit = async function () {
    setSubmitOnce((s) => s = true);


    const result = verifySubmission(formValues)

    if (result) {
      // Note: If a successful submit, reset submitOnce to disable invalid indicators
      setSubmitOnce((s) => s = false);

      // Adds a base64 image from the profile picture input value
      const convertFile = function (file) {
        if (!file) return ''
        return new Promise ((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            resolve(reader.result)
          }

          reader.onerror = reject;
        })
      }
      const profileInput = document.querySelector('[data-role="profile"]')
      const profileInputValue = await convertFile(profileInput.files[0]);
      const modBasicInfo = {...formValues.basicInfo, profile64: profileInputValue}

      // If no invalid input fields, submit verified values
      submitVerified({...formValues, basicInfo: modBasicInfo});
    }    
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
        submitOnce: submitOnce,
      }
    )
  }
  
  return (
    
      <form className='info-form' action="">
        
        <FormNav/>

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
            <EraserIcon/>
            Clear
          </button>

          <button className='submit-btn' type='button' onClick={handleSubmit}>
            <SendIcon/>
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