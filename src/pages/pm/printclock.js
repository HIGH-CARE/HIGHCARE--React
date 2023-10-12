import React, { useEffect } from 'react';
import './pm-member.css';

const Clock = () => {
  useEffect(() => {
    const clock = document.querySelector('.main-clock');

    function getTime() {
      const time = new Date();
      const minutes = time.getMinutes();
      const hours = time.getHours();
      const seconds = time.getSeconds();
      clock.innerHTML = `
        ${hours < 10 ? `0${hours}` : hours}:
        ${minutes < 10 ? `0${minutes}` : minutes}:
        ${seconds < 10 ? `0${seconds}` : seconds}
      `;
    }

    function init() {
      getTime();
      setInterval(getTime, 1000);
    }

    init();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

  return (
    <div className="clock-location"> 
      <div className="main-clock"></div>  
    </div>
  );
}

export default Clock;