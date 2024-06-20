import { useEffect, useState } from "react";
import { Participant, getParticipants, addParticipant, deleteParticipant, Discipline, getDisciplines, searchParticipants } from "../services/apiFacade";
import DeleteModal from "../components/Modals/DeleteModal";
import AddParticipantModal from "../components/Modals/AddParticipantModal";
import EditParticipantModal from "../components/Modals/EditParticipantModal";
import "./participantsList.css";
export default function ParticipantsList() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null);
    const [selectedParticipantName, setSelectedParticipantName] = useState<string | null>(null);
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getParticipants().then(setParticipants);
        getDisciplines().then(setDisciplines);
    }, []);

    function handleDelete() {
        if (selectedParticipantId !== null) {
            deleteParticipant(selectedParticipantId).then(() => {
                setParticipants(participants.filter((participant) => participant.id !== selectedParticipantId));
                setIsDeleteModalOpen(false);
            });
        }
    }

    function handleAdd(participant: Participant) {
        addParticipant(participant).then((newParticipant) => {
            setParticipants([...participants, newParticipant]);
            setIsAddModalOpen(false);
        });
    }

    function handleEdit(participant: Participant) {
        addParticipant(participant).then((updatedParticipant) => {
            setParticipants(participants.map((p) => (p.id === updatedParticipant.id ? updatedParticipant : p)));
            setIsEditModalOpen(false);
        });
    }

    function editParticipant(participant: Participant) {
        setSelectedParticipantId(participant.id);
        setSelectedParticipantName(participant.name);
        setIsEditModalOpen(true);
    }

    function openDeleteModal(id: number, name: string) {
        setSelectedParticipantId(id);
        setSelectedParticipantName(name);
        setIsDeleteModalOpen(true);
    }

    function handleSearch() {
        if (searchTerm.trim() !== "") {
            searchParticipants(searchTerm).then(setParticipants);
        } else {
            getParticipants().then(setParticipants);
        }
    }

    return (
        <div>
            <h2>Participants</h2>
            <div className="search-container">
                <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="add-participant-container">
                <button className="add-participant-button" onClick={() => setIsAddModalOpen(true)}>
                    Add Participant
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Club</th>
                        <th>Disciplines</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant) => (
                        <tr key={participant.id}>
                            <td>{participant.name}</td>
                            <td>{participant.age}</td>
                            <td>{participant.club}</td>
                            <td>{participant.disciplines?.map((discipline) => discipline.name).join(", ")}</td>
                            <td>
                                <button onClick={() => editParticipant(participant)}>Edit</button>
                                <button className="delete" onClick={() => openDeleteModal(participant.id, participant.name)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDeleteModalOpen && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDelete}
                    participantName={selectedParticipantName}
                />
            )}
            {isAddModalOpen && <AddParticipantModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAdd} />}
            {isEditModalOpen && selectedParticipantId !== null && (
                <EditParticipantModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onEdit={handleEdit}
                    participant={participants.find((p) => p.id === selectedParticipantId)!}
                />
            )}
        </div>
    );
}