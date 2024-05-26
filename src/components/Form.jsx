import { useState } from "react";
import PropTypes from 'prop-types';
import ContactInfo from "./ContactAdder";


const BaseInputField = function ({label, assignId, type}) {

  const labelText = `${label}:`;

  return (
    <div className='input-cont'>
      <label className='input-label' htmlFor={assignId}>{labelText}</label>
      <input className='input-field' type={type} name={assignId} id={assignId}></input>
    </div>
  )

}

BaseInputField.propTypes = {
  label: PropTypes.string,
  assignId: PropTypes.string,
  type: PropTypes.string
}

const Form = function () {

  return (
    <>
      <div className='basic-info info-grp'>
        <h3>Basic Information</h3>
        <BaseInputField label='Name' assignId='name' type='text'/>
        <BaseInputField label='Expertise' assignId='expertise' type='text'/>
        <BaseInputField label='Address' assignId='address' type='text'/>
      </div>

      <ContactInfo/>
    </>
    
  )

}

export default Form