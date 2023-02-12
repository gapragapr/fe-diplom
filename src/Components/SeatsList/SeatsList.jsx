import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentTicket, setType } from "../../store/currentTicketSlice"
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
import { useEffect, useState } from "react"


function SeatsList() {
    const dispatch = useDispatch()
    const seatsFetchResponse = useSelector(state => state.currentTicket.seatsFetchResponse)
    const trainType = useSelector(state => state.currentTicket.type)
    const ticket = useSelector(state => state.currentTicket.ticket)
    const navigation = useNavigate()

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

  const clickTrainTypeHandler = (e) => {
    e.stopPropagation()
    const prevActive = document.querySelector('.active_type')
    if (prevActive){
      prevActive.classList.remove('active_type')
    }
    dispatch(setType({type: e.currentTarget.dataset.type}))
    e.currentTarget.classList.add('active_type')
  }

    return (
      <div className="seats_container">
        <h2>Выбор мест</h2>
        <div className="seats_departure seats_wrapper">
          <div className="seats_row">
            {svgs.bigArrowTo}
            <button>Выбрать другой поезд</button>
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
            <div className="row_content">
              <div onClick={clickTrainTypeHandler} data-type="fourth" className="row_block">{svgs.sit} Сидячий</div>
              <div onClick={clickTrainTypeHandler} data-type="third" className="row_block">{svgs.reservedSeat} Плацкарт</div>
              <div onClick={clickTrainTypeHandler} data-type="second" className="row_block">{svgs.coupe} Купе</div>
              <div onClick={clickTrainTypeHandler} data-type="first" className="row_block">{svgs.luxe} Люкс</div>
            </div>
          </div>
          {trainType && seatsFetchResponse.departure.map(item => {
            if (item.coach.class_type == trainType){
              return <SeatsCard key={item.coach._id} seatsObj={item}/>
            }
          })}
        </div>
      </div>
    )
}

export default SeatsList