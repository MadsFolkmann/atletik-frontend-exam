import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import "./App.css";
import ParticipantsList from "./participants/ParticipantsList";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/participants" element={<ParticipantsList />} />



        
      </Routes>
    </Layout>
  );
}
