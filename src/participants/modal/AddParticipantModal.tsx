import React from "react";
import BaseModal from "../../components/BaseModal";
import ParticipantForm from "../form/ParticipantForm";
import { Participant } from "../../services/apiFacade";

interface AddParticipantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (participant: Participant) => void;
}

const AddParticipantModal: React.FC<AddParticipantModalProps> = ({ isOpen, onClose, onAdd }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Add Participant</h2>
            <ParticipantForm onSubmit={onAdd} onClose={onClose} />
        </BaseModal>
    );
};

export default AddParticipantModal;
