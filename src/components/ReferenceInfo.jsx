import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { WarnIcon } from "./Icons";

const ReferenceField = function ({refObj, handleChangeRefValue, submitOnce}) {

  const fieldAttributes = (role) => {
    return (
      {
        'data-role': role,
        'data-key': refObj.keyId,
        type: "text",
        id: `${role}-${refObj.keyId}`,
        name: `${role}-${refObj.keyId}`,
        value: refObj[role],
        onChange: handleChangeRefValue,
        'aria-invalid': `${submitOnce && refObj[role].length === 0 ? 'true' : 'false'}`
      }
    )
  }

  return (
    <div className='input-fields'>
      <h4>Reference {refObj.keyId === 'reference-1' ? 1 : 2}:</h4>

      <div className='input-field'>
        <label htmlFor={`name-${refObj.keyId}`}>
          Name:
          {submitOnce && refObj.name.length === 0 && <WarnIcon/>}
        </label>
        <input {...fieldAttributes('name')} placeholder="Enter name of reference"/>
      </div>

      <div className='input-field'>
        <label htmlFor={`position-${refObj.keyId}`}>
          Position:
          {submitOnce && refObj.position.length === 0 && <WarnIcon/>}
        </label>
        <input {...fieldAttributes('position')} placeholder="Enter the position of your reference in their current job"/>
      </div>

      <div className='input-field'>
        <label htmlFor={`company-${refObj.keyId}`}>
          Company Name:
          {submitOnce && refObj.company.length === 0 && <WarnIcon/>}
        </label>
        <input {...fieldAttributes('company')} placeholder="Enter the current company name of your reference"/>
      </div>

      <div className='input-field'>
        <label htmlFor={`phone-${refObj.keyId}`}>
          Phone:
          {submitOnce && refObj.phone.length === 0 && <WarnIcon/>}
        </label>
        <input {...fieldAttributes('phone')} placeholder="Enter phone number of your reference"/>
      </div>

    </div>
  )
}

const ReferenceInfo = function ({handleSaveFormValues, savedFormValues, submitOnce}) {
 
  const [references, setReferences] = useState(savedFormValues);

  useEffect(() => {
    setReferences(savedFormValues)
  }, [savedFormValues, submitOnce])

  // Create two reference field automatically
  // Note: Two reference at most, don't add another

  const handleChangeRefValue = function (event) {
    const inputRole = event.target.dataset.role;
    const refForChange = references.find((ref) => ref.keyId === event.target.dataset.key);
    const refAsIs = references.filter((ref) => ref.keyId !== event.target.dataset.key);

    refForChange[inputRole] = event.target.value;
    const sortedByTimeAdded = [...refAsIs, refForChange].sort((a, b) => a.timeStamp - b.timeStamp);

    // Save to this component state
    setReferences(sortedByTimeAdded);

    // Save to Form component state
    handleSaveFormValues('referencesInfo', sortedByTimeAdded)
  }
  
  const ReferencesFields = references.map((ref) => {
   
    return (
      <ReferenceField
        key = {ref.keyId}
        refObj = {ref}
        handleChangeRefValue = {handleChangeRefValue}
        submitOnce = {submitOnce}
      />
    )
  })

  return (
    <div className="reference-info info-grp" id='form-reference'>
      <h3>References</h3>
      <>{ReferencesFields}</>
  
    </div>
  )
}

const refObjPropTypes = {
  name: PropTypes.string,
  position: PropTypes.string, 
  company: PropTypes.string,
  phone: PropTypes.string,
  keyId: PropTypes.string,
  timeStamp: PropTypes.number
}

ReferenceField.propTypes = {
  refObj: PropTypes.shape(refObjPropTypes),
  handleChangeRefValue: PropTypes.func,
  submitOnce: PropTypes.bool
}

ReferenceInfo.propTypes = {
  handleSaveFormValues: PropTypes.func,
  savedFormValues: PropTypes.array,
  submitOnce: PropTypes.bool
}

export default ReferenceInfo