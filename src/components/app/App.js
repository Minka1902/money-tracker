import React from "react";
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { formatCreditCardNumber } from "../../constants/functions";
import { CreditCard } from "../cards/Cards";
import { ButtonAdd } from "../buttons/Buttons";
import { EntryMessage } from '../visualizeData/VisualizeData';
import * as auth from '../../utils/auth';
import usersApiOBJ from '../../utils/usersApi';
import cardsApiObj from "../../utils/cardsApi";
import Header from "../header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import PopupAddEntry from "../popup/PopupAddEntry";
import PopupLogin from '../popup/PopupLogin';
import PopupAddCard from "../popup/PopupAddCard";
import PopupConfirm from "../popup/PopupConfirm";
import PopupSignUp from "../popup/PopupSignUp";
import Footer from '../footer/Footer'
import RightClickMenu from "../rightClickMenu/RightClickMenu";

function App() {
  const currentUserContext = React.useContext(CurrentUserContext);
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const html = safeDocument.documentElement;
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [isUserFound, setIsUserFound] = React.useState(true);
  const [cards, setCards] = React.useState();
  const [entries, setEntries] = React.useState();
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isEntryPopupOpen, setIsEntryPopupOpen] = React.useState(false);
  const [isDeleteCard, setIsDeleteCard] = React.useState(true);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [cardIdToWatch, setCardIdToWatch] = React.useState('');
  const [card, setCard] = React.useState();

  const noScroll = () => html.classList.add('no-scroll');

  const scroll = () => html.classList.remove('no-scroll');

  const setAddCardOpen = () => setIsAddCardPopupOpen(true);

  const setLoginPopupOpen = () => setIsLoginPopupOpen(true);

  const setConfirmPopupOpen = () => setIsConfirmPopupOpen(true);

  const handleCardClick = (cardId) => {
    setCardIdToWatch(cardId);
    history.push(`/card/${cardId}`);
    getCard(cardId);
  }

  const chooseAddButtonPopup = () => {
    if (history.location.pathname.indexOf('/card/') !== -1) {
      setIsEntryPopupOpen(true);
    } else {
      if (loggedIn) {
        setAddCardOpen();
      } else {
        setLoginPopupOpen();
      }
    }
  };

  const closeAllPopups = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsEntryPopupOpen(false);
    setIsDeleteCard(true);
    if (window.innerWidth < 520) {
      scroll();
    } else {
      noScroll();
    }
  };

  const signupSuccessful = () => {
    closeAllPopups();
    setIsDeleteCard(false);
    setConfirmPopupOpen();
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
      });
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
      });
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
        if (err.message) {
          console.log(`Error type: ${err.message}`);
        } else {
          console.log(`Error type: ${err}`);
        }
      });
  };

  const getCard = (cardId) => {
    cardsApiObj.getCard(cardId)
      .then((data) => {
        if (data) {
          setCard(data);
          getEntries(cardId);
        }
      })
      .catch((err) => {
        if (err.message) {
          console.log(`Error type: ${err.message}`);
        }
      });
  };

  const getEntries = (cardId) => {
    cardsApiObj.getEntries(cardId)
      .then((data) => {
        if (data.length !== 0) {
          setEntries(data);
        }
      })
      .catch((err) => {
        if (err.message) {
          console.log(`Error type: ${err.message}`);
        } else {
          console.log(`Error type: ${err}`);
        }
      });
  };

  const deleteCard = (cardId) => {
    closeAllPopups();
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

  const navButtons = [
    {
      name: 'Home',
      isAllowed: true,
      onClick: () => {
        history.push("/");
        setCardIdToWatch(null);
        setEntries(null);
      }
    },
    {
      name: 'My cards',
      isAllowed: false,
      onClick: () => {
        history.push("/my-cards");
        getCards();
        setCardIdToWatch(null);
        setEntries(null);
      }
    },
    {
      name: 'About us',
      isAllowed: true,
      onClick: () => {
        history.push("/about-us");
        setCardIdToWatch(null);
        setEntries(null);
      }
    },
  ];

  const rightClickItems = [
    { buttonText: 'delete card', buttonClicked: setConfirmPopupOpen, filter: 'flip-card' },
    { buttonText: 'sign out', buttonClicked: handleLogout, filter: 'header' },
    { buttonText: 'add card', buttonClicked: setAddCardOpen, filter: 'my_cards' },
    { buttonText: 'add card', buttonClicked: setAddCardOpen, filter: 'my_cards' },
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
      <RightClickMenu items={rightClickItems} />
      <Header
        noScroll={noScroll}
        scroll={scroll}
        isLoggedIn={loggedIn}
        buttons={navButtons}
        handleLogout={handleLogout}
        handleButtonClick={openPopup}
      />
      <Switch>
        <ProtectedRoute path={`/card/${cardIdToWatch}`} loggedIn={cardIdToWatch ? true : false} >
          <section id="card">
            <div className="add-button__container">
              <ButtonAdd onClick={chooseAddButtonPopup} buttonText='Add new' />
            </div>
            <h1 className="section__title">Card: {card ? formatCreditCardNumber(card.cardNumber, true, 12) : ''}</h1>
            <div className="card__entries">
              {entries ? entries.map((entry, index) => {
                return <EntryMessage entry={entry} key={index} />
              }) : <p>You haven`t entered anything yet.</p>}
            </div>
          </section>
        </ProtectedRoute>

        <ProtectedRoute path='/my-cards' exact loggedIn={loggedIn} >
          <section id="my-cards" className="my_cards">
            {loggedIn ? <h1 className="section__title"><span className="capitalized">{currentUser.username}</span> here you can find your cards</h1> : <></>}
            <div className="add-button__container">
              <ButtonAdd onClick={chooseAddButtonPopup} buttonText='Add new' />
            </div>
            <div className="cards">
              {cards ? cards.map((card, index) => {
                return <CreditCard card={card} isFlipping={false} key={index} onClick={handleCardClick} />
              }) : <p>You have no cards.<br /> Add some</p>}
            </div>
          </section>
        </ProtectedRoute>

        <Route path='/about-us'>
          <section id='about-us'>
            <h1 className="section__title">Here you can read about us.</h1>
            <div className="add-button__container">
              <ButtonAdd onClick={chooseAddButtonPopup} buttonText='Add new' title='Log in to add a new card.' />
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
              <ButtonAdd onClick={chooseAddButtonPopup} buttonText='Add new' title='Log in to add a new card.' />
            </div>
          </section>
        </Route>
      </Switch>
      <PopupSignUp
        isOpen={isSignUpPopupOpen}
        onClose={closeAllPopups}
        handleSignup={handleSignupSubmit}
        buttonText="Sign up"
        handleSwitchPopup={switchPopups}
      />

      <PopupLogin
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
        isDeleteCard={isDeleteCard}
        signupSuccessful={signupSuccessful}
        onClose={closeAllPopups}
        handleSubmit={deleteCard}
      />

      <PopupAddEntry
        onSubmit={handleAddCardSubmit}
        isOpen={isEntryPopupOpen}
        onClose={closeAllPopups}
      />

      <PopupAddCard
        isLoggedIn={loggedIn}
        onSubmit={handleAddCardSubmit}
        isOpen={isAddCardPopupOpen}
        linkText='Sign in'
        handleSwitchPopup={switchPopups}
        onClose={closeAllPopups}
      />

      <Footer>
        <a className="footer__link" href='http://127.0.0.1:3000'>Home</a>
      </Footer>
    </CurrentUserContext.Provider >
  );
};
export default withRouter(App);
