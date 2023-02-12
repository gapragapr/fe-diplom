import { configureStore } from "@reduxjs/toolkit"
import cityReducer from "./tooltipSlice"
import ticketReducer from './ticketFormSlice'
import roadsReducer from "./roadsSlice"
import appReducer from "./appSlice"
import currentTicketReducer from "./currentTicketSlice"

export default configureStore({
    reducer : {
        cityesForTooltip: cityReducer,
        ticketForm: ticketReducer,
        roadsFromServer: roadsReducer,
        appFundamentalState: appReducer,
        currentTicket: currentTicketReducer 
    }
})