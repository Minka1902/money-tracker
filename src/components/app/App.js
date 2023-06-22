import React from "react";
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from "../header/Header";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import usersApiOBJ from '../../utils/usersApi';
import * as auth from '../../utils/auth';
import LoginPopup from '../popup/LoginPopup';
import AddCardPopup from "../popup/AddCardPopup";
import PopupConfirm from "../popup/PopupConfirm";
import SignUpPopup from "../popup/SignUpPopup";
import { CreditCard } from "../cards/Cards";
import Footer from '../footer/Footer'

// ! 0J3IUsnOu2Xk8cEj mongo password

function App() {
  const currentUserContext = React.useContext(CurrentUserContext);
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const html = safeDocument.documentElement;
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(true);
  // const [currentUser, setCurrentUser] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({ username: 'michael', email: 'kenaa@example.com' });
  const [isUserFound, setIsUserFound] = React.useState(true);
  const [cards, setCards] = React.useState([{ company: 'Mastercard', number: '1111 2222 3333 4444', name: 'michael scharff', expirationDate: '12/12' }, { company: 'Mastercard', number: '1111 2222 3333 4444', cvv: '549', name: 'michael scharff', expirationDate: '12/12' }, { company: 'Mastercard', number: '1111 2222 3333 4444', cvv: '123', name: 'michael scharff', expirationDate: '12/12' }, { company: 'Mastercard', number: '1111 2222 3333 4444', name: 'michael scharff', expirationDate: '12/12' }]);
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmLoginPopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);

  const noScroll = () => html.classList.add('no-scroll');

  const scroll = () => html.classList.remove('no-scroll');

  const closeAllPopups = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsConfirmLoginPopupOpen(false);
    if (window.innerWidth < 520) {
      noScroll();
    } else {
      scroll();
    }
  };

  const signupSuccessful = () => {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  };

  // * Handling login form submit
  const handleLoginSubmit = (email, password) => {
    usersApiOBJ
      .login({ email, password })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem('jwt', data.jwt);
        }
        if (data.user._id) {
          setIsUserFound(true);
          findUserInfo();
        }
      })
      .catch((err) => {
        if ((err === 'Error: 404') || (err.message === 'Failed to fetch')) {
          setIsUserFound(false);
        }
        setLoggedIn(false);
      })
      .finally(() => {
        // gettingSavedArticles();
      })
  };

  const findUserInfo = () => {
    usersApiOBJ
      .getCurrentUser()
      .then((user) => {
        if (user) {
          setCurrentUser(user);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(`Error type: ${err.message}`);
          setLoggedIn(false);
        }
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  // * Handling signup form submit
  const handleSignupSubmit = (email, password, username) => {
    usersApiOBJ
      .signUp({ email, password, username })
      .catch((err) => {
        console.log(`Error type: ${err.message}`)
      })
      .finally(() => {
        closeAllPopups();
        setIsLoginPopupOpen(true);
      })
  };

  // * checking if should auto-login
  const isAutoLogin = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(`Check token error: ${err}`);
        })
        .finally(() => {
          // gettingSavedArticles();
        });
    }
  };

  const handleAddCardSubmit = (evt) => {
    evt.preventDefault();
  };

  const switchPopups = (evt) => {
    closeAllPopups();
    if (evt.target.parentElement.parentElement.parentElement.parentElement.classList.contains(`popup_type_add-card`)) {
      setIsLoginPopupOpen(true);
    } else {
      if (evt.target.parentElement.parentElement.parentElement.classList.contains(`popup_type_add-card`)) {
        setIsLoginPopupOpen(true);
      } else {
        if (evt.target.parentElement.parentElement.parentElement.parentElement.classList.contains(`popup_type_signup`)) {
          setIsLoginPopupOpen(true);
        } else {
          if (evt.target.parentElement.parentElement.parentElement.parentElement.classList.contains(`popup_type_login`)) {
            if (loggedIn) {
              setIsAddCardPopupOpen(true);
            } else {
              setIsSignUpPopupOpen(true);
            }
          }
        }
      }
    }
  };

  const openPopup = () => {
    if (loggedIn) {
      setIsAddCardPopupOpen(true);
    } else {
      setIsLoginPopupOpen(true);
    }
  };

  // * Handling the logout click
  const handleLogout = () => {
    setLoggedIn(false);
    // setIsHomePage(true);
    localStorage.removeItem('jwt');
    history.push("/");
  };

  const buttons = [
    {
      name: 'Home',
      isAllowed: true,
      onClick: () => {
        console.log('Home button clicked');
      }
    },
    {
      name: 'My cards',
      isAllowed: false,
      onClick: () => {
        console.log('My cards button clicked');
      }
    },
  ];

  // * running the 'isAutoLogin' function in the beginning
  React.useEffect(() => {
    isAutoLogin();            // eslint-disable-next-line
  }, []);

  // * close popup by ESCAPE 
  React.useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
    // eslint-disable-next-line
  }, []);

  // ! Adding event listener for the page
  // ! Mouse event
  React.useEffect(() => {
    const closeByClick = (evt) => {
      if (evt.target.classList.contains('popup_type_project')) {
        closeAllPopups();
      } else {
        if (evt.target.classList.contains("popup")) {
          closeAllPopups();
        }
      }
    }

    document.addEventListener('mouseup', closeByClick);
    return () => document.removeEventListener('mouseup', closeByClick);
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path='/my-cards' loggedIn={loggedIn} >
          <Header
            noScroll={noScroll}
            scroll={scroll}
            isLoggedIn={loggedIn}
            buttons={buttons}
            handleButtonClick={openPopup}
            isHomePage={false}
          />
          <section id="my-cards">
            <div className="cards">
              {cards.map((card, index, array) => {
                return <CreditCard card={card} isFlipping={true} key={index} />
              })}
            </div>
          </section>
        </ProtectedRoute>

        <Route path="/">
          <Header
            noScroll={noScroll}
            scroll={scroll}
            isLoggedIn={loggedIn}
            buttons={buttons}
            handleButtonClick={openPopup}
            isHomePage={false}
          />

          <SignUpPopup
            isOpen={isSignUpPopupOpen}
            onClose={closeAllPopups}
            handleSignup={handleSignupSubmit}
            linkText="Sign up"
            buttonText="Sign up"
            handleSwitchPopup={switchPopups}
          />

          <LoginPopup
            handleLogin={handleLoginSubmit}
            isOpen={isLoginPopupOpen}
            isFound={isUserFound}
            linkText={loggedIn ? 'Add a card' : 'Sign up'}
            onClose={closeAllPopups}
            handleSwitchPopup={switchPopups}
            onSignOut={handleLogout}
          />

          <PopupConfirm
            isOpen={isConfirmPopupOpen}
            isDeleteSource={true}
            signupSuccessful={signupSuccessful}
            onClose={closeAllPopups}
          // handleSubmit={deleteSource}
          />

          <AddCardPopup
            isLoggedIn={loggedIn}
            onSubmit={handleAddCardSubmit}
            isOpen={isAddCardPopupOpen}
            linkText='Sign in'
            handleSwitchPopup={switchPopups}
            onClose={closeAllPopups}
          />
        </Route>
      </Switch>
      <Footer />
    </CurrentUserContext.Provider >
  );
};
export default withRouter(App);
