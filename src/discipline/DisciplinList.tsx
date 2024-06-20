import { useEffect, useState } from "react";
import { Discipline, getDisciplines, addDiscipline, deleteDiscipline, ResultType } from "../services/apiFacade";
import DeleteModal from "./modal/DeleteDisciplineModal";
import AddDisciplineModal from "./modal/AddDisciplineModal";
import EditDisciplineModal from "./modal/EditDisciplineModal";
import "./disciplineList.css";

export default function DisciplineList() {
    const [disciplines, setDisciplines] = useState<Discipline[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDisciplineId, setSelectedDisciplineId] = useState<number | null>(null);
    const [selectedDisciplineName, setSelectedDisciplineName] = useState<string | null>(null);

    useEffect(() => {
        getDisciplines().then(setDisciplines);
    }, []);

    function handleDelete() {
        if (selectedDisciplineId !== null) {
            deleteDiscipline(selectedDisciplineId).then(() => {
                setDisciplines(disciplines.filter((discipline) => discipline.id !== selectedDisciplineId));
                setIsDeleteModalOpen(false);
            });
        }
    }

    function handleAdd(discipline: Discipline) {
        addDiscipline(discipline).then((newDiscipline) => {
            setDisciplines([...disciplines, newDiscipline]);
            setIsAddModalOpen(false);
        });
    }

    function handleEdit(discipline: Discipline) {
        addDiscipline(discipline).then((updatedDiscipline) => {
            setDisciplines(disciplines.map((d) => (d.id === updatedDiscipline.id ? updatedDiscipline : d)));
            setIsEditModalOpen(false);
        });
    }

    function editDiscipline(discipline: Discipline) {
        setSelectedDisciplineId(discipline.id);
        setSelectedDisciplineName(discipline.name);
        setIsEditModalOpen(true);
    }

    function openDeleteModal(id: number, name: string) {
        setSelectedDisciplineId(id);
        setSelectedDisciplineName(name);
        setIsDeleteModalOpen(true);
    }

    return (
        <div>
            <h2>Disciplines</h2>
            <div className="add-discipline-container">
                <button className="add-discipline-button" onClick={() => setIsAddModalOpen(true)}>
                    Add Discipline
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Result Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {disciplines.map((discipline) => (
                        <tr key={discipline.id}>
                            <td>{discipline.name}</td>
                            <td>{discipline.resultType}</td>
                            <td>
                                <button onClick={() => editDiscipline(discipline)}>Edit</button>
                                <button className="delete" onClick={() => openDeleteModal(discipline.id, discipline.name)}>
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
                    disciplineName={selectedDisciplineName}
                />
            )}
            {isAddModalOpen && <AddDisciplineModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAdd} />}
            {isEditModalOpen && selectedDisciplineId !== null && (
                <EditDisciplineModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onEdit={handleEdit}
                    discipline={disciplines.find((d) => d.id === selectedDisciplineId)!}
                />
            )}
        </div>
    );
}
