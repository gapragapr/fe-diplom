import FindTicketForm from '../FindTicketForm/FindTicketForm'
import './Header.css'

function Header(){

    function clickAnchorHandler(event){
        event.preventDefault()

        const anchor = document.querySelector(event.target.hash)
        anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        })
    }
    return (
        <div className="header-wrapper">
            <nav className="header-nav">
                <ul>
                    <li><a onClick={clickAnchorHandler} href="#about-us">О нас</a></li>
                    <li><a onClick={clickAnchorHandler} href="#how-it-work">Как это работает</a></li>
                    <li><a onClick={clickAnchorHandler} href="#recents">Отзывы</a></li>
                    <li><a onClick={clickAnchorHandler} href="#contacts">Контакты</a></li>
                </ul>
            </nav>
            <header>
                <div className="header-content">
                    <div className="header-column">
                        <h1>Вся жизнь - <br /> <span>путешествие!</span></h1>
                    </div>
                    <div className="header-column">
                        <FindTicketForm type='column'/>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header