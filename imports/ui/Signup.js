import React from 'react';

export default class Signup extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <p>Signup component here</p>
      </div>
    );
  }
}
