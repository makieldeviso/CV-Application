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

  if (screenSize > 1023) return

  const cvCont = document.querySelector('div.cv-cont');
  const cvTemplate = document.querySelector('div.cv-template');
  const scaleFactor = screenSize / 820;

  cvTemplate.style.transform = `scale(${scaleFactor})`;
  // templateViewer.style.gridTemplateRows = `${templateViewerHeight * 0.8}px max-content`;

}



export {capitalizeString, calculateScale}