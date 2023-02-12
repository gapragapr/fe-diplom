import React from 'react'
import { useSelector } from 'react-redux'
import firstClass from '../../../img/coachMap2.png'
import ruble from '../../../img/Vector (7).png'
import svgs from '../../../data/svg'
import './SeatsCard.css'

function SeatsCard({seatsObj}) {
    function createArraysMap(seats){
        let size = 2
        let result = [];
        for (let i = 0; i <Math.ceil(seats.length/size); i++){
            result[i] = seats.slice((i*size), (i*size) + size);
        }

        return result
    }
    return (
        <div className="seats_card">
            <div className="seats_row">
                <div className="row_content">
                    <div className="row_block coach_number_block">
                        <p className="coach_number">{seatsObj.coach.coachNumber}</p>
                        <p>вагон</p>
                    </div>
                    <div className="row_block">
                        <p className="seats_count">Места <span className="count">{seatsObj.coach.available_seats}</span></p>
                        <p className="seats_type">Верхние <span className="count">{Math.floor(seatsObj.coach.available_seats / 100 * 50)}</span></p>
                        <p className="seats_type">Нижние <span className="count">{Math.floor(seatsObj.coach.available_seats / 100 * 50)}</span></p>

                    </div>
                    <div className="row_block">
                        <p className="seats_count">Стоимость</p>
                        <p className="seats_type"><span className="count">{seatsObj.coach.top_price} <img src={ruble} alt="" /></span></p>
                        <p className="seats_type"><span className="count">{seatsObj.coach.bottom_price} <img src={ruble} alt="" /></span></p>

                    </div>
                    <div className="row_block">
                        <p className="seats_count">Обслуживание <span className="grey">ФПК</span></p>
                        <ul className="stuff_list">
                            <li className="stuff_item">{svgs.termReg}</li>
                            <li className="stuff_item">{svgs.wifi}</li>
                            <li className="stuff_item">{svgs.linens}</li>
                            <li className="stuff_item">{svgs.coffee}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="seats_row coach_map">
                <div className="row_content">
                    <img src={firstClass} alt="" />
                    <div className="map_skeleton">
                        {createArraysMap(seatsObj.seats).map((item, index) => {
                            return <div key={index} className="seats_block">{item.map(seat => {
                                return <div key={seat.index} className={!seat.available ? 'skeleton_item available_false' : 'skeleton_item'}>{seat.index}</div>
                            })}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeatsCard