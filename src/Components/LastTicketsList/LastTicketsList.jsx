import LastTicket from "./LastTicket/LastTicket"
import { useSelector } from "react-redux"


function LastTicketsList(){
    const lastTicketsArr = useSelector(state => state.roadsFromServer.lastRoadsArr)

    
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