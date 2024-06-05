import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import { UserPage, PostPage, SignupPage, LoginPage, HomePage, CreatePost, Update, Explore } from "./pages/pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/update" element={<Update />} />
          <Route path="/create" element={<CreatePost />} />
        </Route>
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
