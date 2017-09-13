import React from 'react';

import PrivateHeader from '../helpers/PrivateHeader';
import Links from './Links';
import AddLink from './AddLink';

export default () => (
  <div>
    <PrivateHeader title="Links" />
    <Links />
    <AddLink />
  </div>
);
