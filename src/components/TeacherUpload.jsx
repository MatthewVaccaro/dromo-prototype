import DromoUploader from "dromo-uploader-react";
import { useState } from "react";
import addIcon from "../asset/icons/addIcon.svg";
import editIcon from "../asset/icons/editIcon.svg";
import editIconDisabled from "../asset/icons/editIconDisabled.svg";
import teacherAvatar from "../asset/teacherAvatar.svg";
import { baseTeacherFields, cleanResults } from "../helpers/dromoHelper";

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
    const cleanData = cleanResults(res);
    console.log("res:", cleanData);
    setTeachers({
      teacherLength: cleanData.length,
    });
    localStorage.setItem("teacherData", JSON.stringify(cleanData));
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
      

        <li> Create new teachers, or edit your existing staff data.</li>
        <li>Creating teachers doesn't automatically invite them to LiveSchool; you'll do that later.</li>
        <li>Optionally, cross-reference rosters from your Student Data upload to share rosters selectively.</li>
      </ul>
      <div className="buttonContainer">
        <div className="buttonSection">
          <img src={addIcon} alt="add icon" />
          <DromoUploader
            licenseKey={key}
            fields={baseTeacherFields}
            settings={{
              importIdentifier: "Teachers",
              title: "Upload your Teacher data!",
              displayEncoding: false,
              autoMapHeaders: true,
              styleOverrides: { global: { textColor: "#3b6fc8"}},
                manualInputDisabled: true,
                developmentMode: true,
            }}
            user={siteLeader}
            onResults={resultHandler}
            rowHooks={[
              (record) => {
                const newRecord = record;
                for (var key in newRecord.row) {
                  if (
                    key.includes("roster") &&
                    newRecord.row[key].value === ""
                  ) {
                    console.log("found", newRecord.row[key]);
                    newRecord.row[key].value = "n/a";
                    newRecord.row[key].info = [
                      {
                        message:
                          "Updated to N/A because it was empty, no need to edit.",
                        level: "info",
                      },
                    ];
                  }
                }
                return newRecord;
              },
            ]}
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
            Edit Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherUpload;