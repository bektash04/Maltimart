import React, {useState, useEffect} from "react";
import '../../style/Clock.css'

const Clock = () => {
  const [days, SetDays] = useState()
  const [hours, SetHours] = useState()
  const [minutes, SetMinutes] = useState()
  const [seconds, SetSeconds] = useState()

  let interval;

  const counDown = () => {
    const destination = new Date("dec 20, 2024").getTime()

    interval = setInterval(() => {
      const now = new Date().getTime()    
      const different = destination  - now
      const days = Math.floor(different / (1000 * 60 * 60 * 24))            

      const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))

      const minutes = Math.floor(different % (1000 * 60 * 60) / (1000 * 60))

      const seconds = Math.floor(different % (1000 * 60 ) / 1000 )
      
      if(destination  < 0) clearInterval(interval.current)
        else{
          SetDays(days)
          SetHours(hours)  
          SetMinutes(minutes)
          SetSeconds(seconds)
      }
    })
  }

  useEffect(() => {
    counDown()
  })
  return (
    <div className="clock__wrapper ">
      <div className="clock__data ">
        <div className="text-center">
          <h1 className="text-w1 mb-2">{days}</h1>
          <h5 className="">Days</h5>
        </div>
        <span className="">:</span>
      </div>
      <div className="clock__data ">
        <div className="text-center">
          <h1 className="text-w1 mb-2">{hours}</h1>
          <h5 className="">Hours</h5>
        </div>
        <span className="">:</span>
      </div>
      <div className="clock__data ">
        <div className="text-center">
          <h1 className="text-w1 mb-2" >{minutes}</h1>
          <h5 className="">Minutes</h5>
        </div>
        <span className="">:</span>
      </div>
      <div className="clock__data ">
        <div className="text-center">
          <h1 className="text-w1 mb-2">{seconds}</h1>
          <h5 className="">Seconds</h5>
        </div>
      </div>
    </div>
  );
};

export default Clock;
