import './FindTicketForm.css'
import Tooltip from './Tooltip/Tooltip';
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css';
import { useState } from 'react';
import {redirect} from 'react-router-dom'
 
function FindTicketForm({type}){
    let [cityArr, setCityArr] = useState([])
    let [target, setTarget] = useState(null)
    let [data, setData] = useState({id_city_from: null,id_city_to: null,date_start: null,date_end: null})

    redirect('/login')

    function clickDateInputHandler(event){
        new AirDatepicker(`#${event.target.id}`, {
            autoClose: true,
            visible: true,
            dateFormat: 'yyyy-MM-dd',
            onSelect({formattedDate}){
                event.target.id == 'thereInput' ? setData({...data, date_start: formattedDate}) : setData({...data, date_end: formattedDate})
            }
        })
    }

    function changeDateInputHandler(event){
        const valideKeysArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'];

        if(!valideKeysArr.includes(event.nativeEvent.data)){
            event.target.value = event.target.value.slice(0, -1)
        }
    }

    function changeRoadInputHandler(event){
        fetch( `https://netology-trainbooking.netoservices.ru/routes/cities?name=${event.target.value}`)
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

    function clickFindTicketButtonHandler (event){
        event.preventDefault()

        if (data.id_city_from !== null && data.id_city_to !== null){
            fetch(`https://netology-trainbooking.netoservices.ru/routes?from_city_id=${data.id_city_from}&to_city_id=${data.id_city_to}`)
                .then(response => response.json())
                .then(data => console.log('result', data))
        }
        
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
                            onChange={changeRoadInputHandler} />
                    </label>
                    <button className="swap_button"
                            onClick={swapButtonClickHandler}></button>
                    <label>
                        <input className='road-input'
                            id='toRoadInput'
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
                <button onClick={clickFindTicketButtonHandler} className="find-button">Найти билеты</button>
            </div>
            {cityArr.length > 0 && <Tooltip cityArr={cityArr} target={target} setCityArr={setCityArr} data={data} setData={setData}/>}
        </form>
    )
}
export default FindTicketForm