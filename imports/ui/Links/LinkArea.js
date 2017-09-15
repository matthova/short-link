import React from 'react';

import PrivateHeader from '../helpers/PrivateHeader';
import Links from './Links';
import AddLink from './AddLink';
import LinkFilters from './LinkFilters';

export default () => (
  <div>
    <PrivateHeader title="Links" />
    <AddLink />
    <LinkFilters />
    <Links />
  </div>
);
