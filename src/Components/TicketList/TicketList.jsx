import Ticket from "./Ticket/Ticket"
import './TicketList.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addToTicketDataInfo, setCount } from '../../store/ticketFormSlice';
import { fetchWithTicketData } from "../../store/ticketFormSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import svgs from "../../data/svg";
import usePagination from "../../hooks/usePagination";

function TicketList(){
    const dispatch = useDispatch()
    const ticketData = useSelector(state => state.ticketForm.ticketData)
    const ticketArr = useSelector(state => state.roadsFromServer.roadsArr)
    const roadsCount = useSelector(state => state.roadsFromServer.roadsCount)
    const countPerPage = useSelector(state => state.ticketForm.countPerPage)
    const navigate = useNavigate()
    const [needFetch, setNeedFetch] = useState(false)
    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        gaps,
        setPage,
        totalPages,
      } = usePagination({
        contentPerPage: countPerPage,
        count: ticketArr.length
      });

    if (needFetch){
        dispatch(fetchWithTicketData(ticketData))
    }

    useEffect(() => {
        if (ticketData.from_city_id == '' || ticketData.to_city_id == ''){
            navigate('/')
        }
    }, [])

    useEffect(() => {
        const numbers = Array.from(document.querySelectorAll('.show_number span'))
        const sortItems = Array.from(document.querySelectorAll('.sort_item'))

        sortItems.map(item => {
            if (item.textContent == 'времени' && ticketData.sort == 'date'){
                item.classList.add('active_sort')
            }
            if (item.textContent == 'цене' && ticketData.sort == 'min_price'){
                item.classList.add('active_sort')
            }
            if (item.textContent == 'длительности' && ticketData.sort == 'duration'){
                item.classList.add('active_sort')
            }
        })
        
        numbers.map(item => {
            if (item.textContent == countPerPage){
                item.classList.add('active_sort_number')
                item.classList.add('number_item')
            }
            item.classList.add('number_item')
        })

    }, [countPerPage])


    function clickSortNumberHandler(event){
        if (event.target.textContent == countPerPage) {return}

        const numbers = Array.from(document.querySelectorAll('.show_number span'))
        
        numbers.map(item => {
            item.classList.remove('active_sort_number')
            event.target.classList.add('active_sort_number')
        })

        dispatch(setCount({count: event.target.textContent}))

        if (ticketArr.length !== 0){
            
        }
    }

    function getClassToCount(count){
        let result = 'page_count';
        
        if (count % 2 == 0){
            result += ' page_count_preactive'
        }
        if (count + 1 === page){
            result += ' page_count_active'
        }
        
        return result
    }

    function onMouseEnterSortHandler(e){
        if (e.target.tagName !== 'UL') return 
        e.target.classList.add('active_ul')
    }

    function onMouseLeaveSorthandler(e){
        e.target.classList.remove('active_ul')
    }

    function clickToSortItemHandler(e){
        if (e.target.textContent == 'времени') dispatch(addToTicketDataInfo({key: 'sort', data: 'date'}))
        if (e.target.textContent == 'цене') dispatch(addToTicketDataInfo({key: 'sort', data: 'min_price'}))
        if (e.target.textContent == 'длительности') dispatch(addToTicketDataInfo({key: 'sort', data: 'duration'}))

        setNeedFetch(true)
    }

    return(
        <div className="tickets">
            <div className="tickets_info">
                <p className="finded_tickets">найдено: {ticketArr.length}</p>
                <div className="sort_settings">
                    <div className="sort">сортировать по: 
                        <ul onMouseLeave={(e) => onMouseLeaveSorthandler(e)} onMouseEnter={(e) => onMouseEnterSortHandler(e)}>
                            <li onClick={(e) => clickToSortItemHandler(e)} className="sort_item">времени</li>
                            <li onClick={(e) => clickToSortItemHandler(e)} className="sort_item">цене</li>
                            <li onClick={(e) => clickToSortItemHandler(e)} className="sort_item">длительности</li>
                        </ul>
                    </div>
                    <p className="show_number">показывать по: <span onClick={(e) => clickSortNumberHandler(e)}>5</span> <span onClick={(e) => clickSortNumberHandler(e)}>10</span> <span onClick={(e) => clickSortNumberHandler(e)}>20</span></p>
                </div>

            </div>
            {ticketArr.slice(firstContentIndex, lastContentIndex)
                    .map(ticket => {
                    return <Ticket key={ticket.departure._id} ticket={ticket} />
                    }) 
            }
            <div className="pagination">
                <button onDoubleClick={() => setPage(1)} onClick={page > 0 && prevPage} className="page_count">
                   {svgs.arrowBack}
                </button>
                {[...Array(totalPages).keys()].slice(page - 1, page + 2).map(el => {
                    return <button onClick={() => {setPage(el + 1)}} key={el} className={getClassToCount(el)}>{el + 1}</button>
                })
                    
                }
                {page + 2 < totalPages && <button className="page_count">...</button>}
                {page + 2 < totalPages && <button onClick={() => setPage(totalPages)} className="page_count">{totalPages}</button>}
                <button onClick={nextPage} className="page_count">
                    {svgs.arrowFront}
                </button>
            </div>
            
        </div>
    )
}

export default TicketList