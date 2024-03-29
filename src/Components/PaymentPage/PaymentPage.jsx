import Header from "../Header/Header"
import FindTicketForm from "../FindTicketForm/FindTicketForm"
import StepList from "../StepList/StepList"
import Footer from "../Footer/Footer"
import SidebarDetails from '../SidebarDetails/SidebarDetails'
import PaymentCard from "./PaymentCard/PaymentCard"

function PaymentPage(){
    return(
        <>
            <Header>
                <div className="header-row">
                    <FindTicketForm type={'row'}/>
                </div>
            </Header>
            <StepList />
            <div className="passengers-page_container">
                <div className="passengers-page_wrapper">
                    <div className="passengers-page_column">
                        <SidebarDetails />
                    </div>
                    <div className="passengers-page_column">
                        <PaymentCard />
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentPage