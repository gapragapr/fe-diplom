import { useSelector, useDispatch } from "react-redux"
import PassengerCard from "./PassengerCard/PassengerCard"
import { setStep } from "../../store/appSlice"
import { useNavigate } from "react-router"
import './PassengersList.css'

function PassengerList(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentSeats = useSelector(state => state.currentTicket.currentSeats)
    const passengers = useSelector(state => state.currentTicket.passengers)

    function getClassNameToNextButton(){
        const result = passengers.every(item => {
            return Object.values(item).every(value => value !== '')
        })

        if (result){
            return 'next_page active_button'
        } else {
            return 'next_page nonactive_button'
        }
    }
    function clickNextPageButtonHandler(event){
        if (event.target.classList.contains('nonactive_button')){
          return
        }
  
        event.preventDefault()
        navigate('/payment')
        dispatch(setStep({step: 2}))
      }

    return(
        <div className="passengers_list">
            {currentSeats.map((seat, index) => {
                return <PassengerCard key={index} passenger={passengers[index]} index={index + 1} seat={seat} />
            })}

            <div className="button_container">
            <button onClick={(e) => clickNextPageButtonHandler(e)} className={getClassNameToNextButton()}>
                Далее
            </button>
            </div>
        </div>
    )

}

export default PassengerList