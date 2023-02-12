import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './RangeSlider.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToTicketDataInfo,fetchWithTicketData } from '../../../store/ticketFormSlice';
import { useState } from 'react';
import { useEffect } from 'react';

function RangeSliderPrice() {
    const dispatch = useDispatch()
    const ticketData = useSelector(state => state.ticketForm.ticketData)

    setTimeout(() => {
        try {
            const slider = document.querySelector('#slider')
            noUiSlider.create(slider, {
                start: [String(ticketData.price_from), String(ticketData.price_to)],
                connect: true,
                range: {
                    'min': 0,
                    'max': 4500
                },
                step: 250,
                tooltips: true,
                format: {
                    from : function (value){
                        return Number(value)
                    },
                    to: function (value) {
                        return value.toFixed(0)
                    },
                }
                
            });

            slider.noUiSlider.on('change', function(values){
                dispatch(addToTicketDataInfo({key: 'price_from', data: Number(values[0])}))
                dispatch(addToTicketDataInfo({key: 'price_to', data: Number(values[1])}))
            })
            

        } 
        catch (e){
            return
        }
    })
    return (
        <>
            <p className="range_input_tooltips">
                <span className="range_input_tooltip">от</span>
                <span className="range_input_tooltip">до</span>
            </p>
            <div id="slider"></div>
            <p className="range_input_tooltips price_tooltips">
                <span className="range_input_tooltip">7000</span>
            </p>
        </>
    )
}

export default RangeSliderPrice