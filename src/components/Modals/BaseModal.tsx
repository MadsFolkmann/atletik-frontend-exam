// BaseModal.tsx
import React from "react";
import "./ModalStyle.css";

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="closebtn" onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

export default BaseModal;
