import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const ticketFormSlice = createSlice({
    name: 'ticketForm',
    initialState: {
        ticketData: {
            city_id_from: null,
            city_id_to: null,
            date_start: null,
            date_end: null
        }
    },
    reducers: {
        addToTicketDataInfo(state, action){
            state.ticketData[action.payload.key] = action.payload.data

            console.log(Object.values(state.ticketData))
        },
        swapCityesName(state, action){
            const city_id_from = state.ticketData.city_id_from;
            const city_id_to = state.ticketData.city_id_to;

            state.ticketData.city_id_from = city_id_to;
            state.ticketData.city_id_to = city_id_from
        }

        
    },
    extraReducers: {

    }
})
export const {addToTicketDataInfo, swapCityesName} = ticketFormSlice.actions

export default ticketFormSlice.reducer