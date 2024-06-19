import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { WarnIcon } from "./Icons";
import { getFileName, hideFormNav } from "../scripts/utilities";

const BasicInputFields = function ({refObj, handleValueChange}) {

  const inputAttributes = (role) => {
    return (
      {
        'data-key': refObj.keyId,
        'data-role': role,
        className: `basic-info-field`,
        name: `${role}-field`,
        id: `${role}-${refObj.keyId}`,
        onChange: handleValueChange,
        value: refObj[role],
        'aria-invalid': `${refObj.submitOnce && refObj[role].length === 0 ? 'true' : 'false'}`,
        onFocus: hideFormNav,
      }
    )
  }

  return (
    <div className='input-fields'>

      <div className='input-field profile-field'>
        <p className='mod-label'>
          Profile picture:
        </p>
        {refObj.submitOnce && refObj.profile.length === 0 && <WarnIcon/>}
        <label className='input-label profile-label' htmlFor={`profile-${refObj.keyId}`}>
          <span className={`file-name ${refObj.submitOnce && refObj.profile.length === 0 ? 'invalid' : 'valid'}`}>
            {!refObj.profile ? 'Choose a photo...' : getFileName(refObj.profile)}
          </span>
          <span className='browse-pseudo-btn'>Browse:</span> 
        </label>

        <input {...inputAttributes('profile')} type='file' accept='image/*'/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor={`name-${refObj.keyId}`}>
          Name:
        </label>
        {refObj.submitOnce && refObj.name.length === 0 && <WarnIcon/>}
        <input {...inputAttributes('name')} placeholder="Enter full name"/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor={`designation-${refObj.keyId}`}>
          Designation:
        </label>
        {refObj.submitOnce && refObj.designation.length === 0 && <WarnIcon/>}
        <input {...inputAttributes('designation')} placeholder="Enter desired position"/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor={`address-${refObj.keyId}`}>
          Address:
        </label>
        {refObj.submitOnce && refObj.address.length === 0 && <WarnIcon/>}
        <input {...inputAttributes('address')} placeholder="Enter address/ mailing address"/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor={`competency-${refObj.keyId}`}>
          Competency:
        </label>
        {refObj.submitOnce && refObj.competency.length === 0 && <WarnIcon/>}
        <textarea 
          {...inputAttributes('competency')} 
          rows={5}
          placeholder="Enter a concise description of yourself, your strengths, soft skills and what you can contribute to your desired position."
        />
      </div>
    </div>
  )
}

const BasicInfo = function ({handleSaveFormValues, savedFormValues, submitOnce}) {
  const [basicValue, setBasicValue] = useState(savedFormValues);

  useEffect(() => {
    setBasicValue({...savedFormValues, submitOnce: submitOnce})
  }, [savedFormValues, submitOnce])

  const handleValueChange = async function (event) {
    const inputRole = event.target.dataset.role;
    
    setBasicValue({...basicValue, [inputRole]: event.target.value});
    
    // Save to Form component state
    handleSaveFormValues('basicInfo', {...basicValue, [inputRole]: event.target.value});
  }
 
  return (
    <div className='info-grp' id='form-basic'>
      <h3>Basic Information</h3>
      <BasicInputFields handleValueChange={handleValueChange} refObj={basicValue}/>
    </div>
  )
}

const refObjPropTypes = {
  name: PropTypes.string,
  designation: PropTypes.string,
  address: PropTypes.string,
  competency: PropTypes.string 
}

BasicInputFields.propTypes = {
  refObj: PropTypes.shape(refObjPropTypes),
  handleValueChange: PropTypes.func
}

BasicInfo.propTypes = {
  handleSaveFormValues: PropTypes.func,
  savedFormValues: PropTypes.shape(refObjPropTypes),
  submitOnce: PropTypes.bool
}

export default BasicInfo