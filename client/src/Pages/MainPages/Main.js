// main.js

import React, { useState, useEffect } from 'react';
import './Main.css';

function Main() {
  const [items, setItems] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [itemActive, setItemActive] = useState(0);

  // Your data for items and thumbnails
  const data = [
    { image: 'img/Maldives.jpg', place: 'Theme Gallery', country: 'Theme', description: 'By classifying photos into various themes, users can easily find and appreciate photos of interest' },
    { image: 'img/Srilanka.jpg', place: 'Theme Gallery', country: 'Tagging', description: 'By implementing a tag function for each picture, you can quickly search for photos with related tags' },
    { image: 'img/Grand Canyon.jpg', place: 'Theme Gallery', country: 'Description', description: 'When uploading a picture, you can feel the emotions when you take a picture by writing the contents'},
    { image: 'img/Machu Picchu.jpg', place: 'Theme Gallery', country: 'Group Gallery', description: 'You can share your memories while appreciating the photos uploaded by the group gallery'},
    { image: 'img/Bali.jpg', place: 'Theme Gallery', country: 'Photo Community', description: "Let's share and appreciate each other's photos in the photo community"}
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
