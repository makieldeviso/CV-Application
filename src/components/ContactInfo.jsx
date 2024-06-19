import { useState, useEffect } from "react";
import PropTypes from 'prop-types'

import { WarnIcon, CloseIcon, AddIcon } from "./Icons";
import { hideFormNav } from "../scripts/utilities";

const ContactField = function ({refObj, handleRemoveField, handleContactValueChange, contactLength, submitOnce}) {
 
  return (
    <div className='input-fields'>
      <div className="contact-field input-field">
        <label htmlFor={`label-${refObj.keyId}`} className="label-contact-type">
          Contact type:
          {submitOnce && refObj.label.length === 0 && <WarnIcon/>}
        </label>
        <input
          type="text"
          data-role='label'
          className="input-contact-type"
          data-key={refObj.keyId}
          id={`label-${refObj.keyId}`}
          name={`label-${refObj.keyId}`}
          placeholder="e.g. Phone, E-mail, LinkedIn"
          onChange={handleContactValueChange}
          onFocus = {hideFormNav}
          value={refObj.label}
          aria-invalid = {`${submitOnce && refObj.label.length === 0 ? 'true' : 'false'}`}
        />
      </div>
      
      <div className="contact-field input-field">
      <label htmlFor={`address-${refObj.keyId}`} className="label-contact-add">
        Contact address:
        {submitOnce && refObj.address.length === 0 && <WarnIcon/>}
      </label>
      <input
        type="text"
        data-role='address'
        className="input-contact-add"
        data-key={refObj.keyId}
        id={`address-${refObj.keyId}`}
        name={`address-${refObj.keyId}`}
        placeholder="e.g. +639123456789, email.address@email.com"
        onChange={handleContactValueChange}
        onFocus = {hideFormNav}
        value={refObj.address}
        aria-invalid = {`${submitOnce && refObj.address.length === 0 ? 'true' : 'false'}`}
      />
      </div>
      
      <button 
        className='remove-btn' type='button' 
        onClick={handleRemoveField} value={refObj.keyId} disabled={contactLength <= 1}
        aria-label='Remove contact information' 
      >
        <CloseIcon/>
      </button>
    </div>
  )
}

const ContactInfo = function ({handleSaveFormValues, savedFormValues, submitOnce}) {
  const [contacts, setContacts] = useState(savedFormValues);

  useEffect(() => {
    setContacts(savedFormValues)
  }, [savedFormValues, submitOnce])

  const handleRemoveField = function (event) {
    const remainState = contacts.filter((contact => contact.keyId !== event.target.value));

    setContacts(remainState);

    // Save deletion to Form component state
    handleSaveFormValues('contactsInfo', remainState);
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
    handleSaveFormValues('contactsInfo', sortedByTimeAdded);
  }
  
  const ContactFields = contacts.map((contact) => {
    return (
      <ContactField
        key={contact.keyId}
        refObj={contact}
        handleRemoveField={handleRemoveField}
        handleContactValueChange={handleContactValueChange}
        contactLength={contacts.length}
        submitOnce={submitOnce}
      />
    )
  });

  const handleAddNewContact = function () {
    const keyId = crypto.randomUUID();

    const newContact = {label:'', address:'', keyId:keyId, timeStamp: new Date().valueOf()};
    setContacts([...contacts, newContact]);
  }

  return (
    <div className="contact-info info-grp" id='form-contact'>
      <h3>Contact</h3>
      <>{ContactFields}</>
      <button className='add-info-btn' type="button" onClick={handleAddNewContact}>
        <AddIcon/>
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
  handleRemoveField: PropTypes.func,
  handleContactValueChange: PropTypes.func,
  contactLength: PropTypes.number,
  submitOnce: PropTypes.bool
}

ContactInfo.propTypes = {
  handleSaveFormValues: PropTypes.func,
  savedFormValues: PropTypes.array,
  submitOnce: PropTypes.bool
}

export default ContactInfo