const capitalizeString = function (string) {
  const stringArray = string.split(' ');
  const newStringArray = stringArray.map((string) => {
    return(
      `${string.slice(0,1).toUpperCase()}${string.slice(1).toLowerCase()}`
    )
  });

  return newStringArray.join(' ');
}

export {capitalizeString}