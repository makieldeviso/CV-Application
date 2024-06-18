const capitalizeString = function (string) {
  const stringArray = string.split(' ');
  const newStringArray = stringArray.map((string) => {
    return(
      `${string.slice(0,1).toUpperCase()}${string.slice(1).toLowerCase()}`
    )
  });

  return newStringArray.join(' ');
}

const calculateScale = function () {
  const screenSize = window.screen.width;
  
  const cvCont = document.querySelector('div.cv-cont');
  const cvTemplate = document.querySelector('div.cv-template');
  let scaleFactor = cvCont.clientWidth / (cvTemplate.clientWidth + 100);

  if (screenSize <= 320) {
    // min width of the app is 320px
    return
  }

  if (screenSize < 768) {
    // Note: Since smaller screen uses 0fr to animate change,
    // Use screenSize instead
    scaleFactor = screenSize / (cvTemplate.clientWidth + 100);
  } 

  if (scaleFactor > 1 ) { 
    cvTemplate.style.transform = `scale(1)`;
  } else {
    cvTemplate.style.transform = `scale(${scaleFactor})`;
  }
}

const getFileName = function (nameString) {
  const fakePathRegex =  /^C:\\fakepath\\/
  return nameString.replace(fakePathRegex, '');
}

export {capitalizeString, calculateScale, getFileName}