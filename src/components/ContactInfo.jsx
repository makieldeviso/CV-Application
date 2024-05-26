import { useState } from "react";
import PropTypes from 'prop-types'
import { capitalizeString } from "../scripts/utilities";


const ContactField = function ({label, assignId, removeFieldFunc}) {
  const [inputValue, setInputValue] = useState('');

  const handleValueChange = (event) => {
    setInputValue(event.target.value);
  }

  const contactLabel = `${capitalizeString(label)}:`;

  return (
    <div className='contact-cont'>
        <label htmlFor={assignId}>{contactLabel}</label>
        <input 
          type='text' 
          id={assignId} 
          name={assignId} 
          value={inputValue}
          onChange={handleValueChange}>
        </input>
        <button type='button' onClick={removeFieldFunc} value={assignId}>x</button>
      </div>
  )
}

ContactField.propTypes = {
  label: PropTypes.string,
  assignId: PropTypes.string,
  removeFieldFunc: PropTypes.func
}


const ContactInfo = function () {
  const [contacts, setContact] = useState([{label: 'Phone', id: 'd8d4b5d8-fd36-4d74-8f08-32970b9de762'}]);
  const [newContact, setNewContact] = useState('');

  const handleRemoveField = function (event) {
    const remainState = contacts.filter((contact => contact.id !== event.target.value));

    // Contact should always be at least 1
    if (remainState.length < 1) {
      return 
    } else {
      setContact(remainState);
    }
  }

  const ContactFields = contacts.map((contact) => {
    return (<ContactField key={contact.id} assignId={contact.id} label={contact.label} removeFieldFunc={handleRemoveField}/>)
    
  });

  const handleContactValueChange = function (event) {
    setNewContact(event.target.value)
  }

  const handleAddNewContact = function (event) {
    if (event.target.value.length < 1) {
      return
    }

    if (event.keyCode === 13 || event.type === 'click' ) {
      const keyId = crypto.randomUUID();
      setContact([...contacts, {label:event.target.value, id:keyId}]);
      // Clear input field after adding new contact
      setNewContact('');
    }
  }

  return (
    <div className="contact-info info-grp">
      <h3>Contact</h3>
      <>{ContactFields}</>
      <label htmlFor="contact-adder">Add Contact Info</label>
      <input 
        type="text" 
        id="contact-adder"
        value={newContact}
        onChange={handleContactValueChange}
        onKeyDown={handleAddNewContact}
        placeholder="e.g. LinkedIn, E-mail, Github" />
      <button type="button" value={newContact} onClick={handleAddNewContact}>Add Contact</button>
    </div>
  )
}

export default ContactInfo