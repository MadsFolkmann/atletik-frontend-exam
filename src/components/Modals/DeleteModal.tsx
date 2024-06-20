// DeleteModal.tsx
import React from "react";
import BaseModal from "./BaseModal";
import "./ModalStyle.css";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    participantName: string | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, participantName }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Are you sure you want to delete {participantName}?</h2>
            <button className="deletebtn" onClick={onDelete}>
                Slet
            </button>
        </BaseModal>
    );
};
export default DeleteModal;
