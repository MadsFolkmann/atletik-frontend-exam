import React from "react";
import BaseModal from "../../components/BaseModal";


interface DeleteParticipantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    participantName: string | null;
}

const DeleteParticipantModal: React.FC<DeleteParticipantModalProps> = ({ isOpen, onClose, onDelete, participantName }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Are you sure you want to delete this participant?</h2>
            {participantName && <p>Participant: {participantName}</p>}
            <button className="deletebtn" onClick={onDelete}>
                Delete
            </button>
            <button onClick={onClose}>Cancel</button>
        </BaseModal>
    );
};

export default DeleteParticipantModal;
