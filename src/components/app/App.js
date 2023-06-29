import React from "react";
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { CreditCard } from "../cards/Cards";
import { ButtonAdd } from "../buttons/Buttons";
import { EntryMessage } from '../visualizeData/VisualizeData';
import { CardPerson } from "../cards/Cards";
import * as auth from '../../utils/auth';
import usersApiOBJ from '../../utils/usersApi';
import cardsApiObj from "../../utils/cardsApi";
import Header from "../header/Header";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import CurrentCardContext from '../../contexts/CurrentCardContext';
import CurrentEntryContext from "../../contexts/CurrentEntryContext";
import * as Loaders from '../loaders/Loaders';
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import PopupAddEntry from "../popup/PopupAddEntry";
import PopupLogin from '../popup/PopupLogin';
import PopupAddCard from "../popup/PopupAddCard";
import PopupCvv from "../popup/PopupCvv";
import PopupConfirm from "../popup/PopupConfirm";
import PopupSignUp from "../popup/PopupSignUp";
import Footer from '../footer/Footer'
import RightClickMenu from "../rightClickMenu/RightClickMenu";
import photo from '../../images/michaelScharff.jpeg';

function App() {
  const currentUserContext = React.useContext(CurrentUserContext);
  const currentCardContext = React.useContext(CurrentCardContext);
  const currentEntryContext = React.useContext(CurrentEntryContext);
  const safeDocument = typeof document !== 'undefined' ? document : {};
  const html = safeDocument.documentElement;
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState();
  const [currentCard, setCurrentCard] = React.useState();
  const [currentEntry, setCurrentEntry] = React.useState();
  const [isUserFound, setIsUserFound] = React.useState(true);
  const [cards, setCards] = React.useState();
  const [entries, setEntries] = React.useState();
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isEntryPopupOpen, setIsEntryPopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isCvvPopupOpen, setIsCvvPopupOpen] = React.useState(false);
  const [isDeleteCard, setIsDeleteCard] = React.useState(true);
  const [cardIdToWatch, setCardIdToWatch] = React.useState('');
  const [isLoader, setIsLoader] = React.useState(false);
  const [card, setCard] = React.useState();

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     SCROLL handling     !!!!!!!!!!!!!
  // ???????????????????????????????????????????????????

  const noScroll = () => html.classList.add('no-scroll');
  const scroll = () => html.classList.remove('no-scroll');

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     POPUP handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const setAddCardOpen = () => setIsAddCardPopupOpen(true);

  const setLoginPopupOpen = () => setIsLoginPopupOpen(true);

  const setConfirmPopupOpen = ({ id }) => {
    setCurrentCard({ cardIdToDelete: id });
    setIsConfirmPopupOpen(true);
  };

  const setCvvPopupOpen = ({ id }) => {
    setCurrentEntry({ entryIdToDelete: id });
    setIsCvvPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsSignUpPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsEntryPopupOpen(false);
    setIsCvvPopupOpen(false);
    setIsDeleteCard(true);
    if (window.innerWidth < 520) {
      scroll();
    } else {
      noScroll();
    }
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!!     USER handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
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
      });
  };

  const handleSignupSubmit = (email, password, username) => {
    usersApiOBJ
      .signUp({ email, password, username })
      .catch((err) => {
        console.log(`Error type: ${err.message}`)
      })
      .finally(() => {
        closeAllPopups();
        setIsDeleteCard(false);
        setConfirmPopupOpen({ id: null });
      });
  };

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

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('jwt');
    history.push("/");
  };

  React.useEffect(() => {
    isAutoLogin();            // eslint-disable-next-line
  }, []);

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!!     CARD handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const handleAddCardSubmit = (card) => {
    card.ownerId = currentUser.id;

    cardsApiObj.createCard(card)
      .catch((err) => {
        if (err) {
          console.log(`Error type: ${err}`);
        }
      })
      .finally(() => {
        setIsAddCardPopupOpen(false);
        getCards();
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

  const deleteCard = () => {
    cardsApiObj.deleteCard(currentCard.cardIdToDelete)
      .catch((err) => {
        if (err) {
          console.log(`Error type: ${err}`);
        }
      })
      .finally(() => {
        closeAllPopups();
        getCards();
      });
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     ENTRY handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
  const getEntries = (cardId) => {
    setIsLoader(true);
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
      })
      .finally(() => {
        setIsLoader(false);
      });
  };

  const addEntrySubmit = (entry) => {
    entry.cardId = cardIdToWatch;
    entry.ownerId = currentUser.id;
    cardsApiObj.createEntry(entry)
      .then((data) => {
        if (data) {
          getEntries(data.cardId);
        }
      })
      .catch((err) => {
        console.log(`Error type: ${err}`);
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  const removeEntrySubmit = (cvv) => {
    if (cvv && currentEntry) {
      if (cardIdToWatch) {
        const entry = { cardId: cardIdToWatch, cvv: cvv };
        cardsApiObj.deleteEntry(currentEntry.entryIdToDelete, entry)
          .catch((err) => {
            if (err) {
              console.log(err);
            }
          });
      }
    }
  };

  const renderSecondaryObjects = () => {
    if (isLoader) {
      return <Loaders.LoaderInfinity />
    } else {
      if (history.location.pathname === '/my-cards') {
        return <p>You have no cards. Add some :-)</p>
      } else {
        return (
          <>
            <p>You haven`t entered anything yet.</p>
          </>
        );
      }
    }
  };

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     ROUTE handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
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

  const handleCardClick = (cardId) => {
    setCardIdToWatch(cardId);
    history.push(`/cards/${cardId}`);
    getCard(cardId);
  };

  const determinePopupOpen = () => {
    if (history.location.pathname.indexOf('/cards/') !== -1) {
      setIsEntryPopupOpen(true);
    } else {
      if (loggedIn) {
        setAddCardOpen();
      } else {
        setLoginPopupOpen();
      }
    }
  };

  const navButtons = [
    {
      name: 'Home',
      path: '/',
      isAllowed: true,
      onClick: () => {
        history.push("/");
        setCardIdToWatch(null);
        setEntries(null);
      }
    },
    {
      name: 'My cards',
      path: '/my-cards',
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
      path: '/about-us',
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
    { buttonText: 'delete entry', buttonClicked: setCvvPopupOpen, filter: 'entry-card' },
    { buttonText: 'add entry', buttonClicked: setIsEntryPopupOpen, filter: 'entry-card' },
  ];

  const people = [{ name: 'michael scharff', title: 'Fullstack dev, UX UI', image: photo, social: { facebook: () => { console.log('facebook') }, linkedin: () => console.log('linkedin'), github: () => console.log('github') } },
  { name: 'nathan scharff', title: 'Owner, CEO', image: photo, social: { facebook: () => { console.log('facebook') }, linkedin: () => console.log('linkedin'), github: () => console.log('github') } }];

  // ???????????????????????????????????????????????????
  // !!!!!!!!!!!!!     EVENT handling     !!!!!!!!!!!!!!
  // ???????????????????????????????????????????????????
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

  React.useEffect(() => {
    const closeByClick = (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }

    document.addEventListener('mouseup', closeByClick);
    return () => document.removeEventListener('mouseup', closeByClick);
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardContext.Provider value={{ currentCard }}>
        <CurrentEntryContext.Provider value={{ currentEntry }}>
          <RightClickMenu items={rightClickItems} />
          <Header
            noScroll={noScroll}
            scroll={scroll}
            isLoggedIn={loggedIn}
            buttons={navButtons}
            handleLogout={handleLogout}
            handleButtonClick={setLoginPopupOpen}
          />
          <Switch>
            <ProtectedRoute path={`/cards/${cardIdToWatch}`} loggedIn={cardIdToWatch ? true : false} >
              <section id="card">
                <div className="add-button__container">
                  <ButtonAdd onClick={determinePopupOpen} buttonText='Add new' />
                </div>
                <h1 className="section__title">Here you can see the cards entries.</h1>
                <div className="card__entries">
                  {entries ? entries.map((entry, index) => {
                    return <EntryMessage entry={entry} key={index} />
                  }) : renderSecondaryObjects()}
                </div>
              </section>
            </ProtectedRoute>

            <ProtectedRoute path='/my-cards' exact loggedIn={loggedIn} >
              <section id="my-cards" className="my_cards">
                {loggedIn ? <h1 className="section__title"><span className="capitalized">{currentUser.username}</span> here you can find your cards</h1> : <></>}
                <div className="add-button__container">
                  <ButtonAdd onClick={determinePopupOpen} buttonText='Add new' />
                </div>
                <div className="cards">
                  {cards ? cards.map((card, index) => {
                    return <CreditCard card={card} isFlipping={false} key={index} onClick={handleCardClick} />
                  }) : renderSecondaryObjects()}
                </div>
              </section>
            </ProtectedRoute>

            <Route path='/about-us'>
              <section id='about-us'>
                <h1 className="section__title">Here you can read about us.</h1>
                <div className="add-button__container">
                  <ButtonAdd onClick={determinePopupOpen} buttonText='Add new' title='Log in to add a new card.' />
                </div>
                <p>Meet our team</p>
                <div className="card__entries">
                  {people.map((person, index) => {
                    return <CardPerson person={person} key={index} />
                  })}
                </div>
              </section>
            </Route>

            <Route path="/">
              <section id='home'>
                <h1 className="section__title">Welcome to the new app</h1>
                {loggedIn ? <></> : <p>To use this app ypu first need to sign in.</p>}
                <div className="add-button__container">
                  <ButtonAdd onClick={determinePopupOpen} buttonText='Add new' title='Log in to add a new card.' />
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
            openLogin={setLoginPopupOpen}
            onClose={closeAllPopups}
            handleSubmit={deleteCard}
          />

          <PopupAddEntry
            onSubmit={addEntrySubmit}
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

          <PopupCvv
            onSubmit={removeEntrySubmit}
            isOpen={isCvvPopupOpen}
            onClose={closeAllPopups}
          />

          <Footer>
            {navButtons.map((button, index) => {
              if (button.isAllowed) {
                return <a key={index} onClick={button.onClick} className="footer__link">{button.name}</a>
              }
            })}
          </Footer>
        </CurrentEntryContext.Provider>
      </CurrentCardContext.Provider>
    </CurrentUserContext.Provider>
  );
};
export default withRouter(App);
