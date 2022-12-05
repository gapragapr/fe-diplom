import './FindTicketForm.css'
import Tooltip from './Tooltip/Tooltip';
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css';
import { useState } from 'react';

function FindTicketForm({type}){
    let [cityArr, setCityArr] = useState([])
    let [target, setTarget] = useState(null)

    function clickDateInputHandler(event){
        new AirDatepicker(`#${event.target.id}`, {
            autoClose: true,
            visible: true,
        })
    }

    function changeDateInputHandler(event){
        const valideKeysArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

        if(!valideKeysArr.includes(event.nativeEvent.data)){
            event.target.value = event.target.value.slice(0, -1)
        }
    }

    function changeRoadInputHandler(event){
        const controller = new AbortController()
        const signal = controller.signal;

        fetch( `https://netology-trainbooking.netoservices.ru/routes/cities?name=${event.target.value}`, {signal} )
            .then( response => response.json())
            .then( data => setCityArr(data))

        setTarget(event.target)
    }

    function swapButtonClickHandler(e){
        const roadInputs = Array.from(document.querySelectorAll('.road-input'));

        const roadInputOneValue = roadInputs[0].value;
        const roadInputTwoValue = roadInputs[1].value;

        roadInputs[0].value = roadInputTwoValue;
        roadInputs[1].value = roadInputOneValue;

        e.preventDefault()
    }

    return(
        <form action="" className="find-ticket_form">
            <div className="find-ticket_row">
                <p>Направление</p>
                <div className="find-ticket_row_content">
                    <label>
                        <input className='road-input'
                             type="text"
                             placeholder='Откуда'
                             onChange={changeRoadInputHandler} />
                    </label>
                    <button className="swap_button"
                            onClick={swapButtonClickHandler}></button>
                    <label>
                        <input className='road-input'
                                type="text" 
                                placeholder='Куда'
                                onChange={changeRoadInputHandler}/>
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
                            onChange={changeDateInputHandler}/>
                    </label>
                    <label>
                        <input id='backInput'
                            className='date-input' 
                            type="text" 
                            placeholder='ДД/ММ/ГГ'
                            onClick={clickDateInputHandler}
                            onChange={changeDateInputHandler}/>
                    </label>
                </div>
            </div>
            <div className="find-button_container">
                <button className="find-button">Найти билеты</button>
            </div>
            {cityArr.length > 0 && <Tooltip cityArr={cityArr} target={target} setCityArr={setCityArr}/>}
        </form>
    )
}
export default FindTicketForm