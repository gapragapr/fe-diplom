import { useDispatch, useSelector } from 'react-redux'
import { addToTicketDataInfo } from '../../../store/ticketFormSlice'; 

function Checkbox({type}) {
    const dispatch = useDispatch()
    const ticketData = useSelector(state => state.ticketForm.ticketData)


    let checked = false;

    Object.entries(ticketData).map(([key, value]) =>{
        if (key == type){
            value == '' ? checked = false : checked = true
        } 
    })


    

    function toggleChecked(event){
        dispatch(addToTicketDataInfo({key: type, data: event.target.checked}))
    }


    return (
        <>
            <label className="checkbox-google">
                <input onClick={toggleChecked} type="checkbox" defaultChecked={checked}/>
                <span className="checkbox-google-switch"></span>
            </label>
        </>
    )
}

export default Checkbox