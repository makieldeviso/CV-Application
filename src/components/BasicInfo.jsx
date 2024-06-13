import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { WarnIcon } from "./Icons";

const BasicInputFields = function ({refObj, handleValueChange}) {

  const inputAttributes = (role) => {
    return (
      {
        'data-key': refObj.keyId,
        'data-role': role,
        className: 'basic-info-field',
        name: `${role}-field`,
        id: `${role}-${refObj.keyId}`,
        onChange: handleValueChange,
        value: refObj[role],
        'aria-invalid': `${refObj.submitOnce && refObj[role].length === 0 ? 'true' : 'false'}`
      }
    )
  }

  return (
    <div className='input-fields'>
      <div className='input-field'>
        <label className='input-label' htmlFor='name-field'>
          Name:
          {refObj.submitOnce && refObj.name.length === 0 && <WarnIcon/>}
        </label>
        <input {...inputAttributes('name')} placeholder="Enter full name"/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor='designation-field'>
          Designation:
          {refObj.submitOnce && refObj.designation.length === 0 && <WarnIcon/>}
        </label>
        <input {...inputAttributes('designation')} placeholder="Enter desired position"/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor='address-field'>
          Address:
          {refObj.submitOnce && refObj.address.length === 0 && <WarnIcon/>}
        </label>
        <input {...inputAttributes('address')} placeholder="Enter address/ mailing address"/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor='competency-field'>
          Competency:
          {refObj.submitOnce && refObj.competency.length === 0 && <WarnIcon/>}
        </label>
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

  const handleValueChange = function (event) {
    const inputRole = event.target.dataset.role;
    setBasicValue({...basicValue, [inputRole]: event.target.value});

    // Save to Form component state
    handleSaveFormValues('basicInfo', {...basicValue, [inputRole]: event.target.value});
  }
 
  return (
    <div className='basic-info info-grp'>
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