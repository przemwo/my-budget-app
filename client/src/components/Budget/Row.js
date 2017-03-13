import React from 'react';

const Row = (props) => {
  let { index, incoming: { category, expected, actual, description } } = props;
  expected = parseInt(expected);
  actual = parseInt(actual);
  const difference = (actual - expected);
  const percentage = Math.round(actual / expected * 100);
  let classNamePercentage = '';
  if(percentage < 75) {
    classNamePercentage = 'label label-danger';
  } else if(percentage < 90) {
    classNamePercentage = 'label label-warning';
  } else if(percentage < 110) {
    classNamePercentage = '';
  } else {
    classNamePercentage = 'label label-success';
  }
  return(
    <tr>
      <td>{index + 1}</td>
      <td>{category}</td>
      <td>{expected}</td>
      <td>{actual}</td>
      <td>{description}</td>
      <td>{difference}</td>
      <td><span className={classNamePercentage}>{Math.round(actual / expected * 100)}%</span></td>
    </tr>
  );
};
export default Row;
