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
import DeleteResultModal from "./modal/DeleteResultModal";
import AddResultModal from "./modal/AddResultModal";
import EditResultModal from "./modal/EditResultModal";
import "./resultList.css";

export default function ResultsList() {
    const [results, setResults] = useState<Result[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedResult, setSelectedResult] = useState<Result | null>(null);
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        gender: "",
        ageGroup: "",
        discipline: "",
    });
    const [sortConfig, setSortConfig] = useState({ key: "resultValue", direction: "desc" });

    useEffect(() => {
        getResults().then(setResults);
        getDisciplines().then(setDisciplines);
        getParticipants().then(setParticipants);
    }, []);

    function handleDelete() {
        if (selectedResult !== null) {
            deleteResult(selectedResult.id).then(() => {
                setResults(results.filter((result) => result.id !== selectedResult.id));
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
        setSelectedResult(result);
        setIsEditModalOpen(true);
    }

    function openDeleteModal(result: Result) {
        setSelectedResult(result);
        setIsDeleteModalOpen(true);
    }

    function handleSearch() {
        if (searchTerm.trim() !== "") {
            searchResults(searchTerm).then(setResults);
        } else {
            getResults().then(setResults);
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

    function applyFilters(results: Result[]) {
        return results.filter((result) => {
            return (
                (filters.gender === "" || result.participant.gender === filters.gender) &&
                (filters.ageGroup === "" ||
                    (filters.ageGroup === "young" && result.participant.age < 30) ||
                    (filters.ageGroup === "adult" && result.participant.age >= 30)) &&
                (filters.discipline === "" || result.discipline.name === filters.discipline)
            );
        });
    }

    function applySort(results: Result[]) {
        if (sortConfig.key === "") return results;

        const sortedResults = [...results];
        sortedResults.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
        return sortedResults;
    }

    const filteredAndSortedResults = applySort(applyFilters(results));

    return (
        <div>
            <h2>Results</h2>
            <div className="filter-container">
                <input type="text" placeholder="Search by participant name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                <select name="discipline" value={filters.discipline} onChange={handleFilterChange}>
                    <option value="">All Disciplines</option>
                    {disciplines.map((discipline) => (
                        <option key={discipline.id} value={discipline.name}>
                            {discipline.name}
                        </option>
                    ))}
                </select>
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
                        <th onClick={() => handleSort("resultValue")}>Result Value</th>
                        <th>Discipline</th>
                        <th>Participant</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedResults.map((result) => (
                        <tr key={result.id}>
                            <td>{new Date(result.date).toLocaleDateString()}</td>
                            <td>{result.resultType}</td>
                            <td>{result.resultValue}</td>
                            <td>{result.discipline.name}</td>
                            <td>{result.participant.name}</td>
                            <td>
                                <button onClick={() => editResult(result)}>Edit</button>
                                <button className="delete" onClick={() => openDeleteModal(result)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isDeleteModalOpen && (
                <DeleteResultModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={handleDelete}
                    result={selectedResult}
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
            {isEditModalOpen && selectedResult !== null && (
                <EditResultModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onEdit={handleEdit}
                    result={selectedResult}
                    disciplines={disciplines}
                    participants={participants}
                />
            )}
        </div>
    );
}