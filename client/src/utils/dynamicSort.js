function dynamicSort(property, sortOrder) {
  return (a, b) => {
    if(sortOrder === -1) {
      [b, a] = [a, b];
    }
    const type = typeof a[property];
    switch(type) {
      case 'number':
        return a[property] - b[property];
      case 'string':
        return (a[property].toLowerCase() < b[property].toLowerCase() ? -1 : a[property].toLowerCase() > b[property].toLowerCase() ? 1 : 0);
    }
    return a[property] - b[property];
  };
}

export default dynamicSort;
