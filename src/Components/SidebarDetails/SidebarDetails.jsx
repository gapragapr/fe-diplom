import bigArrowTo from '../../img/Subtract (4).png'
import bigArrowFrom from '../../img/Subtract (5).png'
import arrowTo from '../../img/Vector (8).png'
import arrowFrom from '../../img/Vector (9).png'
import svgs from '../../data/svg'
import moment from 'moment/moment'
import './SidebarDetails.css'

import { useDispatch, useSelector } from 'react-redux'

function SidebarSettings(){
    const ticket = useSelector(state => state.currentTicket.ticket)
    console.log(ticket)

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

    return(
        <div className="sidebar_container passengers_sidebar">
            <div className="sidebar_content">
                <div className="content_block">
                    <p className="block_name sidebar_name">Детали поездки</p>
                </div>
                <div className="content_block">
                    <div className="name_wrapper">
                        <p className="block_name"><img src={bigArrowTo} alt="" />Туда <span className="sidebar_date">{getCurrentDate(ticket.departure.from.datetime)}</span></p>
                        {svgs.minus}
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
                            <p className="block_name"><img src={bigArrowFrom} alt="" />Туда <span className="sidebar_date">{getCurrentDate(ticket.arrival.from.datetime)}</span></p>
                            {svgs.minus}
                        </div>
                        <div className="block_details">
                            <div className="details_wrapper">
                            <p className='train_name_p'>Название поезда</p>
                            <span className='train_name'>{ticket.arrival.train.name}</span>
                            </div>
                            <div className="details_wrapper">
                                <div className="details_block">
                                <p className="ticket_date">{getCurrentTime(ticket.arrival.from.datetime)}</p>
                                <p className="ticket_data">{getCurrentDate(ticket.arrival.from.datetime)}</p>
                                <p className="ticket_city">{ticket.arrival.from.city.name}</p>
                                <p className="ticket_stantion">{ticket.arrival.from.railway_station_name} вокзал</p>
                                </div>
                                <div className="details_block details_duration">
                                    <p className="duration_time">{getCurrentDuration(ticket.arrival.duration)}</p>
                                    <img src={arrowTo} alt="" />
                                </div>
                                <div className="details_block right">
                                    <p className="ticket_date">{getCurrentTime(ticket.arrival.to.datetime)}</p>
                                    <p className="ticket_data">{getCurrentDate(ticket.arrival.to.datetime)}</p>
                                    <p className="ticket_city">{ticket.arrival.to.city.name}</p>
                                    <p className="ticket_stantion">{ticket.arrival.to.railway_station_name} вокзал</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                }
            </div>
        </div>
    )
}

export default SidebarSettings