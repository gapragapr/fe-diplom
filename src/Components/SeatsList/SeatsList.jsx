import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentTicket, setData, setType, setPrice, clearStore } from "../../store/currentTicketSlice"
import { setStep } from "../../store/appSlice"
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
import ruble from '../../img/Vector (7).png'
import { useState } from "react"
import { redirect } from "react-router"


function SeatsList() {
    const dispatch = useDispatch()
    const seatsFetchResponse = useSelector(state => state.currentTicket.seatsFetchResponse)
    const trainType = useSelector(state => state.currentTicket.type)
    const ticket = useSelector(state => state.currentTicket.ticket)
    const price = useSelector(state => state.currentTicket.price)
    const currentSeats = useSelector(state => state.currentTicket.currentSeats)
    const navigate = useNavigate()

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
      dispatch(clearStore())
      navigate('/roads')
    }
    function clickNextPageButtonHandler(event){
      if (event.target.classList.contains('nonactive_button')){
        return
      }

      event.preventDefault()
      navigate('/passengers')
      dispatch(setStep({step: 1}))
    }
    function clickTicketTypeHandler(e){
      e.preventDefault()
      document.querySelector('.active_ticket_type').classList.remove('active_ticket_type')
      e.target.parentElement.classList.add('active_ticket_type')
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
              <div data-type={'adult'} className="row_block active_ticket_type">
                <p onClick={(e) => clickTicketTypeHandler(e)} className="ticket_type">Взрослых — 0</p>
                <p>Можно добавить 5 пассажиров </p>
              </div>
              <div data-type={'child'} className="row_block">
                <p onClick={(e) => clickTicketTypeHandler(e)} className="ticket_type">Детских — 0</p>
                <p>Можно добавить 5 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</p>
              </div>
              <div data-type={'childWithoutSeat'} className="row_block">
                <p onClick={(e) => clickTicketTypeHandler(e)} className="ticket_type">Детских «без места» — 0</p>
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
          {trainType && seatsFetchResponse.departure && seatsFetchResponse.departure.map((item, index) => {
            if (item.coach.class_type == trainType.departure){
              return <SeatsCard cardIndex={index} key={item.coach._id} type={'departure'} seatsObj={item}/>
            }
          })}
          {price.departure > 0 && 
            <div className="price">
              <p>{price.departure} <img src={ruble} alt="" /> </p>
            </div>
          }
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
                <div className="row_block active_ticket_type">
                  <p className="ticket_type">Взрослых — 0</p>
                  <p>Можно добавить 5 пассажиров </p>
                </div>
                <div className="row_block">
                  <p className="ticket_type">Детских — 0</p>
                  <p>Можно добавить 5 детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%</p>
                </div>
                <div className="row_block">
                  <p className="ticket_type">Детских «без места» — 0</p>
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
            {trainType && seatsFetchResponse.arrival && seatsFetchResponse.arrival.map((item, index) => {
              if (item.coach.class_type == trainType.arrival){
                return <SeatsCard cardIndex={index} key={item.coach._id} type={'arrival'} seatsObj={item}/>
              }
            })}
            {price.arrival > 0 && 
              <div className="price">
                <p>{price.arrival} <img src={ruble} alt="" /></p>
              </div>
            }
          </div>
        }
        <div className="button_container">
          <button onClick={(e) => clickNextPageButtonHandler(e)} className={currentSeats.length < 1 ? 'next_page nonactive_button' : 'next_page active_button'}>
            Далее
          </button>
        </div>
      </div>
    )
}

export default SeatsList