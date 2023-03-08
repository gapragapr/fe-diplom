import trainLogo from '../../../img/Group 9.png'
import ticketArrow from '../../../img/Arrow.png'
import ruble from '../../../img/Vector (7).png'
import arrowTo from '../../../img/Vector (8).png'
import arrowFrom from '../../../img/Vector (9).png'
import moment from 'moment/moment'
import { useDispatch } from 'react-redux'
import { setData, fetchCurrentTicket } from '../../../store/currentTicketSlice'
import { useNavigate } from 'react-router'
import svgs from '../../../data/svg'
import './Ticket.css'

function Ticket({ticket, isChange, clickCallBack}){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function getCurrentDate(datetime){
        return moment.utc(datetime*1000).format('HH:mm');
    }
    function getCurrentDuration(duration){
        let totalSeconds = duration;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);

        minutes = String(minutes).padStart(2, "0");
        hours = String(hours).padStart(2, "0");

        return hours + ":" + minutes

        
    }

    function clickFindSeatsButtonHandler(){
        const data = {};

        data.departure = {
            id: ticket.departure._id,
            have_first_class: ticket.departure.have_first_class,
            have_second_class: ticket.departure.have_second_class,
            have_third_class: ticket.departure.have_third_class,
            have_fourth_class: ticket.departure.have_fourth_class,
            have_wifi: ticket.departure.have_wifi,
            have_air_conditioning: ticket.departure.have_air_conditioning,
            have_express: ticket.departure.is_express
        }
        if (ticket.arrival) {
            data.arrival = {
                id: ticket.arrival._id,
                have_first_class: ticket.arrival.have_first_class,
                have_second_class: ticket.arrival.have_second_class,
                have_third_class: ticket.arrival.have_third_class,
                have_fourth_class: ticket.arrival.have_fourth_class,
                have_wifi: ticket.arrival.have_wifi,
                have_air_conditioning: ticket.arrival.have_air_conditioning,
                have_express: ticket.arrival.is_express
            }
        }

        dispatch(setData({key: 'seatsData', data: data}))
        dispatch(setData({key: 'ticket', data: ticket}))
        dispatch(fetchCurrentTicket(data))
        navigate('road')
    }

    return(
        <div className="ticket">
            <div className="ticket_column">
                <div className="ticket_name">
                    <img src={trainLogo} alt="" />
                    <p className="train_name">{ticket.departure.train.name}</p>
                    <div className="train_roads">
                        <p className="train_road">{ticket.departure.from.city.name} <img src={ticketArrow} alt="" className="train_road_arrow" /> </p>
                        <p className="train_road">{ticket.departure.to.city.name}</p>
                    </div>
                </div>
            </div>
            <div className="ticket_column ticket_details">
                <div className="details_wrapper">
                    <div className="ticket_row">
                        <p className="ticket_date">{getCurrentDate(ticket.departure.from.datetime)}</p>
                        <p className="ticket_city">{ticket.departure.from.city.name}</p>
                        <p className="ticket_stantion">{ticket.departure.from.railway_station_name} вокзал</p>
                    </div>
                    <div className="ticket_duration">
                        <p className="duration_time">{getCurrentDuration(ticket.departure.duration)}</p>
                        <img src={arrowTo} alt="" />
                    </div>
                    <div className="ticket_row">
                        <p className="ticket_date">{getCurrentDate(ticket.departure.to.datetime)}</p>
                        <p className="ticket_city">{ticket.departure.to.city.name}</p>
                        <p className="ticket_stantion">{ticket.departure.to.railway_station_name} вокзал</p>
                    </div>
                </div>
                {ticket.arrival && 
                    <div className='details_wrapper'>
                        <div className="ticket_row">
                            <p className="ticket_date to">{getCurrentDate(ticket.arrival.to.datetime)}</p>
                            <p className="ticket_city">{ticket.arrival.to.city.name}</p>
                            <p className="ticket_stantion">{ticket.arrival.to.railway_station_name} вокзал</p>
                        </div>
                        <div className="ticket_duration">
                            <p className="duration_time">{getCurrentDuration(ticket.arrival.duration)}</p>
                            <img src={arrowFrom} alt="" />
                        </div>
                        <div className="ticket_row">
                            <p className="ticket_date from">{getCurrentDate(ticket.arrival.from.datetime)}</p>
                            <p className="ticket_city">{ticket.arrival.from.city.name}</p>
                            <p className="ticket_stantion">{ticket.arrival.from.railway_station_name} вокзал</p>
                        </div>
                    </div>}
            </div>
            <div className="ticket_column price_column">
                <ul className="price_list">
                    {ticket.departure.have_fourth_class && <li className="price_item"><span className="class_name">Сидячий</span> <span className="class_seats">{ticket.departure.available_seats_info.fourth}</span> <span className="class_middleware">от</span> <span className="class_price">{ticket.departure.price_info.fourth.bottom_price}<img src={ruble} alt="" /></span> </li>}
                    {ticket.departure.have_third_class && <li className="price_item"><span className="class_name">Плацкарт</span> <span className="class_seats">{ticket.departure.available_seats_info.third}</span> <span className="class_middleware">от</span> <span className="class_price">{ticket.departure.price_info.third.bottom_price}<img src={ruble} alt="" /></span> </li>}
                    {ticket.departure.have_second_class && <li className="price_item"><span className="class_name">Купе</span> <span className="class_seats">{ticket.departure.available_seats_info.second}</span> <span className="class_middleware">от</span> <span className="class_price">{ticket.departure.price_info.second.bottom_price}<img src={ruble} alt="" /></span> </li>}
                    {ticket.departure.have_first_class && <li className="price_item"><span className="class_name">Люкс</span> <span className="class_seats">{ticket.departure.available_seats_info.first}</span> <span className="class_middleware">от</span> <span className="class_price">{ticket.departure.price_info.first.bottom_price}<img src={ruble} alt="" /></span> </li>}
                </ul>
                <div className="price_info">
                    <ul className="road_stuff">
                        {ticket.departure.have_wifi && <li className="stuff_item">{svgs.wifi}</li>} 
                        {ticket.departure.is_express && <li className="stuff_item">{svgs.express}</li>}
                        {ticket.departure.have_air_conditioning && <li className="stuff_item">{svgs.termReg}</li>}
                    </ul>
                    {isChange ? <button onClick={(e) => clickCallBack('/roads')} className="change_button">Изменить</button> : <button onClick={clickFindSeatsButtonHandler} className="get_ticket">Выбрать места</button>}
                </div>
            </div>
        </div>
    )
}

export default Ticket