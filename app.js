const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");

const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//empty array to hold team
const team = [];

//function to create Manager profile
const createManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter your name:",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter your email:",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter your employee ID:",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter your office Number:",
      },
    ])
    .then((response) => {
      const manager = new Manager(
        response.name,
        response.email,
        response.id,
        response.officeNumber
      );
      team.push(manager);
      newTeamMember();
    });
};

//function to ask user if they want to add a new member
const newTeamMember = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What type of employee would you like to add?",
        choices: ["Engineer", "Intern", "None"],
      },
    ])
    .then((answer) => {
      if (answer.role === "Engineer") {
        createEngineer();
      } else if (answer.role === "Intern") {
        createIntern();
      } else {
        createRender();
        // const createHTML = render(team);
        // fs.writeFile(outputPath, createHTML, (err) => {
        //   if (err) throw err;
        //   console.log("Take a look at your new team!");
        // });
      }
    });
};

//function to create an Engineer
const createEngineer = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the Engineer's name:",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the Engineer's email:",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the Engineer's employee ID:",
      },
      {
        type: "input",
        name: "github",
        message: "Please enter the Engineer's gitHub username:",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.email,
        response.id,
        response.github
      );
      team.push(engineer);
      newTeamMember();
    });
};

//function to create an Intern
const createIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter the Intern's name:",
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the Intern's email:",
      },
      {
        type: "input",
        name: "id",
        message: "Please enter the Intern's employee ID:",
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the Intern's school:",
      },
    ])
    .then((response) => {
      const intern = new Intern(
        response.name,
        response.email,
        response.id,
        response.school
      );
      team.push(intern);
      newTeamMember();
    });
};

function createRender() {
  fs.writeFile(outputPath, render(team), (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Take a look at your new team!");
  });
}

//call to Manager function
createManager();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``
