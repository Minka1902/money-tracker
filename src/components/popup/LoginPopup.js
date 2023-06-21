import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function LoginPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { linkText, isOpen, handleSwitchPopup, isFound, handleLogin, onClose, buttonText = 'Submit', onSignOut } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = React.useState(true);
  const [isEmailCorrect, setIsEmailCorrect] = React.useState(true);
  const [shouldAddSSign, setShouldAddSSign] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState('Password incorrect');
  const [isTypePassword, setIsTypePassword] = React.useState(true);

  // ! submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleLogin(email, password);
      setIsValid(false);
    }
  };

  // ! Resetting the popup when closing
  React.useEffect(() => {
    setIsEmailCorrect(true);
    setIsPasswordCorrect(true);
    setEmail('');
    setPassword('');
    setIsValid(false);
    setShouldAddSSign(false);
    setIsTypePassword(true);
  }, [isOpen]);

  // ! Validating the email input
  const checkEmailValid = () => {
    // eslint-disable-next-line
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegExp.test(email)) {
      setIsEmailCorrect(true);
    } else {
      if (email === '') {
        setIsEmailCorrect(true);
      } else {
        setIsEmailCorrect(false);
      }
    }
  };

  // ! Validating the password input
  const checkPasswordValid = () => {
    const passwordRegExp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,50}$/;
    if (password.length >= 6 || password === '') {
      if (passwordRegExp.test(password)) {
        setIsPasswordCorrect(true);
      } else {
        setShouldAddSSign(false);
        setPasswordErrorText('Password must contain letters and numbers!');
        if (password === '') {
          setIsPasswordCorrect(true);
        } else {
          setIsPasswordCorrect(false);
        }
      }
    } else {
      setIsPasswordCorrect(false);
      setPasswordErrorText('Password to short!');
    }
  };

  // ! Validating the form
  React.useEffect(() => {
    checkEmailValid();
    checkPasswordValid();
    if (isPasswordCorrect || isEmailCorrect) {
      if (isPasswordCorrect && isEmailCorrect) {
        if (email.length > 1 && password.length > 6) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line
  }, [email, password]);

  const handleTogglePasswordVisibility = (evt) => {
    evt.preventDefault();
    setIsTypePassword(!isTypePassword);
  };

  return (
    <>
      {!currentUser ?
        <PopupWithForm onSubmit={handleSubmit} isValid={isValid} handleSwitchPopup={handleSwitchPopup} linkText={linkText} name="login" title="Sign in" isOpen={isOpen} onClose={onClose} buttonText={buttonText}>
          <h3 className='popup__input-title'>Email</h3>
          <input
            className="popup__input"
            placeholder="Enter email"
            id="login-email-input"
            type="email"
            name="emailInput"
            required
            minLength="2"
            maxLength="40"
            value={email}
            onChange={(evt) => setEmail(evt.currentTarget.value)}
            autoComplete="off"
          />
          <p className={`popup__error-massage${isEmailCorrect ? '' : '_visible'}`}>Email incorrect</p>
          <h3 className='popup__input-title'>Password</h3>
          <div className='popup__input_password-container'>
            <input
              className="popup__input"
              placeholder="Enter password"
              id="login-password-input"
              type={isTypePassword ? 'password' : 'text'}
              name="passwordInput"
              required
              minLength="8"
              maxLength="200"
              value={password}
              onChange={(evt) => setPassword(evt.currentTarget.value)}
            />
            <button className='popup__input_show-password-button' onClick={handleTogglePasswordVisibility}>
              {isTypePassword ?
                <svg fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                  <path d="M23.01 11.184c-1.241-1.918-2.85-3.547-4.654-4.712C16.36 5.182 14.157 4.5 11.985 4.5c-1.993 0-3.953.57-5.825 1.693-1.91 1.145-3.64 2.818-5.141 4.972a1.496 1.496 0 0 0-.03 1.666c1.238 1.937 2.83 3.569 4.606 4.718 2 1.295 4.151 1.951 6.39 1.951 2.19 0 4.397-.676 6.384-1.956 1.803-1.16 3.41-2.796 4.645-4.73a1.51 1.51 0 0 0-.005-1.63ZM12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"></path>
                </svg> :
                <svg fill="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.031 3 3 4.031l16.969 16.97L21 19.968 4.031 3Z"></path>
                  <path d="m12.156 9.008 2.84 2.839a3.004 3.004 0 0 0-2.84-2.84Z"></path>
                  <path d="m11.843 14.995-2.84-2.839a3.003 3.003 0 0 0 2.84 2.84Z"></path>
                  <path d="M12 16.496a4.5 4.5 0 0 1-4.34-5.688L4.421 7.57C3.099 8.782 1.839 10.362.75 11.996c1.238 2.063 2.933 4.183 4.697 5.4 2.024 1.393 4.225 2.1 6.542 2.1a10.935 10.935 0 0 0 3.714-.647l-2.513-2.512c-.388.106-.788.16-1.19.16Z"></path>
                  <path d="M12 7.5a4.5 4.5 0 0 1 4.34 5.688l3.312 3.312c1.367-1.23 2.629-2.886 3.598-4.5-1.237-2.036-2.949-4.151-4.743-5.382-2.05-1.405-4.243-2.118-6.519-2.118a10.45 10.45 0 0 0-3.666.67l2.49 2.49c.387-.107.786-.16 1.188-.16Z"></path>
                </svg>}
            </button>
          </div>
          <p className={`popup__error-massage${isPasswordCorrect ? '' : '_visible'}${shouldAddSSign ? '_visible' : ''}`}>{passwordErrorText}</p>
          <p className={`popup__error-massage${isFound ? '' : '_visible'}`}>User not found</p>
        </PopupWithForm> :
        <PopupWithForm onSubmit={onSignOut} isValid={true} handleSwitchPopup={handleSwitchPopup} linkText={linkText} name="login" title="Sign in" isOpen={isOpen} onClose={onClose} buttonText='I know, sign out anyway.'>
          <h3>{currentUser ? currentUser.username : ''}, you are already signed in.</h3 >
        </PopupWithForm>}
    </>
  );
}
