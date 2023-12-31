import PopupWithForm from './PopupWithForm';

export default function PopupConfirm(props) {
    const { isOpen, onClose, handleSubmit, isDeleteCard = false, openLogin } = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        if (evt.type === 'submit' && evt.target.classList.contains('popup__form')) {
            if (isDeleteCard) {
                handleSubmit();
            } else {
                onClose();
                openLogin();
            }
        }
    }

    const dontDelete = (evt) => {
        evt.preventDefault();
        if (evt.type === 'click' && evt.target.classList.contains('popup__button')) {
            onClose();
        }
    }

    return (
        <>
            {isDeleteCard ?
                <PopupWithForm linkText='Leave this popup.' onSubmit={onSubmit} isValid={true} name="confirm" title="Sure you want to delete?" isOpen={isOpen} onClose={onClose} buttonText={'Yes, i am sure.'}>
                    <button className='popup__button' onClick={dontDelete}>
                        Don`t delete.
                    </button>
                </PopupWithForm>
                :
                <PopupWithForm linkText='don`t, your choice.' onSubmit={onSubmit} isValid={true} name="confirm" title="You signed up successfully, please log in." isOpen={isOpen} onClose={onClose} buttonText={'Login now.'} />
            }
        </>
    );
}
