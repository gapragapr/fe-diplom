import './Tooltip.css'

function Tooltip({cityArr, target, setCityArr}){
    const baseStyles = {
        left: target.offsetLeft,
        top: target.offsetTop + target.offsetHeight + 5,
    }

    function tooltipTextClickHandler(event){
        target.value = event.target.textContent

        setCityArr([])
    }
    return (
        <div style={baseStyles} className="tooltip-container">
            <ul className="tooltip">
                {cityArr.map(item => {
                    return <li key={item._id} className="tooltip-item">
                        <p onClick={tooltipTextClickHandler} className="tooltip-text">{item.name}</p>
                    </li>
                })}
            </ul>
        </div>
        
    )
}

export default Tooltip