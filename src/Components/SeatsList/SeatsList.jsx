import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentTicket, setData, setType } from "../../store/currentTicketSlice"
import moment from "moment/moment"
import svgs from "../../data/svg"
import { useNavigate } from "react-router"
import SeatsCard from "./SeatsCard/SeatsCard"
import './SeatsList.css'
import ticketArrow from '../../img/Arrow.png'
import bigArrowTo from '../../img/Subtract (4).png'
import bigArrowFrom from '../../img/Subtract (5).png'
import arrowTo from '../../img/Vector (8).png'
import arrowFrom from '../../img/Vector (9).png'
import { useEffect } from "react"
import { redirect } from "react-router"


function SeatsList() {
    const dispatch = useDispatch()
    const seatsFetchResponse = useSelector(state => state.currentTicket.seatsFetchResponse)
    const trainType = useSelector(state => state.currentTicket.type)
    const ticket = useSelector(state => state.currentTicket.ticket)
    const navigate = useNavigate()
    console.log(seatsFetchResponse)

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

      return (
        <>
          <p style={{fontSize: 18}}>{hours} часов</p>
          <p style={{fontSize: 18}}>{minutes} минут</p>
        </>
      ) 
  }

  function clickTrainTypeHandler(e, type){
    e.stopPropagation()
    const prevActive = document.querySelector(`#${type} .active_type`)
    if (prevActive){
      prevActive.classList.remove('active_type')
    }
    dispatch(setType({key: type, data: e.currentTarget.dataset.type}))
    e.currentTarget.classList.add('active_type')
  }
    function clickBackToTrainsHandler(){
      dispatch(setData({key: 'ticket', data: {}}))
      dispatch(setType({key: 'departure', data: null}))
      dispatch(setType({key: 'arrival', data: null}))
      navigate('/roads')
    }

    return (
      <div className="seats_container">
        <h2>Выбор мест</h2>
        <div className="seats_departure seats_wrapper">
          <div className="seats_row">
            {svgs.bigArrowTo}
            <button onClick={clickBackToTrainsHandler}>Выбрать другой поезд</button>
          </div>
          <div className="seats_row">
            <div className="row_content">
              <div className="row_block">
                {svgs.train}
              </div>
              <div className="row_block">
                <p className="train_name">{ticket.departure.train.name}</p>
                <p className="train_road">{ticket.departure.from.city.name} <img src={ticketArrow} alt="" /></p>
                <p className="train_road">{ticket.departure.to.city.name}</p>
              </div>
              <div className="row_block">
                <p className="ticket_date">{getCurrentDate(ticket.departure.from.datetime)}</p>
                <p className="ticket_city">{ticket.departure.from.city.name}</p>
                <p className="ticket_stantion">{ticket.departure.from.railway_station_name} вокзал</p>
              </div>
              <div className="row_block">
                <img src={arrowTo} alt="" />
              </div>
              <div className="row_block">
                <p className="ticket_date">{getCurrentDate(ticket.departure.to.datetime)}</p>
                <p className="ticket_city">{ticket.departure.to.city.name}</p>
                <p className="ticket_stantion">{ticket.departure.to.railway_station_name} вокзал</p>
              </div>
              <div className="row_block">
                <div className="block_column">
                  {svgs.time}
                </div>
                <div className="block_column">
                  {getCurrentDuration(ticket.departure.duration)}
                </div>
              </div>
            </div>
          </div>
          <div className="seats_row">
            <div className="row_name">
              <h2>Количество билетов</h2>
            </div>
            <div className="row_content">
              <div className="row_block">
                <label htmlFor="">
                  <input defaultValue={'Взрослых — 0'} type="text" />
                </label>
                <p>Можно добавить еще 3 пассажиров </p>
              </div>
              <div className="row_block">
                <label htmlFor="">
                  <input defaultValue={'Детских — 0'} type="text" />
                </label>
                <p>Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</p>
              </div>
              <div className="row_block">
                <label htmlFor="">
                  <input defaultValue={'Детских «без места» — 0'} type="text" />
                </label>
              </div>
            </div>
          </div>
          <div className="seats_row dotted_row">
            <div className="row_name">
              <h2>Тип вагона</h2>
            </div>
            <div id="departure" className="row_content">
              <div onClick={(e) => clickTrainTypeHandler(e, 'departure')} data-type="fourth" className="row_block">{svgs.sit} Сидячий</div>
              <div onClick={(e) => clickTrainTypeHandler(e, 'departure')} data-type="third" className="row_block">{svgs.reservedSeat} Плацкарт</div>
              <div onClick={(e) => clickTrainTypeHandler(e, 'departure')} data-type="second" className="row_block">{svgs.coupe} Купе</div>
              <div onClick={(e) => clickTrainTypeHandler(e, 'departure')} data-type="first" className="row_block">{svgs.luxe} Люкс</div>
            </div>
          </div>
          {trainType && seatsFetchResponse.departure && seatsFetchResponse.departure.map(item => {
            if (item.coach.class_type == trainType.departure){
              return <SeatsCard key={item.coach._id} type={'departure'} seatsObj={item}/>
            }
          })}
        </div>
        {seatsFetchResponse.arrival && 
          <div className="seats_arrival seats_wrapper">
            <div className="seats_row">
              {svgs.bigArrowFrom}
              <button onClick={clickBackToTrainsHandler}>Выбрать другой поезд</button>
            </div>
            <div className="seats_row">
              <div className="row_content">
                <div className="row_block">
                  {svgs.train}
                </div>
                <div className="row_block">
                  <p className="train_name">{ticket.arrival.train.name}</p>
                  <p className="train_road">{ticket.arrival.from.city.name} <img src={ticketArrow} alt="" /></p>
                  <p className="train_road">{ticket.arrival.to.city.name}</p>
                </div>
                <div className="row_block">
                  <p className="ticket_date">{getCurrentDate(ticket.arrival.from.datetime)}</p>
                  <p className="ticket_city">{ticket.arrival.from.city.name}</p>
                  <p className="ticket_stantion">{ticket.arrival.from.railway_station_name} вокзал</p>
                </div>
                <div className="row_block">
                  <img src={arrowTo} alt="" />
                </div>
                <div className="row_block">
                  <p className="ticket_date">{getCurrentDate(ticket.arrival.to.datetime)}</p>
                  <p className="ticket_city">{ticket.arrival.to.city.name}</p>
                  <p className="ticket_stantion">{ticket.arrival.to.railway_station_name} вокзал</p>
                </div>
                <div className="row_block">
                  <div className="block_column">
                    {svgs.time}
                  </div>
                  <div className="block_column">
                    {getCurrentDuration(ticket.arrival.duration)}
                  </div>
                </div>
              </div>
            </div>
            <div className="seats_row">
              <div className="row_name">
                <h2>Количество билетов</h2>
              </div>
              <div className="row_content">
                <div className="row_block">
                  <label htmlFor="">
                    <input defaultValue={'Взрослых — 0'} type="text" />
                  </label>
                  <p>Можно добавить еще 3 пассажиров </p>
                </div>
                <div className="row_block">
                  <label htmlFor="">
                    <input defaultValue={'Детских — 0'} type="text" />
                  </label>
                  <p>Можно добавить еще 3 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</p>
                </div>
                <div className="row_block">
                  <label htmlFor="">
                    <input defaultValue={'Детских «без места» — 0'} type="text" />
                  </label>
                </div>
              </div>
            </div>
            <div className="seats_row dotted_row">
              <div className="row_name">
                <h2>Тип вагона</h2>
              </div>
              <div id={'arrival'} className="row_content">
                <div onClick={(e) => clickTrainTypeHandler(e, 'arrival')} data-type="fourth" className="row_block">{svgs.sit} Сидячий</div>
                <div onClick={(e) => clickTrainTypeHandler(e, 'arrival')} data-type="third" className="row_block">{svgs.reservedSeat} Плацкарт</div>
                <div onClick={(e) => clickTrainTypeHandler(e, 'arrival')} data-type="second" className="row_block">{svgs.coupe} Купе</div>
                <div onClick={(e) => clickTrainTypeHandler(e, 'arrival')} data-type="first" className="row_block">{svgs.luxe} Люкс</div>
              </div>
            </div>
            {trainType && seatsFetchResponse.arrival && seatsFetchResponse.arrival.map(item => {
              if (item.coach.class_type == trainType.arrival){
                return <SeatsCard key={item.coach._id} type={'arrival'} seatsObj={item}/>
              }
            })}
          </div>
        }
      </div>
    )
}

export default SeatsList