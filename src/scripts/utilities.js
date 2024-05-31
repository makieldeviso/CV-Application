const capitalizeString = function (string) {
  const stringArray = string.split(' ');
  const newStringArray = stringArray.map((string) => {
    return(
      `${string.slice(0,1).toUpperCase()}${string.slice(1).toLowerCase()}`
    )
  });

  return newStringArray.join(' ');
}

const defaultEmptyState = {
  basicInfo: {
    name: '',
    designation: '',
    address: '',
    competency: '',
  },

  contactsInfo: [],
  educationInfo: [],
  expertiseInfo: [],
  experienceInfo: [],
  referencesInfo: []
}


export {capitalizeString, defaultEmptyState}