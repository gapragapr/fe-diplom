import { configureStore } from "@reduxjs/toolkit"
import  cityReducer from "./tooltipSlice"
import ticketReducer from './ticketFormSlice'

export default configureStore({
    reducer : {
        cityesForTooltip: cityReducer,
        ticketForm: ticketReducer
    }
})