import React from "react";
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from "../header/Header";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import usersApiOBJ from '../../utils/usersApi';
import cardsApiObj from "../../utils/cardsApi";
import * as auth from '../../utils/auth';
import LoginPopup from '../popup/LoginPopup';
import AddCardPopup from "../popup/AddCardPopup";
import PopupConfirm from "../popup/PopupConfirm";
import SignUpPopup from "../popup/SignUpPopup";
import { CreditCard } from "../cards/Cards";
import Footer from '../footer/Footer'
import { ButtonAdd } from "../buttons/Buttons";

// ! 0J3IUsnOu2Xk8cEj mongo password

function App() {
  const currentUserContext = React.useContext(CurrentUserContext);
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const html = safeDocument.documentElement;
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [isUserFound, setIsUserFound] = React.useState(true);
  const [cards, setCards] = React.useState();
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);

  const noScroll = () => html.classList.add('no-scroll');

  const scroll = () => html.classList.remove('no-scroll');

  const setAddCardOpen = () => setIsAddCardPopupOpen(true);

  const setLoginPopupOpen = () => setIsLoginPopupOpen(true);

  const chooseAddButtonPopup = () => {
    if (loggedIn) {
      setAddCardOpen();
    } else {
      setLoginPopupOpen();
    }
  };

  const closeAllPopups = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
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
        setIsConfirmPopupOpen(true);
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

  const handleAddCardSubmit = (card) => {
    card.ownerId = currentUser.id;

    cardsApiObj.createCard(card)
      .then((data) => {
        if (data) {
          setCards([...cards, data]);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(`Error type: ${err.message}`);
        }
      })
      .finally(() => {
        setIsAddCardPopupOpen(false);
      });
  };

  const getCards = () => {
    cardsApiObj.getCards()
      .then((data) => {
        if (data) {
          setCards(data);
        }
      })
      .catch((err) => {
        if (err) {
          console.log(`Error type: ${err.message}`);
        }
      });
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
    setCurrentUser(null);
    // setIsHomePage(true);
    localStorage.removeItem('jwt');
    history.push("/");
  };

  const buttons = [
    {
      name: 'Home',
      isAllowed: true,
      onClick: () => {
        history.push("/");
      }
    },
    {
      name: 'My cards',
      isAllowed: false,
      onClick: () => {
        history.push("/my-cards");
      }
    },
    {
      name: 'About us',
      isAllowed: true,
      onClick: () => {
        history.push("/about-us");
      }
    },
  ];

  // * running the 'isAutoLogin' and 'getCards'
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
      <Header
        noScroll={noScroll}
        scroll={scroll}
        isLoggedIn={loggedIn}
        buttons={buttons}
        handleLogout={handleLogout}
        handleButtonClick={openPopup}
      />
      <Switch>
        <ProtectedRoute exact path='/my-cards' loggedIn={loggedIn} >
          <section id="my-cards">
            {getCards()}
            <h1 className="section__title"><span style={{ "textTransform": "capitalize" }}>{currentUser.username}</span> here you can find your cards</h1>
            <div className="add-button__container">
              <ButtonAdd onClick={chooseAddButtonPopup} buttonText='Add new' />
            </div>
            <div className="cards">
              {cards ? cards.map((card, index) => {
                return <CreditCard card={card} isFlipping={true} key={index} />
              }) : <p>You have no cards.<br /> Add some</p>}
            </div>
          </section>
        </ProtectedRoute>

        <Route path='/about-us'>
          <section id='about-us'>
            <h1 className="section__title">Here you can read about us.</h1>
            <div className="add-button__container">
              <ButtonAdd onClick={loggedIn ? setAddCardOpen : setLoginPopupOpen} buttonText='Add new' title='Log in to add a new card.' />
            </div>
            <p>Meet our team</p>
            <h2>CEO</h2>
            <h2>LEAD FRONTEND</h2>
            <h2>LEAD BACKEND</h2>
          </section>
        </Route>

        <Route path="/">
          <section id='home'>
            <h1 className="section__title">Welcome to the new app</h1>
            <div className="add-button__container">
              <ButtonAdd onClick={loggedIn ? setAddCardOpen : setLoginPopupOpen} buttonText='Add new' title='Log in to add a new card.' />
            </div>
          </section>
        </Route>
      </Switch>
      <SignUpPopup
        isOpen={isSignUpPopupOpen}
        onClose={closeAllPopups}
        handleSignup={handleSignupSubmit}
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
      <Footer />
    </CurrentUserContext.Provider >
  );
};
export default withRouter(App);
