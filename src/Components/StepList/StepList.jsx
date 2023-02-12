import './StepList.css'
import borderArrow from '../../img/Vector (10).png'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function StepList() {
    const currentStep = useSelector(state => state.appFundamentalState.step)
    const stepArrow = <svg width="38" height="99" viewBox="0 0 38 99" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L36.6208 48.1734C37.4353 49.2521 37.4279 50.7422 36.6027 51.8128L1 98" stroke="#E5E5E5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    
    useEffect(() => {
        function getClasses(){
            const steps = Array.from(document.querySelectorAll('.step_item'))
            
            steps.map((item, index) => {
                if (index <= currentStep){
                    item.classList.add('step_item-active')
                }
                if (index < currentStep){
                    item.children[1].style.backgroundColor = 'transparent'
                    item.children[1].style.clipPath = 'none'
                    
                }
            })
        }

        getClasses()
    })

  
    return (
    <div className="steplist">
        <div style={{flexGrow: 3}} className="step_item">
            <p><span className="step_number">1</span> Билеты</p>
            {stepArrow}
        </div>
        <div style={{flexGrow: 2}} className="step_item">
            <p><span className="step_number">2</span> Пассажиры </p>
            {stepArrow}
        </div>
        <div style={{flexGrow: 2}} className="step_item">
            <p><span className="step_number">3</span> Оплата </p>
            {stepArrow}
        </div>
        <div style={{flexGrow: 3, justifyContent: 'center'}} className="step_item">
            <p><span className="step_number">4</span> Проверка</p>
        </div>
    </div>
  )
}

export default StepList