import "./SearchBox.scss";
import { useState } from "react";

function SearchBox() {
  // 검색 Box 확대 / 축소
  const [box, setBox] = useState(false);
  const handleSearchBox = () => {
    setBox(!box);
  };

  return (
    <div className="SearchBox">
      {/* 검색 input */}
      <input
        type="text"
        name="search"
        autoComplete="off"
        placeholder="Tag Search"
        // on : width 170px | off : width 0px
        className={box ? "searchInput on" : "searchInput off"}
      ></input>
      {/* 검색 버튼 */}
      <div
        // on : border-radius 전체 5px | off : border-radius 우측 부분만 5px
        className={box ? "searchBtn off" : "searchBtn on"}
        onClick={handleSearchBox}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
      </div>
    </div>
  );
}

export default SearchBox;
