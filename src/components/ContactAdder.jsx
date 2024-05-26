import { useState } from "react";

const ContactAdder = function () {
  const [newContact, setNewContact] = useState(''); 

  const handleNewContact = function (event) {
    setNewContact(event.target.value);
  }

  const handleAddNewContact = function () {
    const contactGrp = document.querySelector('.contact-grp');

  }

  return (
    <>
      <input onChange={handleNewContact} type='text' placeholder="e.g. Phone, LinkedIn, E-mail"></input>
      <button onClick={handleAddNewContact} value={newContact}>Add Contact Info</button>
    </>
  )
}

const ContactField = function ({label, assignId, removeFieldFunc}) {
  const [inputValue, setInputValue] = useState('');

  const handleValueChange = (event) => {
    setInputValue(event.target.value);
  }

  const contactLabel = `${label.slice(0,1).toUpperCase()}${label.slice(1).toLowerCase()}:`;

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

  // 
  const handleContactValueChange = function (event) {
    setNewContact(event.target.value)
  }

  const handleAddNewContact = function (event) {
    const keyId = crypto.randomUUID();
    setContact([...contacts, {label:event.target.value, id:keyId}]);
  }

  return (
    <div className="contact-info info-grp">
      <h3>Contact</h3>
      <>{ContactFields}</>

      <input type="text" value={newContact} onChange={handleContactValueChange} />
      <button type="button" value={newContact} onClick={handleAddNewContact}>Add Contact</button>
      
      
    </div>
  )
}

export default ContactInfo