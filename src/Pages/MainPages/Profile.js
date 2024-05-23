import React, { useState } from 'react';
import './Profile.css'; // 외부 CSS 파일을 불러옵니다.

const Profile = () => {
  const [profile, setProfile] = useState({
    photo: 'https://via.placeholder.com/150',
    name: 'User Name',
    bio: 'User Bio'
  });

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfile(prevProfile => ({
        ...prevProfile,
        photo: reader.result
      }));
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setProfile(prevProfile => ({
      ...prevProfile,
      name: newName
    }));
  };

  const handleBioChange = (event) => {
    const newBio = event.target.value;
    setProfile(prevProfile => ({
      ...prevProfile,
      bio: newBio
    }));
  };

  const saveProfile = () => {
    console.log('프로필이 저장되었습니다:', profile);
  };

  return (
    <div className='ProfileBox'>
      <div className="Profile-container">
        <h2 className='EditPro'>Profile Edit</h2>
        <div className="profile-preview">
          <img src={profile.photo} alt="Profile" />
        </div>
        <div className='ProfileImgBox'>
          <span className='ProfileImgTxt'>Select a profile picture:</span>
          <input
            className="input"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
        <div className='NameBox'>
          <label>Name:</label>
          <input
            className="input"
            type="text"
            value={profile.name}
            onChange={handleNameChange}
          />
        </div>
        <div className='BioBox'>
          <label>Bio:</label>
          <input
            className="input"
            type="text"
            value={profile.bio}
            onChange={handleBioChange}
          />
        </div>
        <button className="button" onClick={saveProfile}>SAVE</button>
      </div>
    </div>
  );
};

export default Profile;

