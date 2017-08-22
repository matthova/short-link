import React from 'react';
import { Route } from 'react-router-dom';

const ButtonToNavigate = ({ title, history }) =>
  (<button type="button" onClick={() => history.push('/')}>
    {title}
  </button>);

export default class Links extends React.Component {
  render() {
    return (
      <div>
        <p>Links</p>
        <Route render={props => <ButtonToNavigate {...props} title="Go back home" />} />
      </div>
    );
  }
}
