import PopupWithForm from "./PopupWithForm";
import { EntryForm } from "../forms/Forms";

export default function PopupAddEntry(props) {
    const { isOpen, onSubmit, onClose } = props;

    // ! submit
    const handleSubmit = (entry) => {
        onSubmit(entry);
    };

    return (
        <>
            <PopupWithForm isForm={false} isSmall={true} linkText={false} name="add-entry" title="Add new entry" isOpen={isOpen} onClose={onClose}>
                <EntryForm onSubmit={handleSubmit} isOpen={isOpen} />
            </PopupWithForm>
        </>
    );
};
