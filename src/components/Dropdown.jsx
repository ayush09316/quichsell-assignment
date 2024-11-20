import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";

const Dropdown = ({ handleSelect, selected, dropdownOptions }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <Button
        text="Display"
        lefticon={"./Display.svg"}
        righticon={"./down.svg"}
        handleClick={toggleMenu}
      />

      {menuVisible && (
        <div className="dropdown-menu">
          {dropdownOptions.map((options, i) => (
            <div key={i} className="dropdown-menu_submenu">
              <p className="label">{options.label}</p>
              <select
                className="dropdown-select"
                value={i === 0 ? selected.groupBy : selected.orderBy}
                onChange={(e) => {
                  handleSelect(e.target.value,i);
                  setMenuVisible(false); // Close the dropdown on selection
                }}
              >
                {options.submenu.map((sub, i) => (
                  <option value={sub.value} key={i}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
