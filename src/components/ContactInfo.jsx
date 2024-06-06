import { useState, useEffect } from "react";
import PropTypes from 'prop-types'

import CloseIcon from '@mdi/react';
import AddIcon from '@mdi/react';
import { mdiClose, mdiPlus } from '@mdi/js';

const ContactField = function ({refObj, removeFieldFunc, changeValueFunc, contactLength}) {
 
  return (
    <div className='input-fields'>
      <div className="contact-field input-field">
        <label htmlFor={`label-${refObj.keyId}`} className="label-contact-type">Contact type:</label>
        <input
          type="text"
          data-role='label'
          className="input-contact-type"
          data-key={refObj.keyId}
          id={`label-${refObj.keyId}`}
          name={`label-${refObj.keyId}`}
          placeholder="e.g. Phone, E-mail, LinkedIn"
          onChange={changeValueFunc}
          value={refObj.label}
        />
      </div>
      
      <div className="contact-field input-field">
      <label htmlFor={`address-${refObj.keyId}`} className="label-contact-add">Contact address:</label>
      <input
        type="text"
        data-role='address'
        className="input-contact-add"
        data-key={refObj.keyId}
        id={`address-${refObj.keyId}`}
        name={`address-${refObj.keyId}`}
        placeholder="e.g. +639159054014, placeholder@gmail.com"
        onChange={changeValueFunc}
        value={refObj.address}
      />
      </div>
      
      <button className='remove-btn' type='button' onClick={removeFieldFunc} value={refObj.keyId} disabled={contactLength <= 1}>
        <CloseIcon path={mdiClose} size={1}/>
      </button>
    </div>
  )
}

const ContactInfo = function ({saveStateFunc, savedFormValues}) {
  const [contacts, setContacts] = useState(savedFormValues);

  useEffect(() => {
    setContacts(savedFormValues)
  }, [savedFormValues])

  const handleRemoveField = function (event) {
    const remainState = contacts.filter((contact => contact.keyId !== event.target.value));

    setContacts(remainState);

    // Save deletion to Form component state
    saveStateFunc('contactsInfo', remainState);
  }

  const handleContactValueChange = function (event) {
    const inputRole = event.target.dataset.role;
    const contactForChange = contacts.find((contact) => contact.keyId === event.target.dataset.key);
    const contactAsIs = contacts.filter((contact) => contact.keyId !== event.target.dataset.key);

    // Change value of contact object
    contactForChange[inputRole] = event.target.value;
    const sortedByTimeAdded = [...contactAsIs, contactForChange].sort((a, b) => a.timeStamp - b.timeStamp);
    setContacts(sortedByTimeAdded);

    // Save to Form component state
    saveStateFunc('contactsInfo', sortedByTimeAdded);
  }
  
  const ContactFields = contacts.map((contact) => {
    return (
      <ContactField
        key={contact.keyId}
        refObj={contact}
        removeFieldFunc={handleRemoveField}
        changeValueFunc={handleContactValueChange}
        contactLength={contacts.length}
      />
    )
  });

  const handleAddNewContact = function () {
    const keyId = crypto.randomUUID();

    const newContact = {label:'', address:'', keyId:keyId, timeStamp: new Date().valueOf()};
    setContacts([...contacts, newContact]);
  }

  return (
    <div className="contact-info info-grp">
      <h3>Contact</h3>
      <>{ContactFields}</>
      <button className='add-info-btn' type="button" onClick={handleAddNewContact}>
        <AddIcon className='add-icon' path={mdiPlus}/>
        Add Contact
      </button>
    </div>
  )
}

const refObjPropTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  keyId: PropTypes.string,
  timeStamp: PropTypes.number
}

ContactField.propTypes = {
  refObj: PropTypes.shape(refObjPropTypes),
  removeFieldFunc: PropTypes.func,
  changeValueFunc: PropTypes.func,
  contactLength: PropTypes.number
}

ContactInfo.propTypes = {
  saveStateFunc: PropTypes.func,
  savedFormValues: PropTypes.array
}

export default ContactInfo