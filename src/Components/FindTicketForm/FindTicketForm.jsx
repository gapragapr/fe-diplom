import Tooltip from './Tooltip/Tooltip';
import './FindTicketForm.css'
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fecthCityesForTooltip } from '../../store/tooltipSlice';
import { addToTicketDataInfo, swapCityesName, fetchWithTicketData} from '../../store/ticketFormSlice';
import { clearCityesStore } from '../../store/tooltipSlice';
import { useNavigate } from 'react-router';
 
function FindTicketForm({type}){
    let [target, setTarget] = useState(null)
    const dispatch = useDispatch()
    const cityArr = useSelector(state => state.cityesForTooltip.cityes)
    const ticketData = useSelector(state => state.ticketForm.ticketData)
    const navigate = useNavigate()

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
        if (cityArr.length > 0){
            event.target.id === 'fromRoadInput' ? dispatch(addToTicketDataInfo({key: 'from_city_id', data: cityArr[0]._id})) : dispatch(addToTicketDataInfo({key: 'to_city_id', data: cityArr[0]._id}))
            target.id === 'fromRoadInput' ? dispatch(addToTicketDataInfo({key: 'city_name_from', data: cityArr[0].name})) : dispatch(addToTicketDataInfo({key: 'city_name_to', data: cityArr[0].name}))
        }
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

        dispatch(fetchWithTicketData(ticketData))

        dispatch(clearCityesStore())
        navigate('/roads')
    }

    function formClassName(){
        return `find-ticket_form form-${type}`
    } 

    return(
        <form action="" id='ticketForm' className={formClassName()}>
            <div className="row-wrapper">
                <div className="find-ticket_row">
                    <p className='row_name'>Направление</p>
                    <div className="find-ticket_row_content">
                        <label>
                            <input className='road-input'
                                id='fromRoadInput'
                                type="text"
                                placeholder='Откуда'
                                onChange={changeRoadInputHandler} 
                                />
                        </label>
                        <label>
                            <input className='road-input'
                                id='toRoadInput'
                                type="text" 
                                placeholder='Куда'
                                onChange={changeRoadInputHandler}
                                />
                        </label>
                        {cityArr.length > 0 && <Tooltip cityArr={cityArr} target={target} />}
                        <button className="swap_button" onClick={swapButtonClickHandler}></button>
                    </div>
                </div>
                <div className="find-ticket_row">
                    <p className='row_name'>Дата</p>
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
            </div>
            <div className="find-button_container">
                <button 
                onClick={clickFindTicketButtonHandler} 
                className="find-button">Найти билеты</button>
            </div>
        </form>
    )
}
export default FindTicketForm