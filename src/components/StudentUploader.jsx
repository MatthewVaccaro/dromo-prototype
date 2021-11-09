import DromoUploader from "dromo-uploader-react";
import { useState } from "react";
import addIcon from "../asset/icons/addIcon.svg";
import editIcon from "../asset/icons/editIcon.svg";
import editIconDisabled from "../asset/icons/editIconDisabled.svg";
import studentAvatar from "../asset/studentAvatar.svg";
import {
  baseStudentFields,
  cleanResults,
  rosterCount,
} from "../helpers/dromoHelper";

function StudentUploader() {
  const getLocalStudents = localStorage.getItem("studentData")
    ? JSON.parse(localStorage.getItem("studentData"))
    : 0;

  const localStudents = getLocalStudents
    ? {
        studentLength: getLocalStudents.length,
        rosterLength: Object.keys(getLocalStudents[0]).length - 3,
      }
    : 0;

  const [students, setStudents] = useState(localStudents);

  const key = process.env.REACT_APP_DROMO_KEY;
  const siteLeader = {
    id: "1",
    name: "Jane Doe",
    email: "jane@dromo.io",
    companyId: "Dromo",
    companyName: "12345",
  };

  const resultHandler = (res) => {
    const cleanData = cleanResults(res);
    console.log("res: --->", cleanData.length);

    setStudents({
      studentLength: cleanData.length,
      rosterLength: rosterCount(cleanData),
    });
    localStorage.setItem("studentData", JSON.stringify(cleanData));
  };

  return (
    <div className="uploadContainer">
      <img className="studentIcon" src={studentAvatar} alt="student avatar" />
      <h2> Student Data </h2>
      <div className={`dataState ${students !== 0 ? "on" : ""} `}>
        {students !== 0
          ? `${students.studentLength} Students  :  ${students.rosterLength} Rosters`
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
            fields={baseStudentFields}
            settings={{
              allowCustomFields: true,
              importIdentifier: "Studnets",
              developmentMode: true,
            }}
            user={siteLeader}
            onResults={resultHandler}
            columnHooks={[
              {
                fieldName: "roster",
                callback: (values) => {
                  return console.log(values);
                },
              },
            ]}
          >
            Add Data
          </DromoUploader>
        </div>
        <div className="divider" />
        <div className="buttonSection">
          <img
            src={students !== 0 ? editIcon : editIconDisabled}
            alt="edit icon"
          />
          <button className={` ${students !== 0 ? "active" : "disabled"} `}>
            Edit Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentUploader;
