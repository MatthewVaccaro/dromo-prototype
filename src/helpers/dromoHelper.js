export const baseStudentFields = [
  {
    label: "First Name",
    key: "first_name",
    description: "studnets first name",
    alternateMatches: ["fname", "given name", "birth name"],
    validators: [
      { validate: "required", errorMessage: "First Name is required" },
    ],
  },
  {
    label: "Last Name",
    key: "last_name",
    description: "studnets last name",
    alternateMatches: ["lame", "surname", "family name"],
    validators: [
      { validate: "required", errorMessage: "Last Name is required" },
    ],
  },
  {
    label: "Grade",
    key: "grade",
    description: "The students current level of academics",
    validators: [{ validate: "required", errorMessage: "Grades are required" }],
  },
];

export const baseTeacherFields = [
  {
    label: "Honorific",
    key: "Honorific",
    description: "choose between: Dr. Mr. Ms. Mrs.",
    type: "select",
    selectOptions: [
      { value: "dr", label: "DR." },
      { value: "mr", label: "MR." },
      { value: "ms", label: "MS." },
      { value: "mrs", label: "MRS." },
    ],
  },
  {
    label: "First Name",
    key: "first_name",
    description: "Teacher's first name",
    alternateMatches: ["fname", "given name", "birth name"],
  },
  {
    label: "Last Name",
    key: "last_name",
    description: "Teacher's last name",
    alternateMatches: ["lame", "surname", "family name"],
  },
];

for (var i = 1; i < 11; i++) {
  baseStudentFields.push({
    label: "roster" + i,
    key: "roster_" + i,
  });
}

// const fakeRosterList = ["PE", "Science", "Math"];
// fakeRosterList.map((value) => {
//   baseStudentFields.push({
//     label: value,
//     key: value.split(" ").join("_"),
//     type: "checkbox",
//   });
//   baseTeacherFields.push({
//     label: value,
//     key: value.split(" ").join("_"),
//     type: "checkbox",
//   });
// });

export function cleanResults(res) {
  res.map((obj) => {
    for (var key in obj) {
      if (obj[key] === null) {
        delete obj[key];
      }
    }
  });
  return res;
}

export function rosterCount(cleanResults) {
  var max = 0;
  cleanResults.map((obj) => {
    if (Object.keys(obj).length > max) {
      max = Object.keys(obj).length;
    }
  });
  return max - 3;
}