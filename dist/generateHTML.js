const fs = require('fs')
const createManager = function (manager) {
    return ` <div class="employee">
    <div class="cardTop">    
        <p class=name>${manager.name}</p>
        <p>Manager</p>
    </div>
    <div class=cardBot>
        <p>ID: ${manager.id}</p>
        <p>Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
        <p>Office Phone #: ${manager.offcePhone}</p>
    </div>
</div>`
}
const createEngineer = function (engineer) {
    return ` <div class="employee">
    <div class="cardTop">    
        <p class=name>${engineer.name}</p>
        <p>Engineer</p>
    </div>
    <div class=cardBot>
        <p>ID: ${engineer.id}</p>
        <p>Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
        <p>GitHub: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
    </div>
</div>`
}
const createIntern = function (intern) {
    return ` <div class="employee">
    <div class="cardTop">    
        <p class=name>${intern.name}</p>
        <p>Intern</p>
    </div>
    <div class=cardBot>
        <p>ID: ${intern.id}</p>
        <p>Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
        <p>School: ${intern.school}</p>
    </div>
</div>`
}
const employeeCard = []

generateHTML = (data) => {
    for (let i = 0; i < data.length; i++) {
        const employee = data[i]
        const role = employee.getRole();

        if (role == "Manager") {
            const managerCard = createManager(employee)
            employeeCard.push(managerCard)
        }

        else if (role == "Engineer") {
            const engineerCard = createEngineer(employee)
            employeeCard.push(engineerCard)
        }
        else {
            const internCard = createIntern(employee)
            employeeCard.push(internCard)
        }
    }   
    const renderEmployees = employeeCard.join('')
    renderHTMLdoc(renderEmployees)
    console.log(renderEmployees)
}
const renderHTMLdoc = function (renderEmployees) {
    text= `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../src/style.css" />
        <title>Team Roster</title>
        <script src="../index.js"></script>
    </head>
    <h1> My Team </h1>
    <div id=body>
    ${renderEmployees}
    </div>
    `
    fs.writeFile('./dist/index.html', text, err => {
        if (err) {
            console.log(err);
            return;
        }
    }
    )   
}
module.exports = generateHTML;