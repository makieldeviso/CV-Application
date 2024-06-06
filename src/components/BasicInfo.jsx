import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const BasicInputFields = function ({refObj, changeBasicValueFunc}) {

  const inputAttributes = (role) => {
    return (
      {
        'data-role': role,
        className: 'basic-info-field',
        name: `${role}-field`,
        id: `${role}-field`,
        onChange: changeBasicValueFunc,
        value: refObj[role]
      }
    )
  }

  return (
    <div className='input-fields'>
      <div className='input-field'>
        <label className='input-label' htmlFor='name-field'>Name:</label>
        <input {...inputAttributes('name')} placeholder="Enter full name"/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor='designation-field'>Designation:</label>
        <input {...inputAttributes('designation')} placeholder="Enter desired position"/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor='address-field'>Address:</label>
        <input {...inputAttributes('address')} placeholder="Enter address/ mailing address"/>
      </div>

      <div className='input-field'>
        <label className='input-label' htmlFor='competency-field'>Competency:</label>
        <textarea 
          {...inputAttributes('competency')} 
          rows={5}
          placeholder="Enter a concise description of yourself, your strengths, soft skills and what you can contribute to your desired position."
        />
      </div>
    </div>
  )
}

const BasicInfo = function ({saveStateFunc, savedFormValues}) {
  const [basicValue, setBasicValue] = useState(savedFormValues);

  useEffect(() => {
    setBasicValue(savedFormValues)
  }, [savedFormValues])

  const handleValueChange = function (event) {
    const inputRole = event.target.dataset.role;
    setBasicValue({...basicValue, [inputRole]: event.target.value});

    // Save to Form component state
    saveStateFunc('basicInfo', {...basicValue, [inputRole]: event.target.value});
  }
 
  return (
    <div className='basic-info info-grp'>
      <h3>Basic Information</h3>
      <BasicInputFields changeBasicValueFunc={handleValueChange} refObj={basicValue}/>
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
  changeBasicValueFunc: PropTypes.func
}

BasicInfo.propTypes = {
  saveStateFunc: PropTypes.func,
  savedFormValues: PropTypes.shape(refObjPropTypes)
}

export default BasicInfo