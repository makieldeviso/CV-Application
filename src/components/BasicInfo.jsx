import PropTypes from "prop-types";
import { useState } from "react";

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
    <>
      <div className='input-cont'>
        <label className='input-label' htmlFor='name-field'>Name:</label>
        <input {...inputAttributes('name')}/>
      </div>

      <div className='input-cont'>
        <label className='input-label' htmlFor='designation-field'>Designation:</label>
        <input {...inputAttributes('designation')}/>
      </div>

      <div className='input-cont'>
        <label className='input-label' htmlFor='address-field'>Address:</label>
        <input {...inputAttributes('address')}/>
      </div>

      <div className='input-cont'>
        <label className='input-label' htmlFor='competency-field'>Competency:</label>
        <textarea{...inputAttributes('competency')}/>
      </div>
    </>
  )
}

BasicInputFields.propTypes = {
  refObj: PropTypes.shape({
    name: PropTypes.string,
    designation: PropTypes.string,
    address: PropTypes.string,
    competency: PropTypes.string 
  }),
  changeBasicValueFunc: PropTypes.func
}

const BasicInfo = function ({saveStateFunc}) {
  const [basicValue, setBasicValue] = useState({
    name: '',
    designation: '',
    address: '',
    competency: '',
  });

  const handleValueChange = function (event) {
    const inputRole = event.target.dataset.role;
    setBasicValue({...basicValue, [inputRole]: event.target.value});
    saveStateFunc('basicInfo', {...basicValue, [inputRole]: event.target.value});
  }
 
 
  return (
    <div className='basic-info info-grp'>
      <h3>Basic Information</h3>
      <BasicInputFields changeBasicValueFunc={handleValueChange} refObj={basicValue}/>
    </div>
  )
}

BasicInfo.propTypes = {
  saveStateFunc: PropTypes.func
}

export default BasicInfo