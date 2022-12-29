import './Tooltip.css'

function Tooltip({cityArr, target, setCityArr, data, setData}){
    const baseStyles = {
        left: target.offsetLeft,
        top: target.offsetTop + target.offsetHeight + 5,
    }

    function findCurrentId(cityName){
        cityArr.map(item => {
            if(item.name == cityName){
                target.id == 'fromRoadInput' ? setData({...data, id_city_from: item._id}) : setData({...data, id_city_to: item._id})
            }
        })
    }

    function tooltipTextClickHandler(event){
        target.value = event.target.textContent
        findCurrentId(target.value)

        setCityArr([])
    }
    return (
        <div style={baseStyles} className="tooltip-container">
            <ul className="tooltip">
                {cityArr.map(item => {
                    return  <li key={item._id} className="tooltip-item">
                                <p onClick={tooltipTextClickHandler} className="tooltip-text">{item.name}</p>
                            </li>
                })}
            </ul>
        </div>
        
    )
}

export default Tooltip