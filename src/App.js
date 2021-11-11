import "./App.css";
import Nav from "./components/nav";
import StudentUploader from "./components/StudentUploader";
import TeacherUploader from "./components/TeacherUpload";
import TemplateCard from "./components/templateCard";
import studentTemplateCSV from "./asset/csv/liveschool-students-template.csv"
import teacherTemplateCSV from "./asset/csv/liveschool-teachers-template.csv"

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
          link="https://docs.google.com/spreadsheets/d/18T1NELEDMnRSQUN08SOZ1DZOLqEjoJFzzDtQlKG-08E/edit?usp=sharing"
          file={studentTemplateCSV}
        />

        <TemplateCard
          headline="Teacher Data Template"
          content="A simple tempalte to help get your Teachers & their data setup quickly and easily."
          link="https://docs.google.com/spreadsheets/d/1a5qZY3w5kyGW1Xwhskhzd_Rpc9JIM8t_lEs63V0BZw8/edit?usp=sharing"
          file={teacherTemplateCSV}
        />
      </div>

      <button className="mt-200" onClick={()=> {
        localStorage.clear()
        window.location.reload()
        }} > Clear Data </button>
    </>
  );
}

export default App;
