import { useEffect, useRef, useState } from "react";
import sprite from "src/assets/icons/sprite.svg";

const TimePicker = ({ field, form }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(field.value || "09:00");
  const workTime = [
    { hour: "09", minute: "00" },
    { hour: "09", minute: "30" },
    { hour: "10", minute: "00" },
    { hour: "10", minute: "30" },
    { hour: "11", minute: "00" },
    { hour: "11", minute: "30" },
    { hour: "12", minute: "00" },
    { hour: "12", minute: "30" },
    { hour: "13", minute: "00" },
    { hour: "13", minute: "30" },
    { hour: "14", minute: "00" },
    { hour: "14", minute: "30" },
    { hour: "15", minute: "00" },
    { hour: "15", minute: "30" },
    { hour: "16", minute: "00" },
    { hour: "16", minute: "30" },
    { hour: "17", minute: "00" },
    { hour: "17", minute: "30" },
    { hour: "18", minute: "00" },
    { hour: "18", minute: "30" },
    { hour: "19", minute: "00" },
    { hour: "19", minute: "30" },
    { hour: "20", minute: "00" },
  ];
  const dropdownRef = useRef(null);

    const handleTimeSelect = time => {
    const formattedTime = `${time.hour}:${time.minute}`;
    setSelectedTime(formattedTime);
    setIsOpen(false);
    form.setValue(field.name, formattedTime);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="border-waterloo/10 flex cursor-pointer items-center justify-between rounded-xl border px-4.5 py-4"
        onClick={() => setIsOpen(!isOpen)}>
        {selectedTime}
        <svg className="fill-transparent stroke-current" width={20} height={20}>
          <use href={`${sprite}#icon-clock`} />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 z-1 mt-2 h-45 overflow-y-scroll rounded-xl bg-white py-4 pr-8.5 pl-4 shadow-[0_20px_69px_0_rgba(0,0,0,0.07)]">
          <p className="text-right leading-normal font-medium">Meeting time</p>
          <ul className="mt-4 flex flex-col items-end gap-1">
            {workTime.map(time => (
              <li
                className={`flex h-6 cursor-pointer gap-2 font-medium text-base leading-5 ${selectedTime === `${time.hour}:${time.minute}` ? "text-waterloo" : "text-waterloo/30"}`}
                key={time}
                onClick={() => handleTimeSelect(time)}>
                <span>{time.hour}</span>: <span>{time.minute}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
