import React from "react";
import BaseModal from "../../components/BaseModal";
import { Result } from "../../services/apiFacade";

interface DeleteResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    result: Result | null;
}

const DeleteResultModal: React.FC<DeleteResultModalProps> = ({ isOpen, onClose, onDelete, result }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2>Are you sure you want to delete this result?</h2>
            {result && (
                <p>
                    Discipline: {result.discipline.name}
                    <br />
                    Participant: {result.participant.name}
                    <br />
                    Result Value: {result.resultValue}
                </p>
            )}
            <button className="deletebtn" onClick={onDelete}>
                Delete
            </button>
            <button onClick={onClose}>Cancel</button>
        </BaseModal>
    );
};

export default DeleteResultModal;
