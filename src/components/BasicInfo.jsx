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


const BaseInputField = function () {
  const [basicInfo, setBasicInfo] = useState(basicInfoDetails);

  const basicInputArr = basicInfo.map((infoObj) => {
    const labelText = `${infoObj.label}:`;

    return (
      <div className='input-cont' key={infoObj.keyId}>
        <label className='input-label' htmlFor={infoObj.assignId}>{labelText}</label>
        <input className='input-field' type={infoObj.type} name={infoObj.assignId} id={infoObj.assignId}></input>
      </div>
    )
  })

  return (
    <>{basicInputArr}</>
  )
}

const BasicInfo = function () {

  return (
    <div className='basic-info info-grp'>
      <h3>Basic Information</h3>
      <BaseInputField/>
    </div>
  )
}

BaseInputField.propTypes = {
  label: PropTypes.string,
  assignId: PropTypes.string,
  type: PropTypes.string
}

export default BasicInfo