// main.js

import React, { useState, useEffect } from 'react';
import './Main.css';

function Main() {
  const [items, setItems] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [itemActive, setItemActive] = useState(0);

  // Your data for items and thumbnails
  const data = [
    { image: 'img/Maldives.jpg', place: 'Kaafu Atoll', country: 'Maldives', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aut!' },
    { image: 'img/Srilanka.jpg', place: 'Sigiriya', country: 'Sri Lanka', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aut!' },
    { image: 'img/Grand Canyon.jpg', place: 'Grand Cayon', country: 'USA', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aut!'},
    { image: 'img/Machu Picchu.jpg', place: 'Machu Picchu', country: 'Peru', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aut!'},
    { image: 'img/Bali.jpg', place: 'Bali', country: 'Indonesia', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aut!'}
    // Add more data for items as needed
  ];

  useEffect(() => {
    setItems(data);
    setThumbnails(data);
  }, []);

  const nextItem = () => {
    setItemActive((prevItem) => (prevItem + 1) % items.length);
  };

  const prevItem = () => {
    setItemActive((prevItem) => (prevItem - 1 + items.length) % items.length);
  };

  const selectItem = (index) => {
    setItemActive(index);
  };

  return (
    <div className="slider">
      <div className="list">
        {items.map((item, index) => (
          <div key={index} className={`item ${index === itemActive ? 'active' : ''}`}>
            <img src={item.image} alt="" />
            <div className="content">
              <p>{item.place}</p>
              <h2>{item.country}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button id="prev" onClick={prevItem}>{'<'}</button>
        <button id="next" onClick={nextItem}>{'>'}</button>
      </div>
      <div className="thumbnail">
        {thumbnails.map((thumbnail, index) => (
          <div key={index} className={`item ${index === itemActive ? 'active' : ''}`} onClick={() => selectItem(index)}>
            <img src={thumbnail.image} alt="" />
            {/* <div className="content">{thumbnail.country}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
