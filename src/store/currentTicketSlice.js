import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentTicket = createAsyncThunk(
    'currentTicketSlice/fetchCurrentTicket',
    async (seatsData) => {
        let response;
        let data = {}
        const coachNumbers = new Set()

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
        data.departure.map(item => item.coach.coachNumber = generateCoachNumber(0, 30))

        if (seatsData.arrival){
            response = await fetch(createFetchSettings('arrival'))
            data.arrival = await response.json()
            data.arrival.map(item => item.coach.coachNumber = generateCoachNumber(0, 30))
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
        type: null
    },
    reducers: {
        setTicketData(state, action){
            state.seatsData = action.payload
        },
        setTicket(state, action){
            state.ticket = action.payload
        },
        setType(state, action){
            state.type = action.payload.type
        }
    },
    extraReducers: {
        [fetchCurrentTicket.fulfilled] : (state, action) => {
            state.seatsFetchResponse = action.payload
        }
    }
})

export const {setTicketData, setTicket, setType} = currentTicketSlice.actions

export default currentTicketSlice.reducer