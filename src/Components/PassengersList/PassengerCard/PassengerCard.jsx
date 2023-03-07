import svgs from '../../../data/svg'
import './PassengerCard.css'
import errorImg from '../../../img/errorImg.png'
import validImg from '../../../img/validImg.png'

import { useDispatch, useSelector } from 'react-redux'
import { changePassenger, deletePassenger } from '../../../store/currentTicketSlice'
import { useEffect, useState } from 'react'

function PassengerCard({index, passenger}){
    const dispatch = useDispatch()
    const passengers = useSelector(state => state.currentTicket.passengers)
    const [nonValidDocDetails, setNonValidDocDetails] = useState(null)
    const [activeCard, setActiveCard] = useState(false)

    useEffect(() => {
        passenger.passengerType === 'adult' ? dispatch(changePassenger({index: index - 1, key: 'docType', data: 'Паспорт'})) : dispatch(changePassenger({index: index - 1, key: 'docType', data: 'Свидетельство о рождении'}))
    })

    function changePassengerTypeHandler(e){
        e.target.value === 'Взрослый' ? dispatch(changePassenger({index: index - 1, key: 'passengerType', data: 'adult'})) : dispatch(changePassenger({index: index - 1, key: 'passengerType', data: 'child'}))
        e.target.value === 'Взрослый' ? dispatch(changePassenger({index: index - 1, key: 'seatPrice', data: Math.floor(passenger.seatPrice * 2)})) : dispatch(changePassenger({index: index - 1, key: 'seatPrice', data: Math.floor(passenger.seatPrice / 2)}))
    }
    function changePassengerDocTypeHandler(e){
        e.target.value === 'Паспорт РФ' ? dispatch(changePassenger({index: index - 1, key: 'passengerType', data: 'adult'})) : dispatch(changePassenger({index: index - 1, key: 'passengerType', data: 'child'}))
        e.target.value === 'Паспорт РФ' ? dispatch(changePassenger({index: index - 1, key: 'docType', data: 'Паспорт'})) : dispatch(changePassenger({index: index - 1, key: 'docType', data: 'Свидетельство о рождении'}))
        e.target.value === 'Паспорт РФ' ? dispatch(changePassenger({index: index - 1, key: 'seatPrice', data: Math.floor(passenger.seatPrice * 2)})) : dispatch(changePassenger({index: index - 1, key: 'seatPrice', data: Math.floor(passenger.seatPrice / 2)}))
    }
    function changePassengerName(e, key){
        dispatch(changePassenger({index: index - 1, key: key, data: e.target.value}))
    }
    function clickGenderButtonHandler(e, gender){
        e.preventDefault()
        if (document.querySelector('.active_gender_button')){
            document.querySelector('.active_gender_button').classList.remove('active_gender_button')
        }
        e.currentTarget.classList.add('active_gender_button')
        dispatch(changePassenger({index: index - 1, key: 'gender', data: gender}))
    }
    function changeBdInputHandler(e){
        let currentYear = new Date().getFullYear();
        function checkBirthdayValue(str, max) {
            if (str.charAt(0) !== '0' || str == '00') {
                let num = parseInt(str);
                if(isNaN(num) || num <= 0 || num > max) num = 1;
                if(num > parseInt(max.toString().charAt(0)) && num.toString().length == 1){
                    str = '0' + num;
                }else {
                    str = num.toString()
                }
            };
            return str;
        };
        
        let input = e.target.value;
        if (/\D\.$/.test(input)) input = input.substr(0, input.length - 3);
        let values = input.split('.').map(function(v) {
            return v.replace(/\D\./g, '')
        });
        if (values[0]) values[0] = checkBirthdayValue(values[0], 31); // day check
        if (values[1]) values[1] = checkBirthdayValue(values[1], 12); // month check
        if (values[1]) values[1] = checkBirthdayValue(values[1], currentYear); // year check
        let output = values.map(function(v, i) {
            return v.length == 2 && i < 2 ? v + '.' : v;
        });
        e.target.value = output.join('').substr(0, 10);
        if (e.target.value.length == 10){
            dispatch(changePassenger({index: index - 1, key: 'bd', data: e.target.value}))
        }

        
    }

    function changeDocDetailsHandler(e){
        function validatePassSer(value){
            if (value.match(/^\d{4}$/)) {
                return true;
            }
            else { return false; }
        }
        function validatePassNum(value){
            if (value.match(/^\d{6}$/)) {
                return true;
            }
            else { return false; }
        }
        function validateSvidNum(value){
            if (value.match(/^([IVX]{1,4})\s([А-Я]{2})\s(\d{6})$/)){
                return true
            } else { return false }
        } 

        switch(passenger.passengerType){
            case 'adult':
                const passSer = document.getElementById(`passSer${index}`)
                const passNum = document.getElementById(`passNum${index}`)

                let passSerValidateResult = validatePassSer(passSer.value)
                let passNumValidateResult = validatePassNum(passNum.value)

                if (passSerValidateResult && passNumValidateResult) {
                    setNonValidDocDetails(false)
                    dispatch(changePassenger({index: index - 1, key: 'docDetails', data: passSer.value + ' ' + passNum.value}))
                } else {
                    setNonValidDocDetails(true)
                }
                break;
            case 'child':
                const svidNum = document.getElementById(`svidNum${index}`)


                let svidNumValidateResult = validateSvidNum(svidNum.value);
                if (svidNumValidateResult) {
                    setNonValidDocDetails(false)
                    dispatch(changePassenger({index: index - 1, key: 'docDetails', data: svidNum.value}))
                } else {
                    setNonValidDocDetails(true)
                }
                break;
        }

    }

    function clickRowNameHandler(e){
        e.preventDefault()
        e.target.parentElement.classList.toggle('nonactive_passenger')
        e.target.parentElement.classList.contains('nonactive_passenger') ? setActiveCard(false) : setActiveCard(true)
    }
    // function clickNextPassengerButton(e){
    //     e.traget.parentElement.parentElement.classList.add('nonactive_passenger')
    //     e.traget.parentElement.parentElement.nextElementSibli.classList.add('nonactive_passenger')
    // }
    

    return(
        <div className="passenger_card nonactive_passenger">
            <div onClick={(e) => clickRowNameHandler(e)} className="card_row name_row">
                <div className='name_container'>
                    {activeCard ? svgs.circleMinus : svgs.circlePlus}
                    <span>Пассажир {index}</span>
                </div>
            </div>
            <div className="card_row">
                <div className="sub_row">
                    <select onChange={(e) => changePassengerTypeHandler(e)}>
                        <option selected={passenger.passengerType === 'adult'} defaultValue="Взрослый">Взрослый</option>
                        <option selected={passenger.passengerType !== 'adult'} defaultValue="Ребенок">Ребенок</option>
                    </select>
                </div>
                <div className="sub_row">
                    <div className="input_container">
                        <p className="input_name">Фамилия</p>
                        <label>
                            <input className='name_input' onChange={(e) => changePassengerName(e, 'surname')} type="text" />
                        </label>
                    </div>
                    <div className="input_container">
                        <p className="input_name">Имя</p>
                        <label>
                            <input className='name_input' onChange={(e) => changePassengerName(e, 'name')} type="text" />
                        </label>
                    </div>
                    <div className="input_container">
                        <p className="input_name">Отчество</p>
                        <label>
                            <input className='name_input' onChange={(e) => changePassengerName(e, 'fatherName')} type="text" />
                        </label>
                    </div>
                </div>
                <div className="sub_row sub_row_left">
                    <div className="input_container">
                        <p className="input_name">Пол</p>
                        <div className="gender_buttons">
                            <button onClick={(e) => clickGenderButtonHandler(e, 'male')} className="gender_button">м</button>
                            <button onClick={(e) => clickGenderButtonHandler(e, 'female')} className="gender_button">ж</button>
                        </div>
                    </div>
                    <div className="input_container">
                        <p className="input_name">Дата рождения</p>
                        <label>
                            <input type="text" onChange={(e) => changeBdInputHandler(e)} className='bd_input' placeholder='ДД/ММ/ГГ'/>
                        </label>
                    </div>
                </div>
                <div className="sub_row">
                    <div className="input_container">
                        <label>
                            <input id='accesAbility' type="checkbox" />
                        </label>
                        <span>ограниченная подвижность</span>
                    </div>
                </div>
            </div>
            <div className="card_row">  
                <div className="docs_container">
                    <div className="input_container">
                        <p className="input_name">Тип документа</p>
                        <select id="docs" onChange={(e) => changePassengerDocTypeHandler(e)}>
                            <option selected={passenger.passengerType === 'adult'} defaultValue="Паспорт">Паспорт РФ</option>
                            <option selected={passenger.passengerType !== 'adult'} defaultValue="Свидетельство">Свидетельство о рождении</option>
                        </select>
                    </div>
                    
                    {passenger.docType == 'Паспорт' && 
                        <>
                            <div className="input_container">
                                <p className="input_name">Серия</p>
                                <label>
                                    <input onChange={(e) => changeDocDetailsHandler(e)}  id={`passSer${index}`} type="text" />
                                </label>
                            </div>
                            <div className="input_container">
                                <p className="input_name">Номер</p>
                                <label>
                                    <input onChange={(e) => changeDocDetailsHandler(e)}  id={`passNum${index}`} type="text" />
                                </label>
                            </div>
                        </>
                    }
                    {passenger.docType == 'Свидетельство о рождении' && 
                        <div className="input_container">
                            <p className="input_name">Номер</p>
                            <label>
                                <input onChange={(e) => changeDocDetailsHandler(e)} id={`svidNum${index}`} type="text" />
                            </label>
                        </div>
                    }
                </div>
            </div>
            
            {nonValidDocDetails !== null && 
                <div className="card_row next_passenger">
                    {nonValidDocDetails && passenger.docType == 'Свидетельство о рождении' && 
                        <div className="nonvalid_message">
                            <img src={errorImg} alt="" />
                            <div className="nonvalid_text">
                                <p>Номер свидетельства о рожденни указан некорректно</p>
                                <p>Пример: <span className="nonvalid_example">VIII ЫП 123456</span></p>
                            </div>
                        </div> 
                    } 
                    {nonValidDocDetails && passenger.docType == 'Паспорт' && 
                        <div className="nonvalid_message">
                            <img src={errorImg} alt="" />
                            <div className="nonvalid_text">
                                <p>Номер или серия поспорта указаны некорректно</p>
                                <p>Пример: <span className="nonvalid_example">4204  380694</span></p>
                            </div>
                        </div> 
                    }
                    {!nonValidDocDetails && 
                        <div className="valid_message">
                            <div className="nonvalid_text">
                                <p><img src={validImg} alt="" /> Готово</p>
                            </div>
                            {passengers.length > 1 && <button className='next_passenger_button'>Следующий пассажир</button>}
                        </div> 
                    }
                </div>
            }
        </div>
    )
}

export default PassengerCard