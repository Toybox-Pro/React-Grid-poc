import React from 'react';

export default React.createContext({
    changeGridState: (city, guestId, accCode, departureDate, arrivalDate, hotNumber) => { },
    gridState: false,
    data: {city: '', guestId: '', accCode: '', departureDate: '', arrivalDate: '', hotNumber: ''}
  });