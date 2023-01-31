import LastTicket from "./LastTicket/LastTicket"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchForLastTickets } from '../../store/roadsSlice';


function LastTicketsList(){
    const dispatch = useDispatch()
    const lastTicketsArr = useSelector(state => state.roadsFromServer.lastRoadsArr)
    useEffect(() => {
        dispatch(fetchForLastTickets())
    }, [])
    
    

    
    return(
        <div className="last_tickets">
            <h2>последние билеты</h2>
            {lastTicketsArr.map(lastTicket => {
                return <LastTicket key={lastTicket.departure._id} ticket={lastTicket}/>
            })}
        </div>
    )
}

export default LastTicketsList