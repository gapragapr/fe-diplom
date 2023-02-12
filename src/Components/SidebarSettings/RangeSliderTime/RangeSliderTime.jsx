import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './RangeSliderTime.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToTicketDataInfo, fetchWithTicketData } from '../../../store/ticketFormSlice';
import { useState } from 'react';

function RangeSliderTime({id, settingsName}) {
    const dispatch = useDispatch()
    const ticketData = useSelector(state => state.ticketForm.ticketData)
    const [needFetch, setNeedFetch] = useState(false)

    if (needFetch){
        dispatch(fetchWithTicketData(ticketData))
    }
    
    setTimeout(() => {
        try{
            const slider = document.querySelector(`#${id}`)
            
            noUiSlider.create(slider, {
                start: [ticketData[settingsName[0]], ticketData[settingsName[1]]],
                connect: true,
                range: {
                    'min': 0.00,
                    'max': 24.00
                },
                step: 1.00,
                tooltips: true,
                format: {
                    from : function (value){
                        return Number(value)
                    },
                    to: function (value) {
                        return value.toFixed(2).replace('.', ':')
                    },
                }
            })

            slider.noUiSlider.on('change', function(values){
                dispatch(addToTicketDataInfo({key: settingsName[0], data: Number(values[0].replace(':', '.'))}))
                dispatch(addToTicketDataInfo({key: settingsName[1], data: Number(values[1].replace(':', '.'))}))
                setNeedFetch(true)     
                console.log(needFetch)
            })
        } catch (e){
            return
        }
    })

    return(
        <>  
            <div id={id}></div>
            <p className="range_input_tooltips price_tooltips">
                <span className="range_input_tooltip">24:00</span>
            </p>
        </>
    )
    
};

export default RangeSliderTime