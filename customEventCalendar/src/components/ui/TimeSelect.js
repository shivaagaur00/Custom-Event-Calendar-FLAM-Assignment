import React from 'react';

export default function TimeSelect({ value, onChange }) {
  const hours = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
    "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23"
  ];
  
  const minutes = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
  ];

  const handleHourChange = (event) => {
    const selectedHour = event.target.value;
    const currentMinute = value.split(':')[1];
    onChange(`${selectedHour}:${currentMinute}`);
  };

  const handleMinuteChange = (event) => {
    const currentHour = value.split(':')[0];
    const selectedMinute = event.target.value;
    onChange(`${currentHour}:${selectedMinute}`);
  };

  return (
    <div className="flex border rounded-md divide-x">
      <select
        value={value.split(':')[0]}
        onChange={handleHourChange}
        className="px-2 py-1 w-full rounded-l-md focus:outline-none"
      >
        {hours.map(hour => (
          <option key={hour} value={hour}>{hour}</option>
        ))}
      </select>
      
      <span className="flex items-center px-1 bg-gray-50">:</span>
      
      <select
        value={value.split(':')[1]}
        onChange={handleMinuteChange}
        className="px-2 py-1 w-full rounded-r-md focus:outline-none"
      >
        {minutes.map(minute => (
          <option key={minute} value={minute}>{minute}</option>
        ))}
      </select>
    </div>
  );
}