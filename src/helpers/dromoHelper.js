export const defaultTeacherFileds = [
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
  {
    label: "Email",
    key: "email",
    validators: [{
      validate: "regex_match",
      regex: "^\\S+@\\S+\\.\\S+$",
      errorMessage:
        "Incorrect email address."
    },
    {
      validate: "unique",
      errorMessage: "Emails must be unique"
    },
    {
      validate: "required",
      errorMessage: "Email field can NOT be left empty"
    }
  ]
  }
];

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
  {
    label: "Email",
    key: "email",
    validators: [{
      validate: "regex_match",
      regex: "^\\S+@\\S+\\.\\S+$",
      errorMessage:
        "Incorrect email address."
    },
    {
      validate: "unique",
      errorMessage: "Emails must be unique"
    },
    {
      validate: "required",
      errorMessage: "Email field can NOT be left empty"
    }
  ]
  }
];

for (var i = 1; i < 11; i++) {
  baseStudentFields.push({
    label: "roster " + i,
    key: "roster_" + i,
  });
}

console.log("5555", baseTeacherFields)

export function uniqueRosters(cleanData) {
  var unique = ["n/a"];
  cleanData.map((obj) => {
    for (var key in obj) {
      if (key.includes("roster") && !unique.includes(obj[key])) {
        unique.push(obj[key]);
      }
    }
  });

  return unique;
}

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
