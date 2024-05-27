import PropTypes from "prop-types";
import { useState } from "react";

const basicInfoDetails = [
  {
    label: 'Name',
    assignId: 'name',
    type: 'text',
    keyId: crypto.randomUUID()
  },
  {
    label: 'Expertise',
    assignId: 'expertise',
    type: 'text',
    keyId: crypto.randomUUID()
  },
  {
    label: 'Address',
    assignId: 'address',
    type: 'text',
    keyId: crypto.randomUUID()
  }
];

const BaseInputField = function ({refObj, changeValueFunc, activeValue}) {
  
  return (
    <div className='input-cont' key={refObj.keyId}>
      <label className='input-label' htmlFor={refObj.assignId}>{`${refObj.label}:`}</label>
      <input
        data-key={refObj.assignId}
        className='input-field'
        type={refObj.type}
        name={refObj.assignId}
        id={refObj.assignId}
        onChange={changeValueFunc}
        value={activeValue}
      />
    </div>
  )
}

BaseInputField.propTypes = {
  refObj: PropTypes.shape({
    label: PropTypes.string,
    assignId: PropTypes.string,
    type: PropTypes.string,
    keyId: PropTypes.string,
  }),
  changeValueFunc: PropTypes.func,
  activeValue: PropTypes.string
}

const BasicInfo = function () {
  const [basicValue, setBasicValue] = useState({
    name: '',
    expertise: '',
    address: ''
  });

  const handleValueChange = function (event) {
    const keyName = event.target.dataset.key;
    setBasicValue({...basicValue, [keyName]: event.target.value});
  }
  
  const BaseInputFields = basicInfoDetails.map((infoObj) => {
    return (
      <BaseInputField
      key={infoObj.keyId}
      refObj={infoObj}
      changeValueFunc={handleValueChange}
      activeValue={basicValue[infoObj.assignId]} />
    )
  })

  return (
    <div className='basic-info info-grp'>
      <h3>Basic Information</h3>
      <>{BaseInputFields}</>
    </div>
  )
}

BaseInputField.propTypes = {
  label: PropTypes.string,
  assignId: PropTypes.string,
  type: PropTypes.string
}

export default BasicInfo