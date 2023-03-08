import Ticket from "../../TicketList/Ticket/Ticket"
import { useDispatch, useSelector } from "react-redux"
import svgs from "../../../data/svg"
import './AcceptItems.css'
import { useEffect } from "react"
import { useNavigate } from "react-router"

function AcceptItems(){
    const navigate = useNavigate()
    const ticket = useSelector(state => state.currentTicket.ticket)
    const passengers = useSelector(state => state.currentTicket.passengers)
    const paymentDetails = useSelector(state => state.currentTicket.paymentDetails)
    const price = useSelector(state => state.currentTicket.price)

    function clickChangeButtonHandler(path){
        navigate(path)
    }
    function clickNextPageButton(){
        navigate('/ty')
    }

    return(
        <>
            <div className="accept_card">
                <p className="card_name">Поезд</p>
                <Ticket clickCallBack={clickChangeButtonHandler} isChange={true} ticket={ticket} />
            </div>
            <div className="accept_card accept_passenger">
                <p className="card_name">Пассажиры</p>
                <div className="card_content">
                    <div className="content_column">
                        {passengers.map(item => {
                            return <div className="passenger">
                                <div className="passenger_column">
                                    {svgs.circlePassenger}
                                    <p className="passenger_name">{item.passengerType == 'adult' ? 'Взрослый' : 'Ребенок'}</p>
                                </div>
                                <div className="passenger_column">
                                    <p className="passenger_name">{item.surname} {item.name} {item.fatherName}</p>
                                    <p className="passenger_gender passenger_details">Пол {item.gender == 'male' ? 'мужской' : 'женский'}</p>
                                    <p className="passenger_bd passenger_details">День рождения {item.bd}</p>
                                    <p className="passenger_doc passenger_details">{item.docType} {item.docDetails}</p>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="content_column bottom_column">
                        <p className="total_price">Всего <span>{price.departure + price.arrival}</span>{svgs.ruble}</p>
                        <button onClick={() => clickChangeButtonHandler('/passengers')} className="change_button">Изменить</button>
                    </div>
                </div>
            </div>
            <div className="accept_card">
                <p className="card_name">Способ оплаты</p>
                <div className="card_content">
                    <p className="payment_type">{paymentDetails.paymentType}</p>
                    <button onClick={() => clickChangeButtonHandler('/payment')} className="change_button">Изменить</button>
                </div>
            </div>
            <div className="button_container">
                <button onClick={clickNextPageButton} className="next_page active_button">Подтвердить</button>
            </div>
        </>
    )
}

export default AcceptItems