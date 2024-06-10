const storageName = 'CVApplicationByMakieldeviso';

const defaultEmptyState = {
  basicInfo: {
    name: '',
    designation: '',
    address: '',
    competency: '',
  },

  contactsInfo: [{
    label:'',
    address:'',
    keyId:crypto.randomUUID(),
    timeStamp:new Date().valueOf()
  }],
  educationInfo: [{
    yearGraduated:'',
    degree:'',
    school:'',
    keyId: crypto.randomUUID(),
    timeStamp: new Date().valueOf()
  }],
  expertiseInfo: [{
    skill: '',
    rating: 0,
    keyId: crypto.randomUUID(),
    timeStamp: new Date().valueOf()
  }],
  experienceInfo: [{
      start: '',
      end: '',
      company: '',
      companyAddress: '',
      position: '',
      desc:'',
      keyId: crypto.randomUUID(),
      timeStamp: new Date().valueOf()
  }],
  referencesInfo: [
    {
      name: '',
      position: '', 
      company: '',
      phone: '',
      keyId: 'reference-1',
      timeStamp: 1
    },
    {
      name: '',
      position: '', 
      company: '',
      phone: '',
      keyId: 'reference-2',
      timeStamp: 2
    }
  ],
  submitOnce: false
}

const setLocalStorageFormValues = async function (formValues) {
  const localStorageCurrent = await JSON.parse(localStorage.getItem(storageName));
  localStorage.setItem(storageName, JSON.stringify({...localStorageCurrent, formValues: formValues})); 
} 

const setLocalStorageSubmittedValues = async function (submittedValues) {
  const localStorageCurrent = await JSON.parse(localStorage.getItem(storageName));
  localStorage.setItem(storageName, JSON.stringify({...localStorageCurrent, submittedValues: submittedValues}));
}

const getLocalStorageFormValues = function () {
  // Note: req parameter is string value of property name. e.g. 'basicInfo'
  const savedValues = JSON.parse(localStorage.getItem(storageName));
  
  if (savedValues) {
    return Object.hasOwn(savedValues, 'formValues')? savedValues.formValues : defaultEmptyState;
  } else {
    return defaultEmptyState;
  }
  
}

const getLocalStorageSubmittedValues = function () {
  const savedValues = JSON.parse(localStorage.getItem(storageName));

  if (savedValues) {
    return Object.hasOwn(savedValues, 'submittedValues') ? savedValues.submittedValues : defaultEmptyState;
  } else {
    return defaultEmptyState;
  }

}

export {
  defaultEmptyState,
  setLocalStorageFormValues,
  setLocalStorageSubmittedValues,
  getLocalStorageSubmittedValues,
  getLocalStorageFormValues,
}