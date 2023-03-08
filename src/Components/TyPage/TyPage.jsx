import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import { useSelector } from "react-redux"
import svgs from "../../data/svg"
import ellipse1 from "../../img/Ellipse.png"
import ellipse2 from "../../img/Ellipse (1).png"
import ellipse3 from "../../img/Ellipse (2).png"
import { useNavigate } from "react-router"
import './TyPage.css'

function TyPage(){
    const navigation = useNavigate()
    const paymentDetails = useSelector(state => state.currentTicket.paymentDetails)
    const price = useSelector(state => state.currentTicket.price)

    function clickStarHandler(e, index){
        const stars = Array.from(document.querySelectorAll('.star'))
        stars.forEach(item => item.classList.remove('active_star'))
        stars.forEach((item, itemIndex) => {
            if (itemIndex <= index){
                item.classList.add('active_star')
            }
        })
    }
    function clickBackToHomeButtonHandler(){
        navigation('/')
        window.location.reload(false)
    }
    
    return(
        <div className="ty_page">
            <Header />
            <div className="ty_card">
                <div className="ty_row">
                    <p className="big_bold">№Заказа 285АА</p>
                    <p className="grey">сумма <span className="big_bold">{price.departure + price.arrival}</span> {svgs.ruble}</p>
                </div>
                <div className="ty_row">
                    <div className="ty_sub_row ellipses_row">
                        <div className="ellepse">
                            <img src={ellipse1} alt="" />
                            <p className="ellipse_text">билеты будут отправлены на ваш e-mail</p>
                        </div>
                        <div className="ellepse">
                            <img src={ellipse2} alt="" />
                            <p className="ellipse_text">распечатайте и сохраняйте билеты до даты поездки</p>
                        </div>
                        <div className="ellepse">
                            <img src={ellipse3} alt="" />
                            <p className="ellipse_text">предьявите распечатанные билеты при посадке</p>
                        </div>
                    </div>
                    <div className="ty_sub_row">
                        <p className="big_bold">{paymentDetails.name} {paymentDetails.fatherName}!</p>
                        <p className="minor_text">Ваш заказ успешно оформлен. </p>
                        <p className="minor_text">В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
                        <p className="ty_text">Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
                    </div>
                </div>
                <div className="ty_row">
                    <div className="service_stars">
                        <p className="service_text">Оценить сервис</p>
                       <div className="stars">
                        <div onClick={(e) => clickStarHandler(e, 0)} className="star">{svgs.star}</div>
                        <div onClick={(e) => clickStarHandler(e, 1)} className="star">{svgs.star}</div>
                        <div onClick={(e) => clickStarHandler(e, 2)} className="star">{svgs.star}</div>
                        <div onClick={(e) => clickStarHandler(e, 3)} className="star">{svgs.star}</div>
                        <div onClick={(e) => clickStarHandler(e, 4)} className="star">{svgs.star}</div>
                       </div>
                    </div>
                    <button onClick={clickBackToHomeButtonHandler} className="back_home">вернуться на главную</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TyPage