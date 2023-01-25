import './Header.css'
import { useNavigate } from 'react-router'

function Header({children}){
    const navigate = useNavigate()

    function clickAnchorHandler(event){
        event.preventDefault()
        navigate('/')

        setTimeout(() => {
            const anchor = document.querySelector(event.target.hash)
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            })
        }, 0)
    }
    return (
        <div className="header-wrapper">
            <nav className="header-nav">
                <ul>
                    <li><a onClick={clickAnchorHandler} href="./#about-us">О нас</a></li>
                    <li><a onClick={clickAnchorHandler} href="./#how-it-work">Как это работает</a></li>
                    <li><a onClick={clickAnchorHandler} href="./#recents">Отзывы</a></li>
                    <li><a onClick={clickAnchorHandler} href="./#contacts">Контакты</a></li>
                </ul>
            </nav>
            <header>
                <div className="header-content">
                    {children}
                </div>
            </header>
        </div>
    )
}

export default Header