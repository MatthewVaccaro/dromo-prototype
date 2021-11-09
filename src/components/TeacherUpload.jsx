import DromoUploader from "dromo-uploader-react";
import { useState } from "react";
import addIcon from "../asset/icons/addIcon.svg";
import editIcon from "../asset/icons/editIcon.svg";
import editIconDisabled from "../asset/icons/editIconDisabled.svg";
import teacherAvatar from "../asset/teacherAvatar.svg";
import { baseTeacherFields } from "../helpers/dromoHelper";

function TeacherUpload() {
  const getLocalTeachers = localStorage.getItem("teacherData")
    ? JSON.parse(localStorage.getItem("teacherData"))
    : 0;

  const localTeachers = getLocalTeachers
    ? {
        teacherLength: getLocalTeachers.length,
      }
    : 0;

  const [teachers, setTeachers] = useState(localTeachers);

  const key = process.env.REACT_APP_DROMO_KEY;
  const siteLeader = {
    id: "1",
    name: "Jane Doe",
    email: "jane@dromo.io",
    companyId: "Dromo",
    companyName: "12345",
  };

  const resultHandler = (res) => {
    console.log("res:", res);
    setTeachers({
      teacherLength: res.length,
    });
    localStorage.setItem("teacherData", JSON.stringify(res));
  };

  return (
    <div className="uploadContainer">
      <img className="studentIcon" src={teacherAvatar} alt="student avatar" />
      <h2> Teacher Data </h2>
      <div className={`dataState ${teachers !== 0 ? "on" : ""} `}>
        {teachers !== 0
          ? `${teachers.teacherLength} Teachers`
          : "No Data Added"}
      </div>
      <ul>
        <li> You can upload and edit your Student data as much as you want.</li>
        <li>Adding Student data to your platform doesn’t create accounts.</li>
        <li>Adding Rosters to Students is optional but powerful!</li>
      </ul>
      <div className="buttonContainer">
        <div className="buttonSection">
          <img src={addIcon} alt="add icon" />
          <DromoUploader
            licenseKey={key}
            fields={baseTeacherFields}
            settings={{
              importIdentifier: "Studnets",
              developmentMode: true,
              allowCustomFields: true,
            }}
            user={siteLeader}
            onResults={resultHandler}
          >
            Add Data
          </DromoUploader>
        </div>
        <div className="divider" />
        <div className="buttonSection">
          <img
            src={teachers !== 0 ? editIcon : editIconDisabled}
            alt="edit icon"
          />
          <button className={` ${teachers !== 0 ? "active" : "disabled"} `}>
            {" "}
            Edit Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherUpload;
