import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const ArtCalendar = () => {
    return (
        <div className='app'>
          <div className='calendar-container'>
            <Calendar />
          </div>
        </div>
      );
}

export default ArtCalendar;