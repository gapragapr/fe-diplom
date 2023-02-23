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
        data.departure.map(item => {
            item.coach.coachNumber = generateCoachNumber(1, 30)
            item.coach.food_price = Math.ceil((item.coach.top_price + item.coach.bottom_price) / 60)
            item.coach.air_conditioning_price = Math.ceil((item.coach.top_price + item.coach.bottom_price) / 80)
        })

        if (seatsData.arrival){
            response = await fetch(createFetchSettings('arrival'))
            data.arrival = await response.json()
            data.arrival.map(item => {
                item.coach.coachNumber = generateCoachNumber(1, 30)
                item.coach.food_price = Math.ceil((item.coach.top_price + item.coach.bottom_price) / 60)
                item.coach.air_conditioning_price = Math.ceil((item.coach.top_price + item.coach.bottom_price) / 80)
            })

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
        price: {
            departure: 0,
            arrival: 0
        },
        currentSeats: [],
        seatsStuff: [],
    },
    reducers: {
        setData(state, action){
            state[action.payload.key] = action.payload.data
        },
        setType(state, action){
            state.type[action.payload.key] = action.payload.data
        },
        setPrice(state, action){
            state.price[action.payload.key] += action.payload.price
        },
        setCurrentSeats(state, action){
            state.currentSeats.push({type: action.payload.type, trainType: action.payload.trainType, seat: action.payload.seatIndex, cardIndex: action.payload.cardIndex})
        },
        deleteCurrentSeat(state, action){
            state.currentSeats.splice(action.payload.index, 1)
        },
        setSeatsStuff(state, action){
            state.seatsStuff.push({type: action.payload.type, trainType: action.payload.trainType, stuffName: action.payload.stuffName, cardIndex: action.payload.cardIndex, passengerType: action.payload.passengerType})
        },
        deleteSeatStuff(state, action){
            state.seatsStuff.splice(action.payload.index, 1)
        },
        clearStore(state){
            state.seatsData = {};
            state.seatsFetchResponse = {};
            state.ticket = {};
            state.type = {departure: null, arrival: null};
            state.price = {departure: 0, arrival: 0};
            state.currentSeats = [];
            state.seatsStuff = []
        }
        
    },
    extraReducers: {
        [fetchCurrentTicket.fulfilled] : (state, action) => {
            state.seatsFetchResponse = action.payload
        }
    }
})

export const {setData, setType, setPrice, setCurrentSeats, deleteCurrentSeat, setSeatsStuff, deleteSeatStuff, clearStore} = currentTicketSlice.actions

export default currentTicketSlice.reducer