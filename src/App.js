import "./App.css";
import Nav from "./components/nav";
import StudentUploader from "./components/StudentUploader";
import TeacherUploader from "./components/TeacherUpload";

function App() {
  return (
    <>
      <Nav />
      <div className="App container">
        <StudentUploader />
        <TeacherUploader />
      </div>
    </>
  );
}

export default App;
