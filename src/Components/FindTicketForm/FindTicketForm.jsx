import DateInput from './DateInput/DateInput';
import Tooltip from './Tooltip/Tooltip';
import './FindTicketForm.css'
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


    function changeRoadInputHandler(event){
        clearTimeout()
        dispatch(fecthCityesForTooltip(event.target.value))
        if (cityArr.length > 0){
            setTimeout(() => {
                event.target.id === 'fromRoadInput' ? dispatch(addToTicketDataInfo({key: 'from_city_id', data: cityArr[0]._id})) : dispatch(addToTicketDataInfo({key: 'to_city_id', data: cityArr[0]._id}))
            }, 500)
        }
        setTarget(event.target)
    }

    function clickRoadInputHandler(event){
        event.target.id === 'fromRoadInput' ? dispatch(addToTicketDataInfo({key: 'from_city_id', data: ''})) : dispatch(addToTicketDataInfo({key: 'to_city_id', data: ''}))
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
        if (ticketData.from_city_id == '' || ticketData.to_city_id == '') {return}

        
        dispatch(clearCityesStore())
        navigate('/roads')
        dispatch(fetchWithTicketData(ticketData))
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
                                onClick={clickRoadInputHandler}
                                onChange={changeRoadInputHandler} 
                                />
                        </label>
                        <label>
                            <input className='road-input'
                                id='toRoadInput'
                                type="text" 
                                placeholder='Куда'
                                onClick={clickRoadInputHandler}
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
                        <DateInput id={'date_start'} type={'date_start'}/>
                        <DateInput id={'date_end'} type={'date_end'}/>
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