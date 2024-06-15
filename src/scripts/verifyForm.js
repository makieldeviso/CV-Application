const findBlankEntry = function (obj) {

  if (!obj) return null

  const objKeys = Object.keys(obj);
  const blankEntry = objKeys.find(key => !obj[key]);

  return {
    key: blankEntry,
    keyId: obj.keyId
  };
}

const verifySubmission = function (formValues) {

    const {basicInfo, contactsInfo, educationInfo, expertiseInfo, experienceInfo, referencesInfo } = formValues;

    const valuesArray = [basicInfo, ...contactsInfo, ...educationInfo, ...expertiseInfo, ...experienceInfo, ...referencesInfo];

    const firstInstanceInvalid = valuesArray.find(info => {
      const valuesArr = Object.values(info)

      const hasEmptyString = valuesArr.includes('');
      const hasZeroValue = valuesArr.includes(0);

      if (hasEmptyString || hasZeroValue) return true
    });

    const invalidInfo = findBlankEntry(firstInstanceInvalid);

    let result = false;
    if (!invalidInfo) {
      // No invalid input field
      const slideBtn = document.querySelector('.slide-btn');
      slideBtn.click();
      result = true;

    } else {
      const idSelector = !invalidInfo ? undefined :`#${invalidInfo.key}-${invalidInfo.keyId}`;
      const invalidNode = document.querySelector(idSelector);
      invalidNode.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      result = false;

    }

    return result
}

export default verifySubmission