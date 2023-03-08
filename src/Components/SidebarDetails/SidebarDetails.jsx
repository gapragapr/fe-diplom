import bigArrowTo from '../../img/Subtract (4).png'
import bigArrowFrom from '../../img/Subtract (5).png'
import arrowTo from '../../img/Vector (8).png'
import arrowFrom from '../../img/Vector (9).png'
import ruble from '../../img/Vector (7).png'
import svgs from '../../data/svg'
import moment from 'moment/moment'
import './SidebarDetails.css'

import { useSelector } from 'react-redux'

function SidebarSettings(){
    const ticket = useSelector(state => state.currentTicket.ticket)
    const passengers = useSelector(state => state.currentTicket.passengers)

    function getCurrentDate(datetime){
        return moment(datetime * 1000).format('DD.MM.YYYY')
    }
    
    function getCurrentTime(datetime){
        return moment(datetime * 1000).format('HH:mm')
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
    
    function getPassengers(){
        let adultSeats = 0;
        let childSeats = 0;
        let adultPrice = 0;
        let childPrice = 0;
        

        passengers.map(item => {
            switch(item.passengerType){
                case 'adult':
                    adultSeats++
                    adultPrice += item.seatPrice
                    break;
                case 'child':
                    childSeats++
                    childPrice += item.seatPrice
                    break;
                case 'childWithoutSeat':
                    childSeats++
            }
        })


        return <>
            {adultSeats > 0 && <div className="passengers_row"> <p className='passenger_name'>{adultSeats} Взрослых</p> <p className='passenger_price'>{adultPrice} <img src={ruble} alt="" /> </p></div>}
            {childSeats > 0 && <div className="passengers_row"> <p className='passenger_name'>{childSeats} Детей</p> <p className='passenger_price'>{childPrice} <img src={ruble} alt="" /> </p></div>}
        </>
    }

    function getPrice(){
        let result = 0;

        passengers.map(passenger => {
            result += passenger.seatPrice
        })

        return result
    }

    return(
        <div className="sidebar_container passengers_sidebar">
            <div className="sidebar_content">
                <div className="content_block">
                    <p className="block_name sidebar_name">Детали поездки</p>
                </div>
                <div className="content_block">
                    <div className="name_wrapper">
                        <p className="block_name"><img src={bigArrowTo} alt="" />Туда <span className="sidebar_date">{getCurrentDate(ticket.departure.from.datetime)}</span></p>
                    </div>
                    <div className="block_details">
                        <div className="details_wrapper">
                            <p className='train_name_p'>Название поезда</p>
                            <span className='train_name'>{ticket.departure.train.name}</span>
                        </div>
                        <div className="details_wrapper">
                            <div className="details_block">
                                <p className="ticket_date">{getCurrentTime(ticket.departure.from.datetime)}</p>
                                <p className="ticket_data">{getCurrentDate(ticket.departure.from.datetime)}</p>
                                <p className="ticket_city">{ticket.departure.from.city.name}</p>
                                <p className="ticket_stantion">{ticket.departure.from.railway_station_name} вокзал</p>
                            </div>
                            <div className="details_block details_duration">
                                <p className="duration_time">{getCurrentDuration(ticket.departure.duration)}</p>
                                <img src={arrowTo} alt="" />
                            </div>
                            <div className="details_block right">
                                <p className="ticket_date">{getCurrentTime(ticket.departure.to.datetime)}</p>
                                <p className="ticket_data">{getCurrentDate(ticket.departure.to.datetime)}</p>
                                <p className="ticket_city">{ticket.departure.to.city.name}</p>
                                <p className="ticket_stantion">{ticket.departure.to.railway_station_name} вокзал</p>
                            </div>
                        </div>
                    </div>
                </div>
                {ticket.arrival && 
                    <div className="content_block">
                        <div className="name_wrapper">
                            <p className="block_name"><img src={bigArrowFrom} alt="" />Обратно <span className="sidebar_date">{getCurrentDate(ticket.arrival.from.datetime)}</span></p>
                        </div>
                        <div className="block_details">
                            <div className="details_wrapper">
                            <p className='train_name_p'>Название поезда</p>
                            <span className='train_name'>{ticket.arrival.train.name}</span>
                            </div>
                            <div className="details_wrapper">
                                <div className="details_block">
                                <p className="ticket_date">{getCurrentTime(ticket.arrival.to.datetime)}</p>
                                <p className="ticket_data">{getCurrentDate(ticket.arrival.to.datetime)}</p>
                                <p className="ticket_city">{ticket.arrival.to.city.name}</p>
                                <p className="ticket_stantion">{ticket.arrival.to.railway_station_name} вокзал</p>
                                </div>
                                <div className="details_block details_duration">
                                    <p className="duration_time">{getCurrentDuration(ticket.arrival.duration)}</p>
                                    <img src={arrowFrom} alt="" />
                                </div>
                                <div className="details_block right">
                                    <p className="ticket_date">{getCurrentTime(ticket.arrival.from.datetime)}</p>
                                    <p className="ticket_data">{getCurrentDate(ticket.arrival.from.datetime)}</p>
                                    <p className="ticket_city">{ticket.arrival.from.city.name}</p>
                                    <p className="ticket_stantion">{ticket.arrival.from.railway_station_name} вокзал</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                }
                <div className="content_block">
                    <div className="name_wrapper">
                        <p className="block_name">{svgs.passenger} Пассажиры</p>
                    </div>
                    <div className="block_details">
                        {getPassengers()}
                    </div>
                </div>
                <div className="content_block">
                    <div className="name_wrapper result_price">
                        <p className="block_name">Итог <span className='result_price_value'>{getPrice()} {svgs.ruble} </span></p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SidebarSettings