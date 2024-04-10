import React, { useState } from 'react';
import './ReservePage.style.css'; // CSS 파일을 가져옵니다.

const Reserve = () => {
  const [list, setList] = useState([]);
  
  const alphabet = ['', 'A', 'B', 'C', 'D', 'X', 'E', 'F', 'G', 'H', 'I', 'X','J', 'K', 'L', 'M', 'N', 'O'];
  const occuppiedList = [ 
	[2, 3], [2, 5],[2,10],[2,11],
	[3,6],[3,7],[3,9],[3,10],[3,12],[3,13],
	[7,5], [7,7],[7,8],[7,9],
	[8,5],[8,6],[8,7],[8,8],[8,9],[8,10],
	[9,8],[9,9],[9,11],[9,12],[9,13],[9,17],
	[10,7],[10,8],[10,9],[10,12],
	[11,8],[11,9],[11,10],[11,13],[11,15],[11,16],
	[12,2],[12,3], [12,7],[12,8],[12,13],[12,14],[12,15],
	[15,9],[15,10],[15,12]
	]; // 차지된 좌석 목록
  const hiddenList =[
	[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[5,12],[5,13],[5,14],[5,15],[5,16],[5,17],[5,18],[5,19],[5,20],
	[11,1],[11,2],[11,3],[11,4],[11,5],[11,6],[11,7],[11,8],[11,9],[11,10],[11,11],[11,12],[11,13],[11,14],[11,15],[11,16],[11,17],[11,18],[11,19],[11,20],
	[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[15,6],[16,6],[17,6],
	[1,16],[2,16],[3,16],[4,16],[5,16],[6,16],[7,16],[8,16],[9,16],[10,16],[11,16],[12,16],[13,16],[14,16],[15,16],[16,16],[17,16],
	[1,17], [1,18],[1,19],[1,20],
	[1,2],[1,3],[1,4],[1,5]
	]

  const createSeats = () => {
    const seats = [];
    for (let row = 1; row <= 17; row++) {
      for (let col = 1; col <= 20; col++) {
        const x_value = col >= 6 ? (col >= 16 ? col - 2 : col - 1) : col;
        const seat = {
          row,
          col: x_value,
          yValue: alphabet[row],
          xValue: col === 1 ? alphabet[row] : col === 17 ? col - 1 : col - 1,
          isOccupied: occuppiedList.some(([r, c]) => r === row && c === col),
          isHidden: hiddenList.some(([r, c]) => r === row && c === col)
        };
        seats.push(seat);
      }
    }
    return seats;
  };

  const handleSeatClick = (seat) => {
    if (seat.isOccupied || seat.isHidden) return;
    const newValue = `${seat.yValue}${seat.xValue}`;
    if (list.includes(newValue)) {
      setList(list.filter(item => item !== newValue));
    } else {
      setList([...list, newValue]);
    }
  };

  const sendData = () => {
    const seatData = JSON.stringify(list);
    localStorage.setItem('seat', seatData);
    // 모달 표시 로직 등...
  };

  return (
    <div className="container">
      <h2 id="room">{localStorage.getItem('room')} 영화 좌석</h2>
      <div className="screen">
        <h2 id="screen">Screen</h2>
      </div>
      <div className="seats-container">
        {createSeats().map((seat, index) => (
          <div
            key={index}
            className={`seat ${seat.isOccupied ? 'occupied' : ''} ${seat.isHidden ? 'hidden' : ''} ${seat.col === 1 || (seat.row === 17 && seat.col >= 2) ? 'disable' : ''}`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat.col === 1 && seat.row !== 17 ? seat.yValue : seat.row === 17 ? seat.xValue : ''}
          </div>
        ))}
      </div>
      <h3 className="result">선택한 좌석: {list.join(', ')}</h3>
      <span id="reserved">예약된 좌석</span>
      <button onClick={sendData} id="confirm">좌석예약 확정</button>
    </div>
  );
};

export default Reserve;
