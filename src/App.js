import "./App.css";
import Nav from "./components/nav";
import StudentUploader from "./components/StudentUploader";
import TeacherUploader from "./components/TeacherUpload";
import TemplateCard from "./components/templateCard";

function App() {
  return (
    <>
      <Nav />
      <div className="App container">
        <StudentUploader />
        <TeacherUploader />
      </div>
      <div className="App container mt-24">
        <TemplateCard
          headline="Student Data Template"
          content="This template will provide details on how to setup your Student data correctly & how to use optinal rosters."
          link="google.com"
        />

        <TemplateCard
          headline="Teacher Data Template"
          content="A simple tempalte to help get your Teachers & their data setup quickly and easily."
          link="https://github.com/MatthewVaccaro/dromo-prototype"
        />
      </div>
    </>
  );
}

export default App;
