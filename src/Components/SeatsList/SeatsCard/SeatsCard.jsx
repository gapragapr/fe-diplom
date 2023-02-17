import firstClass from '../../../img/coachMap2.png'
import fourthClass from '../../../img/coachMap3.png'
import ruble from '../../../img/Vector (7).png'
import svgs from '../../../data/svg'
import './SeatsCard.css'
import { useSelector } from 'react-redux'

function SeatsCard({seatsObj, type}) {
    const trainType = useSelector(state => state.currentTicket.type)

    function createArraysMap(seats){
        let size;
        switch (trainType[type]){
            case 'first' :
                size = 2
                break;
            default: 
                size = 4
        }
        let result = [];
        for (let i = 0; i <Math.ceil(seats.length/size); i++){
            result[i] = seats.slice((i*size), (i*size) + size);
        }

        return result
    }
    function getCurrentClassName(seat){
        let result = 'skeleton_item';
        if (!seat.available){
            result += ' available_false'
        }
        return result + ' ' + trainType[type]

    }
    function clickSeatHandler(event, index){
        if (!event.currentTarget.classList.contains('available_false')){
            event.currentTarget.classList.toggle('active_seat')
        }
    }
    function clickStuffHandler(event, name){
        event.currentTarget.classList.toggle('active_stuff')
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
                        {trainType[type] == 'third' ? <>
                            <p className="seats_count">Места <span className="count">{seatsObj.coach.available_seats}</span></p>
                            <p className="seats_type">Верхние <span className="count">{Math.floor(seatsObj.coach.available_seats / 100 * 33)}</span></p>
                            <p className="seats_type">Нижние <span className="count">{Math.ceil(seatsObj.coach.available_seats / 100 * 33)}</span></p>
                            <p className="seats_type">Боковые <span className="count">{Math.ceil(seatsObj.coach.available_seats / 100 * 33)}</span></p>
                        </> : <>
                            <p className="seats_count">Места <span className="count">{seatsObj.coach.available_seats}</span></p>
                            <p className="seats_type">Верхние <span className="count">{Math.floor(seatsObj.coach.available_seats / 100 * 50)}</span></p>
                            <p className="seats_type">Нижние <span className="count">{Math.ceil(seatsObj.coach.available_seats / 100 * 50)}</span></p>
                        </>}
                    </div>
                    <div className="row_block">
                        <p className="seats_count">Стоимость</p>
                        <p className="seats_type"><span className="count">{seatsObj.coach.top_price} <img src={ruble} alt="" /></span></p>
                        <p className="seats_type"><span className="count">{seatsObj.coach.bottom_price} <img src={ruble} alt="" /></span></p>
                        {trainType[type] == 'third' && <p className="seats_type"><span className="count">{seatsObj.coach.side_price} <img src={ruble} alt="" /></span></p>}
                    </div>
                    <div className="row_block">
                        <p className="seats_count">Обслуживание <span className="grey">ФПК</span></p>
                        <ul className="stuff_list">
                            <li onClick={(e) => clickStuffHandler(e)} title='кондиционер' className="stuff_item">{svgs.termReg}</li>
                            <li onClick={(e) => clickStuffHandler(e)} title='wi-fi' className="stuff_item">{svgs.wifi}</li>
                            <li onClick={(e) => clickStuffHandler(e)} title='белье' className="stuff_item">{svgs.linens}</li>
                            <li onClick={(e) => clickStuffHandler(e)} title='питание' className="stuff_item">{svgs.coffee}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="seats_row coach_map">
                <div className="row_content">
                    {trainType[type] == 'fourth' ? <img className='fourth_map' src={fourthClass} alt="" /> : <img src={firstClass} alt="" />}
                    <div className="map_skeleton">
                        {createArraysMap(seatsObj.seats).map((item, index) => {
                            return <div key={index} className="seats_block">{item.map(seat => {
                                return <div onClick={(e) => clickSeatHandler(e, seat.index)} key={seat.index} className={getCurrentClassName(seat, seat.index)}>{seat.index}</div>
                            })}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeatsCard