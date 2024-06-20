import React, { useState, useEffect } from "react";
import { Discipline, ResultType } from "../../services/apiFacade";


interface DisciplineFormProps {
    onSubmit: (discipline: Discipline) => void;
    onClose: () => void;
    discipline?: Discipline;
}

const DisciplineForm: React.FC<DisciplineFormProps> = ({ onSubmit, onClose, discipline }) => {
    const [name, setName] = useState(discipline?.name || "");
    const [resultType, setResultType] = useState<ResultType>(discipline?.resultType || ResultType.TIME);

    useEffect(() => {
        if (discipline) {
            setName(discipline.name);
            setResultType(discipline.resultType);
        }
    }, [discipline]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newDiscipline = {
            id: discipline ? discipline.id : null,
            name,
            resultType,
        };
        onSubmit(newDiscipline);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Result Type:</label>
                <select value={resultType} onChange={(e) => setResultType(e.target.value as ResultType)} required>
                    <option value={ResultType.TIME}>Time</option>
                    <option value={ResultType.DISTANCE}>Distance</option>
                    <option value={ResultType.POINT}>Point</option>
                </select>
            </div>
            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default DisciplineForm;
