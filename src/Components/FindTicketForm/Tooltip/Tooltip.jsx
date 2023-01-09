import './Tooltip.css'
import { clearCityesStore } from '../../../store/tooltipSlice'
import { useDispatch } from 'react-redux'
import { addToTicketDataInfo } from '../../../store/ticketFormSlice'

function Tooltip({cityArr, target}){
    const dispatch = useDispatch()
    const baseStyles = {
        left: target.offsetLeft,
        top: target.offsetTop + target.offsetHeight + 5,
    }

    function tooltipTextClickHandler(item){
        target.value = item.name
        
        target.id === 'fromRoadInput' ? dispatch(addToTicketDataInfo({key: 'city_id_from', data: item._id})) : dispatch(addToTicketDataInfo({key: 'city_id_to', data: item._id}))
        dispatch(clearCityesStore())
    }
    return ( 
        <div style={baseStyles} className="tooltip-container">
            <ul className="tooltip">
                {cityArr.map(item => {
                    return  <li key={item._id} className="tooltip-item">
                                <p onClick={() => tooltipTextClickHandler(item)} className="tooltip-text">{item.name}</p>
                            </li>
                })}
            </ul>
        </div>     
    )
}

export default Tooltip