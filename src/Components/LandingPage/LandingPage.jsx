import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import FindTicketForm from '../FindTicketForm/FindTicketForm'

function LandingPage(){
    return(
        <>
            <Header >
                <div className="header-column">
                        <h1>Вся жизнь - <br /> <span>путешествие!</span></h1>
                    </div>
                    <div className="header-column">
                        <FindTicketForm type='column'/>
                    </div>
            </Header>
            <Main />
            <Footer />
        </>
    )
}

export default LandingPage