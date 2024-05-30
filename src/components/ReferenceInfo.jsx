import { useState } from "react";
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
    <div className='ref-field'>
      <h4>Reference {refObj.keyId === 'reference-1' ? 1 : 2}:</h4>

      <div className='ref-input-cont'>
        <label htmlFor={`name-${refObj.keyId}`}>Name: </label>
        <input {...fieldAttributes('name')}/>
      </div>

      <div className='ref-input-cont'>
        <label htmlFor={`position-${refObj.keyId}`}>Position: </label>
        <input {...fieldAttributes('position')}/>
      </div>

      <div className='ref-input-cont'>
        <label htmlFor={`company-${refObj.keyId}`}>Company Name: </label>
        <input {...fieldAttributes('company')}/>
      </div>

      <div className='ref-input-cont'>
        <label htmlFor={`companyAdd-${refObj.keyId}`}>Company Address: </label>
        <input {...fieldAttributes('companyAdd')}/>
      </div>

      <div className='ref-input-cont'>
        <label htmlFor={`phone-${refObj.keyId}`}>Phone: </label>
        <input {...fieldAttributes('phone')}/>
      </div>

    </div>
  )
}

const ReferenceInfo = function () {
  const refTemplate = (assignId) => {
    return (
      {
        name: '',
        position: '', 
        company: '',
        companyAdd: '',
        phone: '',
        keyId: assignId,
        timeStamp: assignId === 'reference-1' ? 1 : 2
      }
    )
  }

  const [references, setReferences] = useState([refTemplate('reference-1'), refTemplate('reference-2')]);

  // Create two reference field automatically
  // Note: Two reference at most, don't add another

  const handleChangeRefValue = function (event) {
    const inputRole = event.target.dataset.role;
    const refForChange = references.find((ref) => ref.keyId === event.target.dataset.key);
    const refAsIs = references.filter((ref) => ref.keyId !== event.target.dataset.key);

    refForChange[inputRole] = event.target.value;
    const sortedByTimeAdded = [...refAsIs, refForChange].sort((a, b) => a.timeStamp - b.timeStamp);

    setReferences(sortedByTimeAdded);
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

export default ReferenceInfo