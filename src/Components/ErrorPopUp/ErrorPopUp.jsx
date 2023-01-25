import { useSelector } from "react-redux"
import './ErrorPopUp.css'

function ErrorPopUp(){
    const {isError} = useSelector(state => state.appFundamentalState)


    return(
        <>
            {isError && 
                <div className="error_popup">
                    <h2 className="error-title">Что-то пошло не так...</h2>

                </div>
            }
        </>
    )
}

export default ErrorPopUp