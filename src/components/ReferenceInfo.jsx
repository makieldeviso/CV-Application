import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ReferenceField = function ({refObj, changeRefValueFunc}) {

  const fieldAttributes = (role) => {
    return (
      {
        'data-role': role,
        'data-key': refObj.keyId,
        type: "text",
        id: `${role}-${refObj.keyId}`,
        name: `${role}-${refObj.keyId}`,
        value: refObj[role],
        onChange: changeRefValueFunc
      }
    )
  }

  return (
    <div className='input-fields'>
      <h4>Reference {refObj.keyId === 'reference-1' ? 1 : 2}:</h4>

      <div className='input-field'>
        <label htmlFor={`name-${refObj.keyId}`}>Name: </label>
        <input {...fieldAttributes('name')} placeholder="Enter name of reference"/>
      </div>

      <div className='input-field'>
        <label htmlFor={`position-${refObj.keyId}`}>Position: </label>
        <input {...fieldAttributes('position')} placeholder="Enter the position of your reference in their current job"/>
      </div>

      <div className='input-field'>
        <label htmlFor={`company-${refObj.keyId}`}>Company Name: </label>
        <input {...fieldAttributes('company')} placeholder="Enter the current company name of your reference"/>
      </div>

      <div className='input-field'>
        <label htmlFor={`companyAddress-${refObj.keyId}`}>Company Address: </label>
        <input {...fieldAttributes('companyAddress')} placeholder="Enter the current company address of your reference"/>
      </div>

      <div className='input-field'>
        <label htmlFor={`phone-${refObj.keyId}`}>Phone: </label>
        <input {...fieldAttributes('phone')} placeholder="Enter phone number of your reference"/>
      </div>

    </div>
  )
}

const ReferenceInfo = function ({saveStateFunc, savedFormValues}) {
 
  const [references, setReferences] = useState(savedFormValues);

  useEffect(() => {
    setReferences(savedFormValues)
  }, [savedFormValues])

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
    saveStateFunc('referencesInfo', sortedByTimeAdded)
  }
  
  const ReferencesFields = references.map((ref) => {
   
    return (
      <ReferenceField
        key = {ref.keyId}
        refObj = {ref}
        changeRefValueFunc = {handleChangeRefValue}
      />
    )
  })

  return (
    <div className="reference-info info-grp">
      <h3>References</h3>
      <>{ReferencesFields}</>
  
    </div>
  )
}

const refObjPropTypes = {
  name: PropTypes.string,
  position: PropTypes.string, 
  company: PropTypes.string,
  companyAddress: PropTypes.string,
  phone: PropTypes.string,
  keyId: PropTypes.string,
  timeStamp: PropTypes.number
}

ReferenceField.propTypes = {
  refObj: PropTypes.shape(refObjPropTypes),
  changeRefValueFunc: PropTypes.func
}

ReferenceInfo.propTypes = {
  saveStateFunc: PropTypes.func,
  savedFormValues: PropTypes.array
}

export default ReferenceInfo