export default function PopupProject(props) {
    const { isOpen, onClose, imageSrc, imageDiscription, imageAlt } = props;

    const closeButton = () => {
        onClose({isProject: true});
    }

    return (
        <div className={`popup popup_type_project ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__image-container">
                <button className="popup__close-button" type="button" aria-label="close" onClick={closeButton}></button>
                <h2 className="popup__title_project">{imageAlt}</h2>
                <img className="popup__image" src={imageSrc} alt={imageAlt} />
                <h2 className="popup__text">{imageDiscription}</h2>
            </div>
        </div>
    );
}
