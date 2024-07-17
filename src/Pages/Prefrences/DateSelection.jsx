import React from "react";
import HighlightAltOutlinedIcon from "@mui/icons-material/HighlightAltOutlined";
import StartOutlinedIcon from "@mui/icons-material/StartOutlined";
import KeyboardTabOutlinedIcon from "@mui/icons-material/KeyboardTabOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { DatePickerDemo } from "./CalanderPopup";
import RadioButton from "@/components/Coustom/RadioButton";

function DateSelection({ value, onChange }) {
  const dateOptions = [
    {
      id: "all",
      label: "All",
      icon: <HighlightAltOutlinedIcon />,
    },
    {
      id: "next-week",
      label: "Next Week",
      icon: <StartOutlinedIcon />,
    },
    {
      id: "next-month",
      label: "Next Month",
      icon: <KeyboardTabOutlinedIcon />,
    },
  ];

  const handleDateChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption !== "choose-date") {
      onChange(selectedOption);
    }
  };

  const handleCalendarDateChange = (newDate) => {
    onChange(newDate);
  };

  return (
    <div className="flex flex-col gap-4 h-full ">
    
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {dateOptions.map((option) => (
          <li key={option.id} className="w-full flex flex-col justify-between">
            <RadioButton
              id={option.id}
              label={option.label}
              icon={option.icon}
              checked={value === option.label}
              handleSelection={handleDateChange}
              name="date-option"
            />
            {/* <input
              type="radio"
              id={option.id}
              name="date-option"
              value={option.id}
              className="hidden peer"
              checked={value === option.id}
              onChange={handleDateChange}
            />
            <label
              htmlFor={option.id}
              className="flex flex-col justify-between gap-4 h-full w-full items-center
              p-4 text-gray-500 bg-white border-2 border-gray-200 
              rounded-md cursor-pointer peer-checked:border-[#6F7E8C]
            hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
            >
              <div className="flex justify-end items-center">{option.icon}</div>
              <div className="text-lg font-semibold text-center">
                {option.label}
              </div>
            </label> */}
          </li>
        ))}
        <li className="w-full flex flex-col justify-between">
          <input
            type="radio"
            id="choose-date"
            name="date-option"
            value="choose-date"
            className="hidden peer"
            checked={value instanceof Date}
            onChange={() => {}} // This is handled by the DatePickerDemo component
          />
          <label
            htmlFor="choose-date"
            className="flex flex-col justify-between gap-4 w-full items-center
                      p-4 text-gray-500 bg-white border-2 border-gray-200 
                      rounded-lg cursor-pointer peer-checked:border-[#6F7E8C]
                    hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
          >
            <div className="flex justify-end items-center">
              <CalendarTodayOutlinedIcon />
            </div>
            <div className="text-lg font-semibold text-center">
              <DatePickerDemo
                date={value instanceof Date ? value : null}
                setDate={handleCalendarDateChange}
              />
            </div>
          </label>
        </li>
      </ul>
    </div>
  );
}

export default DateSelection;
