import { API_URL } from "../settings";
import { makeOptions, handleHttpErrors } from "./fetchUtils";
const PARTICIPANT_URL = API_URL + "/participants";
const DISCIPLINE_URL = API_URL + "/disciplines";
const RESULT_URL = API_URL + "/results";

enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

enum ResultType {
    TIME = "TIME",
    DISTANCE = "DISTANCE",
    POINTS = "POINTS",
}

interface Discipline {
    id: number | null;
    name: string;
    resultType: ResultType;
    participants: Participant[] | null;
    results: Result[] | null;
}

interface Participant {
    id: number | null;
    name: string;
    gender: Gender;
    age: number;
    club: string;
    disciplines: Discipline[] | null;
    results: Result[] | null;
}

interface Result {
    id: number | null;
    date: Date;
    resultType: ResultType;
    resultValue: number;
    discipline: Discipline;
    participant: Participant;
}

let Participants: Array<Participant> = [];
let Disciplines: Array<Discipline> = [];
let Results: Array<Result> = [];



async function getParticipants(): Promise<Array<Participant>> {
    if (Participants.length > 0) return [...Participants];
    try {
        const res = await fetch(PARTICIPANT_URL);
        if (!res.ok) {
            throw new Error("Fetch request failed");
        }

        const participantsData = await res.json(); // Parse responsen som JSON
        console.log("Participants fetched successfully:", participantsData); // Log dataene
        Participants = participantsData; 
        return Participants;
    } catch (error) {
        console.log("An error occurred while fetching participants:", error);
        return [];
    }
}

async function searchParticipants(name: string): Promise<Array<Participant>> {
    const options = makeOptions("GET", null, true);
    return fetch(`${PARTICIPANT_URL}/search?name=${name}`, options).then(handleHttpErrors);
}


async function addParticipant(newParticipant: Participant): Promise<Participant> {
    const method = newParticipant.id ? "PUT" : "POST";
    const options = makeOptions(method, newParticipant, true);
    const URL = newParticipant.id ? `${PARTICIPANT_URL}/${newParticipant.id}` : PARTICIPANT_URL;
    return fetch(URL, options).then(handleHttpErrors);
}

async function deleteParticipant(id: number): Promise<void> {
    const options = makeOptions("DELETE", null, true); // Ensure headers and method are correctly set
    return fetch(`${PARTICIPANT_URL}/${id}`, options).then((response) => {
        if (response.ok) {
            // Handle both cases where the server might not return any content
            return response.text().then((text) => (text ? JSON.parse(text) : {}));
        } else {
            // Extract error message from response, if any
            return response.text().then((text) => {
                const error = text ? JSON.parse(text) : { message: "Failed to delete the participant" };
                throw new Error(error.message);
            });
        }
    });
}


async function getDisciplines(): Promise<Array<Discipline>> {
    if (Disciplines.length > 0) return [...Disciplines];
    try {
        const res = await fetch(DISCIPLINE_URL);
        if (!res.ok) {
            throw new Error("Fetch request failed");
        }

        const disciplinesData = await res.json(); // Parse responsen som JSON
        console.log("Disciplines fetched successfully:", disciplinesData); // Log dataene
        Disciplines = disciplinesData; // Tildel dataene til biografer-arrayen
        return Disciplines;
    } catch (error) {
        console.log("An error occurred while fetching disciplines:", error);
        return [];
    }
}


async function getResults(): Promise<Array<Result>> {
    if (Results.length > 0) return [...Results];
    try {
        const res = await fetch(RESULT_URL);
        if (!res.ok) {
            throw new Error("Fetch request failed");
        }

        const resultsData = await res.json(); // Parse responsen som JSON
        console.log("Results fetched successfully:", resultsData); // Log dataene
        Results = resultsData; // Tildel dataene til biografer-arrayen
        return Results;
    } catch (error) {
        console.log("An error occurred while fetching results:", error);
        return [];
    }
}

async function addResult(newResult: Result): Promise<Result> {
    const method = newResult.id ? "PUT" : "POST";
    const options = makeOptions(method, newResult, true);
    const URL = newResult.id ? `${RESULT_URL}/${newResult.id}` : RESULT_URL;
    return fetch(URL, options).then(handleHttpErrors);
}

async function deleteResult(id: number): Promise<void> {
    const options = makeOptions("DELETE", null, true); // Ensure headers and method are correctly set
    return fetch(`${RESULT_URL}/${id}`, options).then((response) => {
        if (response.ok) {
            // Handle both cases where the server might not return any content
            return response.text().then((text) => (text ? JSON.parse(text) : {}));
        } else {
            // Extract error message from response, if any
            return response.text().then((text) => {
                const error = text ? JSON.parse(text) : { message: "Failed to delete the result" };
                throw new Error(error.message);
            });
        }
    });
}

async function searchResults(searchTerm: string): Promise<Array<Result>> {
    const options = makeOptions("GET", null, true);
    return fetch(`${RESULT_URL}/search?participantName=${searchTerm}`, options).then(handleHttpErrors);
}


export type { Participant, Discipline, Result };
export { getParticipants, addParticipant, deleteParticipant, getDisciplines, Gender, ResultType, searchParticipants };
export {getResults, addResult, deleteResult, searchResults };
