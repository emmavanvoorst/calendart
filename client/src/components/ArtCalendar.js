import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const ArtCalendar = () => {
    return (
        <div className='app'>
          <h1 className='text-center'>React Calendar</h1>
          <div className='calendar-container'>
            <Calendar />
          </div>
        </div>
      );
}

export default ArtCalendar;