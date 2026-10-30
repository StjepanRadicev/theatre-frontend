const inititalState = {
    analytics: {
        performanceCount: 0,
        totalRevenue: 0,
        totalOrders: 0
    },
}


import React from 'react'

const adminReducer = (state = inititalState, action) => {
  switch (action.type) {
    case "FETCH_ANALYTICS":
        return {
            ...state,
            analytics: action.payload,
        }
        
    default:
        return state;
  }
}

export default adminReducer