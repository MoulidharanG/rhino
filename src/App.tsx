import { useEffect, useState } from "react";
import "./App.css";
import sleepingRhino from "./assets/sleepingRhino.png"; 
import zzzGif from "./assets/zzz.png"; 
import bgimage from "./assets/night-grass.jpg"; 
import yawnSound from "./assets/yawnsound.mp3";


function getCalendarDiff(fromDate: Date, toDate: Date) {
  // start with simple difference
  let years = toDate.getFullYear() - fromDate.getFullYear();
  let months = toDate.getMonth() - fromDate.getMonth();
  let days = toDate.getDate() - fromDate.getDate();
  let hours = toDate.getHours() - fromDate.getHours();
  let minutes = toDate.getMinutes() - fromDate.getMinutes();
  let seconds = toDate.getSeconds() - fromDate.getSeconds();

  // borrow for seconds -> minutes
  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }

  // borrow for minutes -> hours
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  // borrow for hours -> days
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }

  // borrow for days -> months
  if (days < 0) {
    // Find the number of days in the previous month of 'toDate'
    // Construct date for last day of previous month: day 0 of current month
    const prevMonthLastDay = new Date(toDate.getFullYear(), toDate.getMonth(), 0).getDate();
    days += prevMonthLastDay;
    months -= 1;
  }

  // borrow for months -> years
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Clamp negatives to zero (just in case 'fromDate' is in the future)
  if (years < 0) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return { years, months, days, hours, minutes, seconds };
}
function App() {
  const [timeAlive, setTimeAlive] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const birthDate = new Date("2000-09-26T02:22:00");

    const tick = () => {
      const now = new Date();
      setTimeAlive(getCalendarDiff(birthDate, now));
    };

    tick(); // initial
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const playYawn = () => {
    const audio = new Audio(yawnSound);
    audio.volume = 0.4; // soft volume
    audio.play();
  };
  
  return (
    <div className="container"  style={{
      backgroundImage: `url(${bgimage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

<div className="hibernation-box">
  <p className="typing-title">
    ...This user went into hibernation for a long time.
  </p>

  <p className="wake-link delayed">
  <a href="#" onClick={playYawn}>Wake him up?</a>
</p>


</div>

      <div className="sleep-box">
        <img src={sleepingRhino} className="rhino" alt="Sleeping Rhino" />
        <img src={zzzGif} className="zzz z1" alt="Sleeping Zzz" />
        <img src={zzzGif} className="zzz z2" alt="Sleeping Zzz" />
        <img src={zzzGif} className="zzz z3" alt="Sleeping Zzz" />
      </div>

     
     
      <div className="alive-container">
      <p className="alive-text">
        Alive since
      </p>
      <p className="timer">
      {timeAlive.years} years • {timeAlive.months}month • {timeAlive.days}days •{" "}
        {String(timeAlive.hours).padStart(2, "0")}:
        {String(timeAlive.minutes).padStart(2, "0")}:
        {String(timeAlive.seconds).padStart(2, "0")}
      </p>
      </div>
     

      
    </div>
  );
}

export default App;
