import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToTicketDataInfo } from '../../../store/ticketFormSlice';

function DateInput({id, type}) {
  const ticketData = useSelector(state => state.ticketForm.ticketData)
  const dispatch = useDispatch()
  
  function clickDateInputHandler(event){
    new AirDatepicker(`#${event.target.id}`, {
        autoClose: true,
        visible: true,
        dateFormat: 'dd.MM.yyyy',
        onSelect({formattedDate}){
          const serverDate = formattedDate.split(".").reverse().join("-");

          dispatch(addToTicketDataInfo({key: type, data: serverDate}))
        },
    })
  }

  return (
    <label>
        <input id={id}
            className='date-input' 
            type="text" 
            placeholder='ДД/ММ/ГГ'
            onClick={clickDateInputHandler}
            value={ticketData[type].split("-").reverse().join(".")}
            readOnly
            />
    </label>
  )
}

export default DateInput