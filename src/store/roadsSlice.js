import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWithTicketData } from "./ticketFormSlice";

export const fetchForLastTickets = createAsyncThunk(
    'roadsSlice/fetchForLastTickets',
    async () => {
        let response = await fetch('https://netology-trainbooking.netoservices.ru/routes/last')
        const data = response.json()
        return data
    }
)

const roadsSlice = createSlice({
    name: 'roadsSlice',
    initialState: {
        roadsArr: [],
        lastRoadsArr: []
    },
    reducers: {

    },
    extraReducers: {
        [fetchWithTicketData.fulfilled] : (state, action) => {
            state.roadsArr = action.payload.items
        },
        [fetchForLastTickets.fulfilled] : (state, action) => {
            state.lastRoadsArr = action.payload
        }
    }
})

export default roadsSlice.reducer