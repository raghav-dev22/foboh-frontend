import React,{useState} from 'react'
import DatePicker from 'react-datepicker';


function Calendar() {
    
  const [startDate, setStartDate] = useState(new Date());
    return (
        <div>
            <div className="relative max-w-sm datePickerBox">
                <DatePicker className=" border border-inherit rounded-md  pl-2.5 p-2.5 datepicker" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
        </div>
    )
}

export default Calendar
