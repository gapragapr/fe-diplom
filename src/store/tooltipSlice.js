import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fecthCityesForTooltip = createAsyncThunk(
    'cityesForTooltip',
    async (cityName) => {
        const response = await fetch(`https://netology-trainbooking.netoservices.ru/routes/cities?name=${cityName}`)

        const data = await response.json()

        return data
    }
)

const cityesForTooltip = createSlice({
    name: 'cityesForTooltip',
    initialState: {
        cityes: [],
    },
    reducers: {
        clearCityesStore(state, action){
            state.cityes = []
        },

    },
    extraReducers: {
        [fecthCityesForTooltip.fulfilled] : (state, action) => {
            state.cityes = action.payload
        },
    }
})

export const {clearCityesStore} = cityesForTooltip.actions

export default cityesForTooltip.reducer