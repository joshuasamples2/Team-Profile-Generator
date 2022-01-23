const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const generateHTML = require('./dist/generateHTML')
let members = [];

function teamMember() {

    inquirer.prompt([
        {
            type: "input",
            message: "Manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "Manager's id?",
            name: "id",
        },
        {
            type: "input",
            message: "Manager's email?",
            name: "email",
        },
        {
            type: "input",
            message: "Manager's office number?",
            name: "officeNumber",
        }
    ])
        .then(function (answers) {
            let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            members.push(manager)
            nextMem()
        })
        .catch(function (err) {
            console.log(err);
        });
    async function nextMem() {
        try {
            let teamChoice = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'team',
                    message: 'Which type of team member would you like to add',
                    choices: ['Engineer', 'Intern', 'No More Employees']
                }
            ]);
            if (teamChoice.team === 'Engineer') {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Engineer's name?",
                        name: "name",
                    },
                    {
                        type: "input",
                        message: "Engineer's id?",
                        name: "id",
                    },
                    {
                        type: "input",
                        message: "Engineer's email?",
                        name: "email",
                    },
                    {
                        type: "input",
                        message: "Engineer's GitHub?",
                        name: "github",
                    }
                ])
                    .then(function (answers) {
                        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                        members.push(engineer);
                        nextMem();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            } else if (teamChoice.team === 'Intern') {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "Intern's name?",
                        name: "name",
                    },
                    {
                        type: "input",
                        message: "Intern's id?",
                        name: "id",
                    },
                    {
                        type: "input",
                        message: "Intern's email?",
                        name: "email",
                    },
                    {
                        type: "input",
                        message: "Interns School?",
                        name: "school",
                    }
                ])
                    .then(function (answers) {
                        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                        members.push(intern);
                        nextMem();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            } else { 
                console.log(members)
                generateHTML(members) }
        } catch (err) {
            console.log(err);
        }
    }
}
teamMember();