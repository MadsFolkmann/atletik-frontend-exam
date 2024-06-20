import { useEffect, useState } from "react";
import { Participant, getParticipants, addParticipant, deleteParticipant, Discipline, getDisciplines, searchParticipants } from "../services/apiFacade";
import DeleteModal from "./modal/DeleteParticipantModal";
import AddParticipantModal from "./modal/AddParticipantModal";
import EditParticipantModal from "./modal/EditParticipantModal";
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
    const [filters, setFilters] = useState({
        gender: "",
        ageGroup: "",
        club: "",
        discipline: "",
    });
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

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

    function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }

    function handleSort(key: string) {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    }

    function applyFilters(participants: Participant[]) {
        return participants.filter((participant) => {
            return (
                (filters.gender === "" || participant.gender === filters.gender) &&
                (filters.ageGroup === "" ||
                    (filters.ageGroup === "young" && participant.age < 30) ||
                    (filters.ageGroup === "adult" && participant.age >= 30)) &&
                (filters.club === "" || participant.club === filters.club) &&
                (filters.discipline === "" || participant.disciplines?.some((discipline) => discipline.name === filters.discipline))
            );
        });
    }

    function applySort(participants: Participant[]) {
        if (sortConfig.key === "") return participants;

        const sortedParticipants = [...participants];
        sortedParticipants.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
        return sortedParticipants;
    }

    const filteredAndSortedParticipants = applySort(applyFilters(participants));

    // Create a set of unique club names
    const uniqueClubs = Array.from(new Set(participants.map((participant) => participant.club)));

return (
    <div>
        <h2>Participants</h2>
        <div className="filter-container">
            <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <select name="gender" value={filters.gender} onChange={handleFilterChange}>
                <option value="">All Genders</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
            </select>
            <select name="ageGroup" value={filters.ageGroup} onChange={handleFilterChange}>
                <option value="">All Ages</option>
                <option value="young">Under 30</option>
                <option value="adult">30 and above</option>
            </select>
            <select name="club" value={filters.club} onChange={handleFilterChange}>
                <option value="">All Clubs</option>
                {uniqueClubs.map((club) => (
                    <option key={club} value={club}>
                        {club}
                    </option>
                ))}
            </select>
            <select name="discipline" value={filters.discipline} onChange={handleFilterChange}>
                <option value="">All Disciplines</option>
                {disciplines.map((discipline) => (
                    <option key={discipline.id} value={discipline.name}>
                        {discipline.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="add-participant-container">
            <button className="add-participant-button" onClick={() => setIsAddModalOpen(true)}>
                Add Participant
            </button>
        </div>
        <table>
            <thead>
                <tr>
                    <th onClick={() => handleSort("name")}>Name</th>
                    <th onClick={() => handleSort("gender")}>Gender</th>
                    <th onClick={() => handleSort("age")}>Age</th>
                    <th onClick={() => handleSort("club")}>Club</th>
                    <th>Disciplines</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredAndSortedParticipants.map((participant) => (
                    <tr key={participant.id}>
                        <td>{participant.name}</td>
                        <td>{participant.gender}</td>
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