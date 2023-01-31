import Header from "../Header/Header"
import FindTicketForm from "../FindTicketForm/FindTicketForm"
import Footer from '../Footer/Footer'
import LoadingPage from "../LoadingPage/LoadingPage"
import TicketList from "../TicketList/TicketList"
import LastTicketsList from "../LastTicketsList/LastTicketsList"
import SidebarSettings from "../SidebarSettings/SidebarSettings"
import './TicketPage.css'
import { useSelector } from "react-redux"

function TicketPage(){
    const isLoading = useSelector(state => state.appFundamentalState.isLoading)
    const isError = useSelector(state => state.appFundamentalState.isError)

    return (
        <>
            <Header>
                <div className="header-row">
                    <FindTicketForm type={'row'}/>
                </div>
            </Header>
            {isLoading && <LoadingPage />}
            {!isLoading && <div className="ticket_page">
                <div className="ticket-page_wrapper">
                    <div className="ticket-page_column">
                        <SidebarSettings />
                        <LastTicketsList />
                    </div>
                    <div className="ticket-page_column"><TicketList /></div>
                </div> 
            </div>}
            <Footer />
        </>
    )
}

export default TicketPage