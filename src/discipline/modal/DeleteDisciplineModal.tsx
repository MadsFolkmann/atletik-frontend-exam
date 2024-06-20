import React from "react";
import BaseModal from "../../components/BaseModal";

interface DeleteDisciplineModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    disciplineName: string | null;
}

const DeleteDisciplineModal: React.FC<DeleteDisciplineModalProps> = ({ isOpen, onClose, onDelete, disciplineName }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Are you sure you want to delete this discipline?</h2>
            <p>{disciplineName}</p>
            <button className="deletebtn" onClick={onDelete}>
                Delete
            </button>
            <button onClick={onClose}>Cancel</button>
        </BaseModal>
    );
};

export default DeleteDisciplineModal;
