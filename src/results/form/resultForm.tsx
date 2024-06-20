import React, { useState, useEffect } from "react";
import { Result, Discipline, Participant, ResultType, getDisciplines, getParticipants } from "../../services/apiFacade";


const ResultForm: React.FC<ResultFormProps> = ({ onSubmit, onClose, result }) => {
    const [date, setDate] = useState(result ? new Date(result.date).toISOString().substr(0, 10) : new Date().toISOString().substr(0, 10));
    const [resultType, setResultType] = useState<ResultType>(result ? result.resultType : ResultType.TIME);
    const [resultValue, setResultValue] = useState(result ? result.resultValue : 0);
    const [availableDisciplines, setAvailableDisciplines] = useState<Discipline[]>([]);
    const [availableParticipants, setAvailableParticipants] = useState<Participant[]>([]);
    const [selectedDisciplineId, setSelectedDisciplineId] = useState<number>(result ? result.discipline.id : 0);
    const [selectedParticipantId, setSelectedParticipantId] = useState<number>(result ? result.participant.id : 0);

    useEffect(() => {
        getDisciplines().then(setAvailableDisciplines);
        getParticipants().then(setAvailableParticipants);
        if (result) {
            setDate(new Date(result.date).toISOString().substr(0, 10));
            setResultType(result.resultType);
            setResultValue(result.resultValue);
            setSelectedDisciplineId(result.discipline.id);
            setSelectedParticipantId(result.participant.id);
        }
    }, [result]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newResult = {
            id: result ? result.id : null,
            date: new Date(date),
            resultType,
            resultValue,
            disciplineId: selectedDisciplineId,
            participantId: selectedParticipantId,
        };
        onSubmit(newResult);
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
                <label>Result Type:</label>
                <select value={resultType} onChange={(e) => setResultType(e.target.value as ResultType)} required>
                    <option value={ResultType.TIME}>Time</option>
                    <option value={ResultType.DISTANCE}>Distance</option>
                    <option value={ResultType.POINTS}>Points</option>
                </select>
            </div>
            <div>
                <label>Result Value:</label>
                <input type="number" value={resultValue} onChange={(e) => setResultValue(parseFloat(e.target.value))} required />
            </div>
            <div>
                <label>Discipline:</label>
                <select value={selectedDisciplineId} onChange={(e) => setSelectedDisciplineId(parseInt(e.target.value))} required>
                    <option value="" disabled>
                        Select discipline
                    </option>
                    {availableDisciplines.map((discipline) => (
                        <option key={discipline.id} value={discipline.id}>
                            {discipline.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Participant:</label>
                <select value={selectedParticipantId} onChange={(e) => setSelectedParticipantId(parseInt(e.target.value))} required>
                    <option value="" disabled>
                        Select participant
                    </option>
                    {availableParticipants.map((participant) => (
                        <option key={participant.id} value={participant.id}>
                            {participant.name}
                        </option>
                    ))}
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

export default ResultForm;
