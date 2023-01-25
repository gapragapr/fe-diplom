import Ticket from "./Ticket/Ticket"
import './TicketList.css'
import { useDispatch, useSelector } from "react-redux"
import { addToTicketDataInfo, fetchWithTicketData} from '../../store/ticketFormSlice';

function TicketList(){
    const ticketArr = useSelector(state => state.roadsFromServer.roadsArr)
    const ticketData = useSelector(state => state.ticketForm.ticketData)
    const dispatch = useDispatch()

    function clickSortSettingsHandler(event){
        switch(event.target.textContent){
            case 'времени':
                dispatch(addToTicketDataInfo({sort: 'date'}))
                break;
            case 'стоимости':
                dispatch(addToTicketDataInfo({sort: 'price'}))
                break;
            case 'длительности':
                dispatch(addToTicketDataInfo({sort: 'duration'}))
                break;
        }
        if (ticketArr.length > 0){
            dispatch(fetchWithTicketData(ticketData))
        }
        Array.from(document.querySelectorAll('.active_sort')).map(item => item.classList.remove('active_sort'))
        event.target.classList.add('active_sort')
    }
    
    function onMouseEnterInSortItemHandler(){
        document.querySelector('.sort ul').classList.add('active_ul')
    }
    function onMouseLeaveInSortItemHandler(){
        document.querySelector('.sort ul').classList.remove('active_ul')   
    }

    return(
        <div className="tickets">
            <div className="tickets_info">
                <p className="finded_tickets">найдено: {ticketArr.length}</p>
                <div className="sort_settings">
                    <div className="sort">сортировать по: 
                        <ul onMouseLeave={onMouseLeaveInSortItemHandler} onMouseEnter={onMouseEnterInSortItemHandler}>
                            <li onClick={clickSortSettingsHandler} className="sort_item active_sort">времени</li>
                            <li onClick={clickSortSettingsHandler} className="sort_item">цене</li>
                            <li onClick={clickSortSettingsHandler} className="sort_item">длительности</li>
                        </ul>
                    </div>
                    <p className="show_number">показывать по: <span className="number_item active_sort_number">5</span> <span className="number_item">10</span> <span className="number_item">20</span></p>
                </div>

            </div>

            {ticketArr.map(ticket => {
                return <Ticket key={ticket.departure._id} ticket={ticket} />
            })}
        </div>
    )
}

export default TicketList