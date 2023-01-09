import './FindTicketForm.css'
import Tooltip from './Tooltip/Tooltip';
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fecthCityesForTooltip } from '../../store/tooltipSlice';
import { addToTicketDataInfo, swapCityesName } from '../../store/ticketFormSlice';
 
function FindTicketForm({type}){
    let [target, setTarget] = useState(null)
    const dispatch = useDispatch()
    const cityArr = useSelector(state => state.cityesForTooltip.cityes)

    function clickDateInputHandler(event){
        new AirDatepicker(`#${event.target.id}`, {
            autoClose: true,
            visible: true,
            dateFormat: 'dd.MM.yyyy',
            onSelect({formattedDate}){
                const serverDate = formattedDate.split(".").reverse().join("-");

                event.target.id === 'thereInput' ? dispatch(addToTicketDataInfo({key: 'date_start', data: serverDate})) : dispatch(addToTicketDataInfo({key: 'date_end', data: serverDate}))
            }
        })
    }


    function changeRoadInputHandler(event){
        dispatch(fecthCityesForTooltip(event.target.value))

        setTarget(event.target)
    }

    function swapButtonClickHandler(e){
        const roadInputs = Array.from(document.querySelectorAll('.road-input'));

        const roadInputOneValue = roadInputs[0].value;
        const roadInputTwoValue = roadInputs[1].value;

        roadInputs[0].value = roadInputTwoValue;
        roadInputs[1].value = roadInputOneValue;

        dispatch(swapCityesName())

        e.preventDefault()
    }

    function clickFindTicketButtonHandler (event){
        event.preventDefault()
        
    }

    return(
        <form action="" id='ticketForm' className="find-ticket_form">
            <div className="find-ticket_row">
                <p>Направление</p>
                <div className="find-ticket_row_content">
                    <label>
                        <input className='road-input'
                            id='fromRoadInput'
                            type="text"
                            placeholder='Откуда'
                            onChange={changeRoadInputHandler} 
                            />
                    </label>
                    <button className="swap_button"
                            onClick={swapButtonClickHandler}></button>
                    <label>
                        <input className='road-input'
                            id='toRoadInput'
                            type="text" 
                            placeholder='Куда'
                            onChange={changeRoadInputHandler}
                            />
                    </label>
                </div>
            </div>
            <div className="find-ticket_row">
                <p>Дата</p>
                <div className="find-ticket_row_content">
                    <label>
                        <input id='thereInput'
                            className='date-input' 
                            type="text" 
                            placeholder='ДД/ММ/ГГ'
                            onClick={clickDateInputHandler}
                            readOnly
                            />
                    </label>
                    <label>
                        <input id='backInput'
                            className='date-input' 
                            type="text" 
                            placeholder='ДД/ММ/ГГ'
                            onClick={clickDateInputHandler}
                            readOnly
                            />
                    </label>
                </div>
            </div>
            <div className="find-button_container">
                <button 
                onClick={clickFindTicketButtonHandler} 
                className="find-button">Найти билеты</button>
            </div>
            {cityArr.length > 0 && <Tooltip cityArr={cityArr} target={target} />}
        </form>
    )
}
export default FindTicketForm