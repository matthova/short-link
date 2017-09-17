import React from 'react';

import PrivateHeader from '../helpers/PrivateHeader';
import Links from './Links';
import AddLink from './AddLink';
import LinkFilters from './LinkFilters';

export default () => (
  <div>
    <PrivateHeader title="Short Link" />
    <div className="page-content">
      <LinkFilters />
      <AddLink />
      <Links />
    </div>
  </div>
);
