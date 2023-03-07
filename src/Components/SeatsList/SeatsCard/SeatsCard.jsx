import firstClass from '../../../img/coachMap2.png'
import fourthClass from '../../../img/coachMap3.png'
import ruble from '../../../img/Vector (7).png'
import svgs from '../../../data/svg'
import './SeatsCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { setPrice, setCurrentSeats, deleteCurrentSeat, setSeatsStuff, deleteSeatStuff, setPassengers, deletePassenger } from '../../../store/currentTicketSlice'

function SeatsCard({seatsObj, type, cardIndex}) {
    const trainType = useSelector(state => state.currentTicket.type)
    const currentSeats = useSelector(state => state.currentTicket.currentSeats)
    const passengers = useSelector(state => state.currentTicket.passengers)
    const seatsStuff = useSelector(state => state.currentTicket.seatsStuff)

    const dispatch = useDispatch()


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
    function getCurrentClassNameForSeat(seat){
        let result = 'skeleton_item';
        if (!seat.available){
            result += ' available_false'
        }
        currentSeats.map(item => {
            if (item.type == type && item.trainType == trainType[type] && item.seat == seat.index && item.cardIndex == cardIndex){
                return result += ' active_seat'
            }
            
        })
        return result + ' ' + trainType[type]

    }
    function getCurrentStuffClass(name, stuffName){
        let result = 'stuff_item';

        switch(name){
            case 'air_conditing':
                seatsObj.coach.have_air_conditing ? result += '' : result += ' nothing'
                break;
            case 'wifi':
                seatsObj.coach.have_wifi ? result += '' : result += ' nothing'
                break;  
            case 'linens_included':
                seatsObj.coach.is_linens_included ? result += ' included' : result += ''
                break; 
        }

        seatsStuff.map(item => {
            if (item.cardIndex == cardIndex && item.type == type && item.trainType == trainType[type] && item.stuffName == stuffName){
                result += ' active_stuff'
            }
        })



        return result
    }
    function clickSeatHandler(event, index){
        if (event.currentTarget.classList.contains('available_false')){
            return
        }
        const dataEl = document.querySelector(`.active_ticket_type`)
        if (!dataEl){
            return
        }
        const dataType = dataEl.dataset.type
        event.currentTarget.classList.toggle('active_seat')


        function calculatedPrice(price){
            let result = 0;
            switch(dataType){
                case 'adult':
                    result = price
                    break;
                case 'child':
                    result = price / 2
                    break;
                case 'childWithoutSeat':
                    result = price / 100 * 15
                    break;

            }
            
            return Math.ceil(result)
        }

        if (event.currentTarget.classList.contains('active_seat')){
            let currentPrice;
            switch(type){
                case 'first':
                    dispatch(setPrice({key: type, price: calculatedPrice(seatsObj.coach.price)}))
                    currentPrice = calculatedPrice(seatsObj.coach.price)
                    break;
                case 'third':
                    index > 32 && dispatch(setPrice({key: type, price: calculatedPrice(seatsObj.coach.side_price)}))
                    currentPrice = calculatedPrice(seatsObj.coach.side_price)
                    break;
                default:
                    if (index % 2 !== 0) {dispatch(setPrice({key: type, price: calculatedPrice(seatsObj.coach.top_price)})); currentPrice = calculatedPrice(seatsObj.coach.top_price)}
                    if (index % 2 == 0) {dispatch(setPrice({key: type, price: calculatedPrice(seatsObj.coach.bottom_price)})); currentPrice = calculatedPrice(seatsObj.coach.bottom_price)}
                    break;
            } 
            dispatch(setCurrentSeats({type: type, trainType: trainType[type], seatIndex: index, cardIndex: cardIndex, passengerType: dataType, seatPrice: currentPrice}))
            dispatch(setPassengers({data: {type: type, trainType: trainType[type], seatIndex: index, cardIndex: cardIndex, passengerType: dataType, seatPrice: currentPrice, name: '', surname: '', fatherName: '', docType: '', docDetails: '', bd: '', gender: ''}}))
        } else {
            const findedIndex = currentSeats.findIndex(item => item.type == type && item.trainType == trainType[type] && item.seat == index && item.cardIndex == cardIndex)
            const passengerIndex = passengers.findIndex(item => item.type == type && item.trainType == trainType[type] && item.seat == index && item.cardIndex == cardIndex)
            dispatch(setPrice({key: type, price: -currentSeats[findedIndex].seatPrice}))
            dispatch(deleteCurrentSeat({index: findedIndex}))
            dispatch(deletePassenger({index: passengerIndex}))
        }
    }
    function clickStuffHandler(event, name, stuffName){
        if (event.currentTarget.classList.contains('included') || event.currentTarget.classList.contains('nothing')){
            return
        }
        event.currentTarget.classList.toggle('active_stuff')

        if (event.currentTarget.classList.contains('active_stuff')){
            dispatch(setSeatsStuff({type: type, trainType: trainType[type], stuffName: stuffName, cardIndex: cardIndex}))
            currentSeats.map(item => {
                dispatch(setPrice({key: type, price: seatsObj.coach[name]}))
            })
            
        } else {
            const findedIndex = seatsStuff.findIndex(item => item.cardIndex == cardIndex && item.type == type && item.trainType == trainType[type] && item.stuffName == stuffName)
            dispatch(deleteSeatStuff({index: findedIndex}))
            currentSeats.map(item => {
                dispatch(setPrice({key: type, price: -seatsObj.coach[name]}))
            })
        }
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
                            <li onClick={(e) => clickStuffHandler(e, 'air_conditioning_price', 'air_conditioning')} title='кондиционер' className={getCurrentStuffClass('air_conditioning', 'air_conditioning')}>{svgs.termReg}</li>
                            <li onClick={(e) => clickStuffHandler(e, 'wifi_price', 'wifi')} title='wi-fi' className={getCurrentStuffClass('wifi', 'wifi')}>{svgs.wifi}</li>
                            <li onClick={(e) => clickStuffHandler(e, 'linens_price', 'linens')} title='белье' className={getCurrentStuffClass('linens_included', 'linens')}>{svgs.linens}</li>
                            <li onClick={(e) => clickStuffHandler(e, 'food_price', 'food')} title='питание' className={getCurrentStuffClass('food', 'food')}>{svgs.coffee}</li>
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
                                return <div onClick={(e) => clickSeatHandler(e, seat.index)} key={seat.index} className={getCurrentClassNameForSeat(seat)}>{seat.index}</div>
                            })}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SeatsCard