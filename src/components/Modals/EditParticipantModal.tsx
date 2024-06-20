import React from "react";
import BaseModal from "./BaseModal";
import ParticipantForm from "../Forms/ParticipantForm";
import { Participant } from "../../services/apiFacade";


interface EditParticipantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (participant: Participant) => void;
    participant: Participant;
}

const EditParticipantModal: React.FC<EditParticipantModalProps> = ({ isOpen, onClose, onEdit, participant }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Edit Participant</h2>
            <ParticipantForm onSubmit={onEdit} onClose={onClose} participant={participant} />
        </BaseModal>
    );
};

export default EditParticipantModal;
