const inititalState = {
    analytics: {
        performanceCount: 0,
        totalRevenue: 0,
        totalOrders: 0
    },
    monthlyRevenue: [],
    showOccupancy: [],
    monthlySoldTickets: [],
};


import React from 'react'

const adminReducer = (state = inititalState, action) => {
  switch (action.type) {
    case "FETCH_ANALYTICS":
        return {
            ...state,
            analytics: action.payload,
        }
        
    
    case "FETCH_MONTHLY_REVENUE":
        return {
            ...state,
            monthlyRevenue: action.payload,
        };

    case "FETCH_SHOW_OCCUPANCY":
        return {
            ...state,
            showOccupancy: action.payload
        };

    case "FETCH_MONTHLY_SOLD_TICKETS":
        return {
            ...state,
            monthlySoldTickets: action.payload
        };

    default:
        return state;
  }
}

export default adminReducer