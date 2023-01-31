import Ticket from "./Ticket/Ticket"
import './TicketList.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addToTicketDataInfo} from '../../store/ticketFormSlice';

function TicketList(){
    const dispatch = useDispatch()
    const ticketData = useSelector(state => state.ticketForm.ticketData)
    const ticketArr = useSelector(state => state.roadsFromServer.roadsArr)
    const roadsCount = useSelector(state => state.roadsFromServer.roadsCount)

    useEffect(() => {
        const numbers = Array.from(document.querySelectorAll('.show_number span'))
        
        numbers.map(item => {
            if (item.textContent == ticketData.limit){
                item.classList.add('active_sort_number')
                item.classList.add('number_item')
            }
            item.classList.add('number_item')
        })
    }, [ticketData.limit])

    function clickSortNumberHandler(event){
        if (event.target.textContent == ticketData.limit) {return}

        const numbers = Array.from(document.querySelectorAll('.show_number span'))
        
        numbers.map(item => {
            item.classList.remove('active_sort_number')
            event.target.classList.add('active_sort_number')
        })

        dispatch(addToTicketDataInfo({key: 'limit', data: Number(event.target.textContent)}))
    }


    return(
        <div className="tickets">
            <div className="tickets_info">
                <p className="finded_tickets">найдено: {roadsCount}</p>
                <div className="sort_settings">
                    <div className="sort">сортировать по: 
                        <ul>
                            <li className="sort_item active_sort">времени</li>
                            <li className="sort_item">цене</li>
                            <li className="sort_item">длительности</li>
                        </ul>
                    </div>
                    <p className="show_number">показывать по: <span onClick={(e) => clickSortNumberHandler(e)}>5</span> <span onClick={(e) => clickSortNumberHandler(e)}>10</span> <span onClick={(e) => clickSortNumberHandler(e)}>20</span></p>
                </div>

            </div>

            {ticketArr.map(ticket => {
                return <Ticket key={ticket.departure._id} ticket={ticket} />
            })}
        </div>
    )
}

export default TicketList