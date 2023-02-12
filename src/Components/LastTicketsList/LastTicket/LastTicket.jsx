import ruble from '../../../img/Vector (7).png'
import './LastTicket.css'
import svgs from '../../../data/svg'

function LastTicket({ticket}) {
  return (
    <div className="last_ticket">
        <div className="last_ticket_row">
            <div className="last_ticket_column">
                <p className="ticket_city">{ticket.departure.from.city.name}</p>
                <p className="ticket_stantion">{ticket.departure.from.railway_station_name} <br /> вокзал</p>
            </div>
            <div className="last_ticket_column">
                <p className="ticket_city">{ticket.departure.to.city.name}</p>
                <p className="ticket_stantion">{ticket.departure.to.railway_station_name} <br /> вокзал</p>
            </div>
        </div>
        <div className="last_ticket_row">
            <div className="last_ticket_column last_ticket_stuff">
                <ul className="road_stuff">
                    {ticket.departure.have_wifi && <li className="stuff_item">{svgs.wifi}</li>} 
                    {ticket.departure.is_express && <li className="stuff_item">{svgs.express}</li>}
                    {ticket.departure.have_air_conditioning && <li className="stuff_item">{svgs.termReg}</li>}
                </ul>
            </div>
            <div className="last_ticket_column last_ticket_stuff">
                <p className="last_ticket_price">от <span>{ticket.min_price}</span> <img src={ruble} alt="" /></p>
            </div>
        </div>
    </div>
  )
}

export default LastTicket