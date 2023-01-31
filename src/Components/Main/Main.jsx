import './Main.css'
import Substract from '../../img/Subtract.png'
import Substract2 from '../../img/Subtract (1).png'
import Substract3 from '../../img/Subtract (2).png'
import userImg from '../../img/image (8).png'
import userImg2 from '../../img/image (9).png'


function Main(){

    function handleDotClick(event){
        document.querySelector('.active-dot').classList.remove('active-dot')

        event.target.classList.add('active-dot')
    }

    return(
        <main className="l-screen-main">
            <section id="about-us">
                <div className="section-content">
                    <h2>О нас</h2>
                    <div className="about-us-text">
                        <p>Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем <br />
                            все больше людей заказывают жд билеты через интернет.
                        </p>
                        <p>Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? <br />
                            Мы расскажем о преимуществах заказа через интернет.
                        </p>
                        <p className="bold-text">Покупать жд билеты дешево можно за 90 суток до отправления поезда. <br />
                            Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
                        </p>
                    </div>
                </div>
            </section>
            <section id="how-it-work">
                <div className="section-content">
                    <div className="hiw-row">
                        <h2>Как это работает</h2>
                        <button>Узнать больше</button>
                    </div>
                    <div className="hiw-row">
                        <div className="hiw-card">
                            <div className="hiw-img">
                                <img src={Substract} alt="" />
                            </div>
                            <p className="card-name">Удобный заказ <br /> на сайте</p>
                        </div>
                        <div className="hiw-card">
                            <div className="hiw-img">
                                <img src={Substract2} alt="" />
                            </div>
                            <p className="card-name">Нет необходимости <br /> ехать в офис</p>
                        </div>
                        <div className="hiw-card">
                            <div className="hiw-img">
                                <img src={Substract3} alt="" />
                            </div>
                            <p className="card-name">Огромный выбор <br /> направлений</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id='recents'>
                <div className="section-content">
                    <h2>Отзывы</h2>
                    <div className="slider-container">
                        <div className="slider-items">
                            <div className="slider-item">
                                <div className="slider-item_img">
                                    <img src={userImg} alt="" />
                                </div>
                                <div className="slider-item_content">
                                    <p className="slider-item_name">Екатерина Вальнова</p>
                                    <p className="slider-item_text">
                                        Доброжелательные подсказки <br /> на всех этапах помогут правильно заполнить <br /> поля и без затруднений купить авиа или ж/д <br /> билет, даже если вы заказываете онлайн билет впервые.
                                    </p>
                                </div>
                            </div>
                            <div className="slider-item">
                                <div className="slider-item_img">
                                    <img src={userImg2} alt="" />
                                </div>
                                <div className="slider-item_content">
                                    <p className="slider-item_name">Евгений Стрыкало</p>
                                    <p className="slider-item_text">
                                        СМС-сопровождение до посадки <br /> Сразу после оплаты ж/д билетов <br /> и за 3 часа до отправления мы пришлем вам <br /> СМС-напоминание о поездке.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="slider-dots">
                            <div onClick={handleDotClick} className="dot active-dot"></div>
                            <div onClick={handleDotClick} className="dot"></div>
                            <div onClick={handleDotClick} className="dot"></div>
                            <div onClick={handleDotClick} className="dot"></div>
                            <div onClick={handleDotClick} className="dot"></div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Main;