function dynamicSort(property) {
  return (a, b) => {
    const type = typeof a[property];
    switch(type) {
      case 'number':
        return a[property] - b[property];
      case 'string':
        return (a[property].toLowerCase() < b[property].toLowerCase() ? -1 : a[property].toLowerCase() > b[property].toLowerCase() ? 1 : 0);
        break;
    }
    return a[property] - b[property];
  };
}

export default dynamicSort;
