import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import "./Header.css";
import axios from "axios";
import { Cookies } from "react-cookie";
const SIGNOUT_URL = "http://43.203.241.227:5000/auth/remove";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMyMenuOpen: false, // My 메뉴가 열려있는지 여부를 추적하는 상태
      isRingOpen: false // 알림이 열려있는지 여부를 추적하는 상태
    };
  }

  componentDidMount() {
    // document에 클릭 이벤트 추가
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    // 컴포넌트가 제거될 때 클릭 이벤트 제거
    document.removeEventListener('click', this.handleDocumentClick);
  }

  // document 클릭 이벤트 핸들러
  handleDocumentClick = (event) => {
    if(!this.props.isLogin) {
      return
    }

    const { isMyMenuOpen, isRingOpen } = this.state;
    const myMenuToggle = document.querySelector('.My1');
    const ringToggle = document.querySelector('.Ring1');

    // 토글 요소 이외의 영역이 클릭되었을 때 토글 상태 닫기
    if (!myMenuToggle.contains(event.target) && isMyMenuOpen) {
      this.setState({ isMyMenuOpen: false });
    }

    if (!ringToggle.contains(event.target) && isRingOpen) {
      this.setState({ isRingOpen: false });
    }
  };

  toggleMyMenu = () => {
    this.setState(prevState => ({
      isMyMenuOpen: !prevState.isMyMenuOpen
    }));
  }

  toggleRing = () => {
    this.setState(prevState => ({
      isRingOpen: !prevState.isRingOpen
    }));
  }

  logoutMethod = async () => {
    const cookies = new Cookies();

    await axios
      .get(SIGNOUT_URL, { withCredentials: true })
      .then((res) => {
        
        const data = res.data;

        cookies.remove("accessToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
        if (this.props.isLogin) {
          this.props.handleIsLogin();
        }

        alert(data.msg);
        this.props.myNavigate("/");
      })
      .catch((err) => {
        const data = err.response.data;

        cookies.remove("accessToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
        if (this.props.isLogin) {
          this.props.handleIsLogin();
        }

        if (data.errorCode === 220) {
          alert("올바르지 않은 세션입니다. 메인 화면으로 돌아갑니다.");
          this.props.myNavigate("/");
        }
        this.props.myNavigate("/");
    });
  }

  render() {
    const { isMyMenuOpen, isRingOpen } = this.state;
    
    return (
      <div>
        <header>
          <div className='TopBox'>
            <div className='homeWithMyGall'>
              <div className='Home1'>
                  <Link to="/" className='Home2'>
                    <div className='Home3'>
                      <img className='Logo' src='img/SiteMainLogo.svg' alt='Logo'></img>
                    </div>
                  </Link>
              </div>
                {
                  this.props.isLogin ?
                  <Link to="/MyGall" className='MyGall' style={{ textDecoration: "none"}}>
                    <button className='MyGallbtn'><span>My Gallery</span></button>
                  </Link>
                  :
                  <button className='MyGallbtn' style={{visibility: "hidden"}}><span>My Gallery</span></button>  
                }
            </div>
              {
                this.props.isLogin ?
                  <div className='SearchInputBox'>
                    {/* 검색 input */}
                    <input
                      type="text"
                      name="search"
                      autoComplete="off"
                      placeholder="Tag Search(#Tag)"
                      // on : width 170px | off : width 0px
                      className="SearchInput"
                    ></input>
                    {/* 검색 버튼 */}
                    <div className="SearchBtn">
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
                :
                <div className='SearchInputBox'></div>
              }
              {
                this.props.isLogin ?
                  <div className='RightBar'>
                  <div className='Ring1' onClick={this.toggleRing}>
                    <div className='Ring2'>
                      <img className='Ring3' src='img/notifications.svg' alt='Share'></img>
                    </div>
                  {/* My 메뉴의 토글 상태에 따라 표시 여부 결정 */}
                  {isRingOpen && (
                    <div className='RingContent'>
                      {/* Ring 메뉴의 내용 */}
                    </div>
                  )}
                </div>
                  {/* 토글 기능 추가된 My 메뉴 */}
                  <div className='My1' onClick={this.toggleMyMenu}>
                    <div className='My2'>
                      <img className='My3' src='img/account_circle.svg' alt='Share'></img>
                    </div>
                  {/* My 메뉴의 토글 상태에 따라 표시 여부 결정 */}
                  {isMyMenuOpen && (
                    <div className='MyMenuContent'>
                      {/* My 메뉴의 내용 */}
                        <Link to="/Profile" className='LinkPro'>Profile</Link>
                        <Link to="/Setting" className='LinkSet'>Setting</Link>
                        <span onClick={this.logoutMethod}>LogOut</span>
                        {/* 추가적인 메뉴 아이템들 */}
                    </div>
                  )}
                  </div>
                </div>
                :
                <Link to="users/login">
                  <div className='RightBar'>
                    <button className='MyGallbtn'><span>Login</span></button>
                  </div>   
                </Link>
              }
          </div>
        </header>
      </div>
    );
  }
}

export default Header;