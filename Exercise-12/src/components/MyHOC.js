import React from 'react';

function MyHOC(WrappedComponent, props) {
  return (
    <div className="wrapper">
      <WrappedComponent name={props.name} />
    </div>
  )
}

export default MyHOC;
