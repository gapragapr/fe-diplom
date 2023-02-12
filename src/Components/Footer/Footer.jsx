import './Footer.css'
import svgs from '../../data/svg';

function Footer() {
    function clickScrollToTopButtonHandler(){
        const body = document.querySelector('body');
        body.scrollIntoView({behavior: 'smooth'})
    }

    function clickEmailSubscribeHandler(event){
        event.preventDefault()

        const emailInput = document.querySelector('.footer-form input');
        if (emailInput.validity.valid){
            fetch( `https://netology-trainbooking.netoservices.ru/subscribe?email=${emailInput.value}` )
                .then( response => response.json())
                .then( data => console.log( data ));
        }
        
    }
    return (
        <div className="footer-container">
            <footer id='contacts'>
                <div className="footer-floor">
                    <div className="footer-floor_column">
                        <h2 className="floor_name">Свяжитесь с нами</h2>
                        <ul className="contacts_list">
                            <li><a href="tel:88000000000">{svgs.phoneSvg} 8 (800) 000 00 00</a></li>
                            <li><a href="mailto:inbox@mail.ru">{svgs.mailSvg} inbox@mail.ru</a></li>
                            <li><a href="">{svgs.skypeSvg} tu.train.tickets</a></li>
                            <li><a href="">{svgs.locationSvg} г. Москва <br /> ул. Московская 27-35 <br /> 555 555</a></li>
                        </ul>
                    </div>
                    <div className="footer-floor_column">
                        <h2 className="floor_name">Подписка</h2>
                        <form className="footer-form">
                            <p>Будьте в курсе событий</p>
                            <label>
                                <input type="email" placeholder='e-mail' required/>
                            </label>
                            <button onClick={clickEmailSubscribeHandler}>отправить</button>
                        </form>
                        <h2 className="floor_name">Подписывайтесь на нас</h2>
                        <ul className="socials_list">
                            <li><a target="_blank" href="https://youtube.com/">{svgs.youtubeSvg}</a></li>
                            <li><a target="_blank" href="https://ru.linkedin.com/">{svgs.linkedinSvg}</a></li>
                            <li><a target="_blank" href="https://www.google.com/webhp?hl=ru&sa=X&ved=0ahUKEwj3xIHX8-z7AhXGiIsKHZz8BGYQPAgI">{svgs.googleSvg}</a></li>
                            <li><a target="_blank" href="https://ru-ru.facebook.com/">{svgs.facebookSvg}</a></li>
                            <li><a target="_blank" href="https://twitter.com/?lang=ru">{svgs.twitterSvg}</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
            <div className="footer-interface">
                <a href="">Лого</a>
                <button onClick={clickScrollToTopButtonHandler}>{svgs.toUpButtonSvg}</button>
                <span>2018 WEB</span>
            </div>
        </div>
    )
}

export default Footer