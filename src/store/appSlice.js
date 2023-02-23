import { createSlice } from "@reduxjs/toolkit";
import { fetchWithTicketData } from "./ticketFormSlice";

const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        step: 0,
        isError: false,
        isLoading: false
    },
    reducers: {
        setStep(state, action){
            state.step = action.payload.step
        }
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

export const { setStep } = appSlice.actions

export default appSlice.reducer