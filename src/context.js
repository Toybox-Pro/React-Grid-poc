import React from 'react';

export default React.createContext({
    changeGridState: (city, guestId, accCode) => { },
    gridState: false,
    data: {city: '', guestId: '', accCode: ''}
  });