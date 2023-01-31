import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWithTicketData = createAsyncThunk(
    'ticketFormSlice/fetchWithTicketData',
    async (ticketData) => {
        let response
        let currentFetch = `https://netology-trainbooking.netoservices.ru/routes?`
        
        Object.entries(ticketData).map(([key, value]) =>{
            if (value !== '' && value !== false){
                currentFetch += `&${key}=${value}`
            }
        })

        response = await fetch(currentFetch)

        const data = response.json()

        return data
    }
)


const ticketFormSlice = createSlice({
    name: 'ticketForm',
    initialState: {
        ticketData: {
            from_city_id: '',
            to_city_id: '',
            date_start: '',
            date_end: '',
            date_start_arrival: '',
            date_end_arrival: '',
            have_first_class: '',
            have_second_class: '',
            have_third_class: '',
            have_fourth_class: '',
            have_wifi: '',
            have_air_conditioning: '',
            have_express: '',
            price_from: 500,
            price_to: 4500,
            start_departure_hour_from: 0,
            start_departure_hour_to: 24,
            start_arrival_hour_from: 0,
            start_arrival_hour_to: 24,
            end_departure_hour_from: 0,
            end_departure_hour_to: 24,
            end_arrival_hour_from: 0,
            end_arrival_hour_to: 24,
            limit: 5,
            offset: '',
            sort: 'date'
        },
    },
    reducers: {
        addToTicketDataInfo(state, action){
            state.ticketData[action.payload.key] = action.payload.data

        },
        swapCityesName(state, action){
            const city_id_from = state.ticketData.city_id_from;
            const city_id_to = state.ticketData.city_id_to;
            const city_name_from = state.ticketData.city_name_from;
            const city_name_to = state.ticketData.city_name_to

            state.ticketData.city_id_from = city_id_to;
            state.ticketData.city_id_to = city_id_from
            state.ticketData.city_name_from = city_name_to
            state.ticketData.city_name_to = city_name_from
        }

        
    },
})
export const {addToTicketDataInfo, swapCityesName} = ticketFormSlice.actions

export default ticketFormSlice.reducer