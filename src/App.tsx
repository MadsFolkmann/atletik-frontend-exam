import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import "./App.css";
import ParticipantsList from "./participants/ParticipantsList";
import ResultsList from "./results/ResultList";
import DisciplineList from "./discipline/DisciplinList";

export default function App() {
  return (
      <Layout>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/participants" element={<ParticipantsList />} />
              <Route path="/results" element={<ResultsList />} />
              <Route path="/discipline" element={<DisciplineList />} />
          </Routes>
      </Layout>
  );
}
