import Header from "../Header/Header"
import FindTicketForm from "../FindTicketForm/FindTicketForm"
import SidebarDetails from "../SidebarDetails/SidebarDetails"
import StepList from "../StepList/StepList"
import AcceptItems from "./AcceptItems/AcceptItems"
import Footer from "../Footer/Footer"

function AcceptPage(){
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
                        <AcceptItems />
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default AcceptPage