import FindTicketForm from '../../FindTicketForm/FindTicketForm'
import './Header.css'

function Header(){
    return (
        <div className="header-wrapper">
            <nav className="header-nav">
                <ul>
                    <li><a href="">О нас</a></li>
                    <li><a href="">Как это работает</a></li>
                    <li><a href="">Отзывы</a></li>
                    <li><a href="">Контакты</a></li>
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