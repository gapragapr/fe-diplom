import './SidebarSettings.css'
import DateInput from '../FindTicketForm/DateInput/DateInput'
import Checkbox from './Checkbox/Checkbox'
import RangeSliderPrice from './RangeSliderPrice/RangeSliderPrice'
import RangeSliderTime from './RangeSliderTime/RangeSliderTime'
import { useDispatch, useSelector } from 'react-redux'
import { addToTicketDataInfo } from '../../store/ticketFormSlice'; 
import { useState } from 'react';
import svgs from '../../data/svg'

import arrowTo from '../../img/Subtract (4).png'
import arrowFrom from '../../img/Subtract (5).png'

function SidebarSettings() {
    const dispatch = useDispatch()
    const ticketData = useSelector(state => state.ticketForm.ticketData)

    const [activeThereSlider, setActiveThereSlider] = useState(false)
    const [activeFromSlider, setActiveFromSlider] = useState(false)

    function clickSlidersNameHandler(event){
        if(event.target.localName == 'img') {return}
        if(ticketData.date_end == '' && event.target.parentElement.parentElement.id == 'fromBlock'){return}
        event.target.parentElement.parentElement.classList.toggle('active_sliders')
        if (event.target.parentElement.parentElement.classList.contains('active_sliders')){
            event.target.parentElement.parentElement.id == 'thereBlock' ? setActiveThereSlider(true) : setActiveFromSlider(true)
        } else {
            event.target.parentElement.parentElement.id == 'thereBlock' ? setActiveThereSlider(false) : setActiveFromSlider(false)
        }
    }


    return (
        <div className="sidebar_container">
            <div className="sidebar_content">
                <div className="content_block">
                    <p className="block_name">Дата поездки</p>
                    <label htmlFor="">
                        <DateInput id={'side_date_start'} type={'date_start'} />
                    </label>
                    <p className="block_name">Дата возвращения</p>
                    <label htmlFor="">
                        <DateInput id={'side_date_end'} type={'date_end'} />
                    </label>
                </div>
                <div className="content_block">
                    <ul className="content_list">
                        <li className="list_item"><p>{svgs.coupe} Купе</p> <Checkbox type='have_second_class' /></li>
                        <li className="list_item"><p>{svgs.reservedSeat} Плацкарт</p> <Checkbox type='have_third_class' /></li>
                        <li className="list_item"><p>{svgs.sit} Сидячий</p> <Checkbox type='have_fourth_class' /></li>
                        <li className="list_item"><p>{svgs.luxe} Люкс</p>  <Checkbox type='have_first_class' /></li>
                        <li className="list_item"><p>{svgs.wifi} Wi-Fi</p> <Checkbox type='have_wifi' /></li>
                        <li className="list_item"><p>{svgs.express} Экспресс</p> <Checkbox type='have_express' /></li>
                    </ul>
                </div>
                <div className="content_block">
                    <p className="block_name">Стоимость</p>
                    <RangeSliderPrice />
                </div>
                <div id='thereBlock' className="content_block">
                    <div onClick={(e) => clickSlidersNameHandler(e)} className="name_wrapper">
                        <p className="block_name"><img src={arrowTo} alt="" />Туда</p>
                        {activeThereSlider ? svgs.minus : svgs.plus}
                    </div>
                    <div className="block_sliders">
                        <div className="sliders_row">
                            <p className="row_name">Время отбытия</p>
                            <RangeSliderTime id={'time_to1'} settingsName={['start_departure_hour_from', 'start_departure_hour_to']}/>
                        </div>
                        <div className="sliders_row">
                            <p className="row_name" style={{textAlign: 'right', marginTop: 46 + 'px'}}>Время прибытия</p>
                            <RangeSliderTime id={'time_to2'} settingsName={['start_arrival_hour_from', 'start_arrival_hour_to']}/>
                        </div>
                    </div>
                </div>
                <div id='fromBlock' className="content_block">
                    <div onClick={(e) => clickSlidersNameHandler(e)} className="name_wrapper">
                        <p className="block_name"><img src={arrowFrom} alt="" />Обратно</p>
                        {activeFromSlider ? svgs.minus : svgs.plus}
                    </div>
                    <div className="block_sliders">
                        <div className="sliders_row">
                            <p className="row_name">Время отбытия</p>
                            <RangeSliderTime id={'time_from1'} settingsName={['end_departure_hour_from', 'end_departure_hour_to']}/>
                        </div>
                        <div className="sliders_row">
                            <p className="row_name" style={{textAlign: 'right', marginTop: 46 + 'px'}}>Время прибытия</p>
                            <RangeSliderTime id={'time_from2'} settingsName={['end_arrival_hour_from', 'end_arrival_hour_to']}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SidebarSettings