import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentTicket = createAsyncThunk(
    'currentTicketSlice/fetchCurrentTicket',
    async (seatsData) => {
        let response;
        let data = {}

        function createFetchSettings(type){
            let currentAdress = `https://netology-trainbooking.netoservices.ru/routes/${seatsData[type].id}/seats?`
            return currentAdress
        }
        function generateCoachNumber(min, max){
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand); 
        }

        response = await fetch(createFetchSettings('departure'))
        data.departure = await response.json()
        data.departure.map(item => item.coach.coachNumber = generateCoachNumber(1, 30))

        if (seatsData.arrival){
            response = await fetch(createFetchSettings('arrival'))
            data.arrival = await response.json()
            data.arrival.map(item => item.coach.coachNumber = generateCoachNumber(1, 30))
        }

        return data
    }
)

const currentTicketSlice = createSlice({
    name: 'currentTicketSlice',
    initialState: {
        seatsData: {},
        seatsFetchResponse: {},
        ticket: {},
        type: {
            departure: null,
            arrival: null
        },
        price: 0,
    },
    reducers: {
        setData(state, action){
            state[action.payload.key] = action.payload.data
        },
        setType(state, action){
            state.type[action.payload.key] = action.payload.data
        }
    },
    extraReducers: {
        [fetchCurrentTicket.fulfilled] : (state, action) => {
            state.seatsFetchResponse = action.payload
        }
    }
})

export const {setData, setType} = currentTicketSlice.actions

export default currentTicketSlice.reducer