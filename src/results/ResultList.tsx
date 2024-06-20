import { useEffect, useState } from "react";
import {
    Result,
    getResults,
    addResult,
    deleteResult,
    Discipline,
    getDisciplines,
    Participant,
    getParticipants,
    searchResults,
} from "../services/apiFacade";
import DeleteModal from "../components/Modals/DeleteModal";
import AddResultModal from "./modal/AddResultModal";
import EditResultModal from "./modal/EditResultModal";
import "./resultList.css";

export default function ResultsList() {
    const [results, setResults] = useState<Result[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedResultId, setSelectedResultId] = useState<number | null>(null);
    const [selectedResultName, setSelectedResultName] = useState<string | null>(null);
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getResults().then(setResults);
        getDisciplines().then(setDisciplines);
        getParticipants().then(setParticipants);
    }, []);

    function handleDelete() {
        if (selectedResultId !== null) {
            deleteResult(selectedResultId).then(() => {
                setResults(results.filter((result) => result.id !== selectedResultId));
                setIsDeleteModalOpen(false);
            });
        }
    }

    function handleAdd(result: Result) {
        addResult(result).then((newResult) => {
            setResults([...results, newResult]);
            setIsAddModalOpen(false);
        });
    }

    function handleEdit(result: Result) {
        addResult(result).then((updatedResult) => {
            setResults(results.map((r) => (r.id === updatedResult.id ? updatedResult : r)));
            setIsEditModalOpen(false);
        });
    }

    function editResult(result: Result) {
        setSelectedResultId(result.id);
        setSelectedResultName(result.participant.name);
        setIsEditModalOpen(true);
    }

    function openDeleteModal(id: number, name: string) {
        setSelectedResultId(id);
        setSelectedResultName(name);
        setIsDeleteModalOpen(true);
    }

    function handleSearch() {
        if (searchTerm.trim() !== "") {
            searchResults(searchTerm).then(setResults);
        } else {
            getResults().then(setResults);
        }
    }

    return (
        <div>
            <h2>Results</h2>
            <div className="search-container">
                <input type="text" placeholder="Search by participant name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="add-result-container">
                <button className="add-result-button" onClick={() => setIsAddModalOpen(true)}>
                    Add Result
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Result Type</th>
                        <th>Result Value</th>
                        <th>Discipline</th>
                        <th>Participant</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.id}>
                            <td>{new Date(result.date).toLocaleDateString()}</td>
                            <td>{result.resultType}</td>
                            <td>{result.resultValue}</td>
                            <td>{result.discipline.name}</td>
                            <td>{result.participant.name}</td>
                            <td>
                                <button onClick={() => editResult(result)}>Edit</button>
                                <button className="delete" onClick={() => openDeleteModal(result.id, result.participant.name)}>
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
                    participantName={selectedResultName}
                />
            )}
            {isAddModalOpen && (
                <AddResultModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAdd}
                    disciplines={disciplines}
                    participants={participants}
                />
            )}
            {isEditModalOpen && selectedResultId !== null && (
                <EditResultModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onEdit={handleEdit}
                    result={results.find((r) => r.id === selectedResultId)!}
                    disciplines={disciplines}
                    participants={participants}
                />
            )}
        </div>
    );
}
