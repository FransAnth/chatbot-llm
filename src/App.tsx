import { Route, Routes } from "react-router-dom";
import "./App.css";

import ChatConfigPage from "./pages/ChatConfiguration";
import PageLayout from "./layout/layout";
import ChatInterfacePage from "./pages/ChatInterface";

function App() {
  return (
    <Routes>
      <Route path="" element={<PageLayout />}>
        <Route path="/chats" element={<ChatInterfacePage />} />
        <Route path="/config" element={<ChatConfigPage />} />
      </Route>
    </Routes>
  );
}

export default App;
