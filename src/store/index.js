import { configureStore } from "@reduxjs/toolkit"
import cityReducer from "./tooltipSlice"
import ticketReducer from './ticketFormSlice'
import roadsReducer from "./roadsSlice"
import appReducer from "./appSlice"

export default configureStore({
    reducer : {
        cityesForTooltip: cityReducer,
        ticketForm: ticketReducer,
        roadsFromServer: roadsReducer,
        appFundamentalState: appReducer 
    }
})