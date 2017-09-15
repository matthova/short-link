import React from 'react';
import { Session } from 'meteor/session';

export default () => (
  <div>
    <label>
      <input
        type="checkbox"
        onChange={(e) => {
          Session.set('showVisible', e.target.checked);
        }}
      />
      Show Hidden Links
    </label>
  </div>
);
