import { useState } from "react";
import PropTypes from 'prop-types'

const ContactField = function ({refObj, removeFieldFunc, changeValueFunc}) {
 
  return (
    <div className='contact-cont'>
      <label htmlFor={`label-${refObj.keyId}`}>Contact type:</label>
      <input
        type="text"
        data-role='label'
        data-key={refObj.keyId}
        id={`label-${refObj.keyId}`}
        name={`label-${refObj.keyId}`}
        placeholder="e.g. Phone, E-mail, LinkedIn"
        onChange={changeValueFunc}
        value={refObj.label}
      />

      <label htmlFor={`address-${refObj.keyId}`}>Contact address:</label>
      <input
        type="text"
        data-role='address'
        data-key={refObj.keyId}
        id={`address-${refObj.keyId}`}
        name={`address-${refObj.keyId}`}
        placeholder="e.g. +639159054014, placeholder@gmail.com"
        onChange={changeValueFunc}
        value={refObj.address}
      />

      <button className='remove-btn' type='button' onClick={removeFieldFunc} value={refObj.keyId}>x</button>
    </div>
  )
}

ContactField.propTypes = {
  refObj: PropTypes.shape({
    label: PropTypes.string,
    address: PropTypes.string,
    keyId: PropTypes.string,
  }),
  
  removeFieldFunc: PropTypes.func,
  changeValueFunc: PropTypes.func,
}

const ContactInfo = function () {
  const [contacts, setContacts] = useState([]);

  const handleRemoveField = function (event) {
    const remainState = contacts.filter((contact => contact.keyId !== event.target.value));
    setContacts(remainState);
  }

  const handleContactValueChange = function (event) {
    const inputRole = event.target.dataset.role;
    const contactForChange = contacts.find((contact) => contact.keyId === event.target.dataset.key);
    const contactAsIs = contacts.filter((contact) => contact.keyId !== event.target.dataset.key);

    // Change value of contact object
    contactForChange[inputRole] = event.target.value;
    setContacts([...contactAsIs, contactForChange])
  }
  
  const ContactFields = contacts.map((contact) => {
    return (
      <ContactField
        key={contact.keyId}
        refObj={contact}
        removeFieldFunc={handleRemoveField}
        changeValueFunc={handleContactValueChange}
      />
    )
  });

  const handleAddNewContact = function () {
    const keyId = crypto.randomUUID();
    setContacts([...contacts, {label:'', address:'', keyId:keyId}]);
  }

  return (
    <div className="contact-info info-grp">
      <h3>Contact</h3>
      <>{ContactFields}</>
      <button type="button" onClick={handleAddNewContact}>Add Contact</button>
    </div>
  )
}

export default ContactInfo