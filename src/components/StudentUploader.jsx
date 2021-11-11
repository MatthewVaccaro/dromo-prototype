import DromoUploader from "dromo-uploader-react";
import { useState } from "react";
import addIcon from "../asset/icons/addIcon.svg";
import editIcon from "../asset/icons/editIcon.svg";
import editIconDisabled from "../asset/icons/editIconDisabled.svg";
import studentAvatar from "../asset/studentAvatar.svg";
import {
  baseStudentFields,
  baseTeacherFields,
  defaultTeacherFileds,
  cleanResults,
  rosterCount,
  uniqueRosters,
} from "../helpers/dromoHelper";

function StudentUploader() {
  const getLocalStudents = localStorage.getItem("studentData")
    ? JSON.parse(localStorage.getItem("studentData"))
    : 0;

  const getLocalRosters = localStorage.getItem("uniqueRosters")
    ? JSON.parse(localStorage.getItem("uniqueRosters"))
    : 0;

  const localStudents = getLocalStudents
    ? {
        studentLength: getLocalStudents.length,
        rosterLength: Object.keys(getLocalStudents[0]).length - 3,
      }
    : 0;

  const localRosters = getLocalRosters
    ? getLocalRosters.map((value) => {
        return { value, label: value };
      })
    : 0;

  console.log("XXX", localRosters);
  const [students, setStudents] = useState(localStudents);

  const key = process.env.REACT_APP_DROMO_KEY;
  const siteLeader = {
    id: "1",
    name: "Jane Doe",
    email: "jane@dromo.io",
    companyId: "Dromo",
    companyName: "12345",
  };

  if (localRosters !== 0) {
    localRosters.map((_, i) => {
      baseTeacherFields.push({
        label: "roster " + (i + 1),
        key: "roster_" + (i + 1),
        type: "select",
        selectOptions: localRosters,
      });
    });
  }

  const resultHandler = (res) => {
    const cleanData = cleanResults(res);
    const unique = uniqueRosters(cleanData);
    console.log("unique: --->", unique);

    localStorage.setItem("uniqueRosters", JSON.stringify(unique));

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
        <li> Create new students, or edit current students.</li>
        <li>Optionally, add rosters details to students.</li>
        <li>Adding students doesn't automatically invite them to use LiveSchool.</li>
      </ul>
      <div className="buttonContainer">
        <div className="buttonSection">
          <img src={addIcon} alt="add icon" />
          <DromoUploader
            licenseKey={key}
            fields={baseStudentFields}
            settings={{
              importIdentifier: "Students",
              title: "Upload your Students & Roster data!",
              displayEncoding: false,
              autoMapHeaders: true,
              styleOverrides: { global: { textColor: "#3b6fc8"}},
                manualInputDisabled: true,
                developmentMode: true,
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
