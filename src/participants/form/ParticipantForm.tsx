import React, { useState, useEffect } from "react";
import { Participant, Gender, Discipline, getDisciplines } from "../../services/apiFacade";


interface ParticipantFormProps {
    onSubmit: (participant: Participant) => void;
    onClose: () => void;
    participant?: Participant;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ onSubmit, onClose, participant }) => {
    const [name, setName] = useState(participant?.name || "");
    const [gender, setGender] = useState<Gender>(participant?.gender || Gender.MALE);
    const [age, setAge] = useState(participant?.age || 0);
    const [club, setClub] = useState(participant?.club || "");
    const [availableDisciplines, setAvailableDisciplines] = useState<Discipline[]>([]);
    const [selectedDisciplineIds, setSelectedDisciplineIds] = useState<number[]>(participant?.disciplines?.map((d) => d.id) || []);

    useEffect(() => {
        getDisciplines().then((data) => setAvailableDisciplines(data));
        if (participant) {
            setName(participant.name);
            setGender(participant.gender);
            setAge(participant.age);
            setClub(participant.club);
            setSelectedDisciplineIds(participant.disciplines?.map((d) => d.id) || []);
        }
    }, [participant]);

    const handleDisciplineChange = (id: number) => {
        setSelectedDisciplineIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((disciplineId) => disciplineId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newParticipant = {
            id: participant ? participant.id : null,
            name,
            gender,
            age,
            club,
            disciplineIds: selectedDisciplineIds,
        };
        onSubmit(newParticipant);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Gender:</label>
                <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} required>
                    <option value={Gender.MALE}>Male</option>
                    <option value={Gender.FEMALE}>Female</option>
                    <option value={Gender.OTHER}>Other</option>
                </select>
            </div>
            <div>
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} required />
            </div>
            <div>
                <label>Club:</label>
                <input type="text" value={club} onChange={(e) => setClub(e.target.value)} required />
            </div>
            <div>
                <label>Disciplines:</label>
                {availableDisciplines.map((discipline) => (
                    <div key={discipline.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedDisciplineIds.includes(discipline.id)}
                                onChange={() => handleDisciplineChange(discipline.id)}
                            />
                            {discipline.name}
                        </label>
                    </div>
                ))}
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

export default ParticipantForm;
