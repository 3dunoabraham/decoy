import React from 'react';
import PropTypes from 'prop-types';

export default function Component({ title = null }) {
  return (
    <div className='flex-col'>
      {!!title && <div className='opaci-50 tx-ls-2 mb-4 tx-bold-3 tx-sm'>{title}</div>}
      <div className='flex-center gap-1 box-shadow-1 px-1 bord-r-25 py-1'>
        <div className='px-3 py-2 ims-bg-primary opaci-75 hover spin-4 bord-r-l-10'></div>
        <div className='px-3 py-2 ims-bg-primary opaci-50 hover spin-10'></div>
        <div className='px-3 py-2 ims-bg-primary opaci-25 hover spin-3 bord-r-r-10'></div>
      </div>
    </div>
  );
};