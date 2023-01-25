import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWithTicketData = createAsyncThunk(
    'ticketFormSlice/fetchWithTicketData',
    async (ticketData) => {
        let response
        let currentFetch = `https://netology-trainbooking.netoservices.ru/routes?`
        function getCurrentFetchAdress(ticketData){
            if(Object.keys(ticketData).includes('from_city_id')){
                currentFetch += `&from_city_id=${ticketData.from_city_id}`
            }
            if(Object.keys(ticketData).includes('to_city_id')){
                currentFetch += `&to_city_id=${ticketData.to_city_id}`
            }
            if(Object.keys(ticketData).includes('date_start')){
                currentFetch += `&date_start=${ticketData.date_start}`
            }
            if(Object.keys(ticketData).includes('date_end')){
                currentFetch += `&date_end=${ticketData.date_end}`
            }
            if(Object.keys(ticketData).includes('date_start_arrival')){
                currentFetch += `&date_start_arrival=${ticketData.date_start_arrival}`
            }
            if(Object.keys(ticketData).includes('date_end_arrival')){
                currentFetch += `&date_end_arrival=${ticketData.date_end_arrival}`
            }
            if(Object.keys(ticketData).includes('have_first_class')){
                currentFetch += `&have_first_class=${ticketData.have_first_class}`
            }
            if(Object.keys(ticketData).includes('have_second_class')){
                currentFetch += `&have_second_class=${ticketData.have_second_class}`
            }
            if(Object.keys(ticketData).includes('have_third_class')){
                currentFetch += `&have_third_class=${ticketData.have_third_class}`
            }
            if(Object.keys(ticketData).includes('have_fourth_class')){
                currentFetch += `&have_fourth_class=${ticketData.have_fourth_class}`
            }
            if(Object.keys(ticketData).includes('have_wifi')){
                currentFetch += `&have_wifi=${ticketData.have_wifi}`
            }
            if(Object.keys(ticketData).includes('have_air_conditioning')){
                currentFetch += `&have_air_conditioning=${ticketData.have_air_conditioning}`
            }
            if(Object.keys(ticketData).includes('have_express')){
                currentFetch += `&have_express=${ticketData.have_express}`
            }
            if(Object.keys(ticketData).includes('price_from')){
                currentFetch += `&price_from=${ticketData.price_from}`
            }
            if(Object.keys(ticketData).includes('price_to')){
                currentFetch += `&price_to=${ticketData.price_to}`
            }
            if(Object.keys(ticketData).includes('start_departure_hour_from')){
                currentFetch += `&start_departure_hour_from=${ticketData.start_departure_hour_from}`
            }
            if(Object.keys(ticketData).includes('start_departure_hour_to')){
                currentFetch += `&start_departure_hour_to=${ticketData.start_departure_hour_to}`
            }
            if(Object.keys(ticketData).includes('start_arrival_hour_from')){
                currentFetch += `&start_arrival_hour_from=${ticketData.start_arrival_hour_from}`
            }
            if(Object.keys(ticketData).includes('start_arrival_hour_to')){
                currentFetch += `&start_arrival_hour_to=${ticketData.start_arrival_hour_to}`
            }
            if(Object.keys(ticketData).includes('end_departure_hour_from')){
                currentFetch += `&end_departure_hour_from=${ticketData.end_departure_hour_from}`
            }
            if(Object.keys(ticketData).includes('end_departure_hour_to')){
                currentFetch += `&end_departure_hour_to=${ticketData.end_departure_hour_to}`
            }
            if(Object.keys(ticketData).includes('end_arrival_hour_from')){
                currentFetch += `&end_arrival_hour_from=${ticketData.end_arrival_hour_from}`
            }
            if(Object.keys(ticketData).includes('end_arrival_hour_to')){
                currentFetch += `&end_arrival_hour_to=${ticketData.end_arrival_hour_to}`
            }
            if(Object.keys(ticketData).includes('sort')){
                currentFetch += `&sort=${ticketData.sort}`
            }

            console.log(ticketData)
        }
        getCurrentFetchAdress(ticketData)

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
            city_name_from: '',
            city_name_to: '',
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