import laodingAnimation from '../../img/loadingAnimation.gif'
import './LoadingPage.css'

function LoadingPage(){
    return (
        <div className="loading_container">
            <h1>Идет поиск</h1>
            <img src={laodingAnimation} alt="" className="loading_gif" />
        </div>
    )
}

export default LoadingPage