import { useDispatch, useSelector } from "react-redux"
import { setStep } from "../../../store/appSlice"
import { useNavigate } from "react-router"
import { changePayment } from "../../../store/currentTicketSlice"
import './PaymentCard.css'
import { useEffect } from "react"

function PaymentCard(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const paymentDetails = useSelector(state => state.currentTicket.paymentDetails)

    useEffect(() => {
        const currentPaymentMethod = document.getElementById('paymentType')

        dispatch(changePayment({key: 'paymentType', data: currentPaymentMethod.value}))
    })

    function changePaymentInputHandler(e, key){
        dispatch(changePayment({key: key, data: e.target.value}))
    }
    
    function changePaymentMethodHandler(e){
        dispatch(changePayment({key: 'paymentType', data: e.target.value}))
    }

    function getClassNameToNextButton(){
        const result = Object.values(paymentDetails).every(value => value !== null)

        if (result){
            return 'next_page active_button'
        } else {
            return 'next_page nonactive_button'
        }
    }

    function clickNextPageButtonHandler(event){
        if (event.target.classList.contains('nonactive_button')){
          return
        }
  
        event.preventDefault()
        navigate('/accept')
        dispatch(setStep({step: 3}))
      }

    return (
        <>
            <div className="payment_card">
                <div className="card_row name_row">
                    <span>Персональные данные</span>
                </div>
                <div className="card_row">
                    <div className="sub_row">
                        <div className="input_container">
                            <p className="input_name">Фамилия</p>
                            <label>
                                <input onChange={(e) => changePaymentInputHandler(e, 'surname')} className="name_input" type="text" />
                            </label>
                        </div>
                        <div className="input_container">
                            <p className="input_name">Имя</p>
                            <label>
                                <input onChange={(e) => changePaymentInputHandler(e, 'name')} className="name_input" type="text" />
                            </label>
                        </div>
                        <div className="input_container">
                            <p className="input_name">Отчество</p>
                            <label>
                                <input onChange={(e) => changePaymentInputHandler(e, 'fatherName')} className="name_input" type="text" />
                            </label>
                        </div>
                    </div>
                    <div className="sub_row">
                        <div className="input_container">
                            <p className="input_name">Контактный телефон</p>
                            <label>
                                <input onChange={(e) => changePaymentInputHandler(e, 'telNumber')} className="name_input" type="tel" />
                            </label>
                        </div>
                    </div>
                    <div className="sub_row">
                        <div className="input_container">
                            <p className="input_name">E-mail</p>
                            <label>
                                <input onChange={(e) => changePaymentInputHandler(e, 'email')} className="name_input" type="email" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="card_row name_row">
                    <span>Способ оплаты</span>
                    <div className="sub_row">
                        <select onChange={(e) => changePaymentMethodHandler(e)} id="paymentType">
                            <option>Онлайн</option>
                            <option>Наличными</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="button_container">
                <button className={getClassNameToNextButton()} onClick={(e) => clickNextPageButtonHandler(e)}>КУПИТЬ БИЛЕТЫ</button>
            </div>
        </>
    )
}

export default PaymentCard