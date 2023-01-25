import { createSlice } from "@reduxjs/toolkit";
import { fetchWithTicketData } from "./ticketFormSlice";

const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        isError: false,
        isLoading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchWithTicketData.pending, (state, action) => {
            state.isError = false
            state.isLoading = true
        })
        builder.addCase(fetchWithTicketData.fulfilled, (state, action) => {
            if (action.payload.error){
                state.isError = true
                state.isLoading = false
            } else {
                state.isError = false
                state.isLoading = false
            }
        })
        
    }
})

export default appSlice.reducer