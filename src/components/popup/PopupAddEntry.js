import PopupWithForm from "./PopupWithForm";
import { EntryForm } from "../forms/Forms";

export default function PopupAddEntry(props) {
    const { isOpen, onSubmit, onClose, isEdit } = props;

    // ! submit
    const handleSubmit = ({ id, entry }) => {
        if (isEdit) {
            onSubmit({ id, entry });
        } else {
            onSubmit(entry);
        }
    };

    return (
        <>
            <PopupWithForm isForm={false} isSmall={true} linkText={false} name="add-entry" title={isEdit ? "Edit entry" : "Add new entry"} isOpen={isOpen} onClose={onClose}>
                <EntryForm onSubmit={handleSubmit} isOpen={isOpen} isEdit={isEdit} />
            </PopupWithForm>
        </>
    );
};
