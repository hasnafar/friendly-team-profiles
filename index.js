import inquirer from 'inquirer';
import fs from 'fs';
import cheerio from 'cheerio';


import {Employee} from './lib/Employee.js';
import {Manager} from '.lib/Manager.js';
import {Engineer} from '.lib/Engineer.js';
import {Intern} from '.lib/Intern.js';

var EMPLOYEES=[];

const questions_1=[
  {
    type: 'input',
    name: 'name',
    message: 'What is team manager"s name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is team manager"s employee ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is team manager"s email address?',
  },
  {
    type: 'input',
    name: 'number',
    message: 'What is team manager"s office number?',
  },
  {
    type: 'confirm',
    name: 'quit',
    message: 'Do you want to Quit Program?',
  },

];
const questions_2=[
  {
    type: 'list',
    name: 'emChoice',
    message: 'Do you want to add an Engineer or Intern?',
    choices: ['Engineer','Intern'],
  },
];
const questions_3=[

  {
    type: 'input',
    name: 'name',
    message: 'What is employee"s name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is employee"s ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is employee"s email address?',
  },
  {
    type: 'input',
    name: 'username',
    message: 'What is employee"s Github username?',
  },
  {
    type: 'confirm',
    name: 'quit',
    message: 'Do you want to Quit Program?',
  },
];
const questions_4=[

  {
    type: 'input',
    name: 'name',
    message: 'What is employee"s name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is employee"s ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is employee"s email address?',
  },
  {
    type: 'input',
    name: 'school',
    message: 'What is employee"s school?',
  },
  {
    type: 'confirm',
    name: 'quit',
    message: 'Do you want to Quit Program?',
  },


];


function getAnswers1() {

   return inquirer.prompt(questions_1).then((data1) => {
    
    EMPLOYEES.push(new Manager(data1.name,data1.id,data1.email,data1.number));
    if(data1.quit){
      generateHTML();
      return;
    }
    else {
      getAnswers2();
    }
  });
}

function getAnswers2(){
    return inquirer.prompt(questions_2).then((data2) => {   
      if(data2.emChoice=='Engineer')
        getAnswers3();
      else
        getAnswers4();
    });
}

function getAnswers3() {

  return inquirer.prompt(questions_3).then((data3) => {
   EMPLOYEES.push(new Engineer(data3.name,data3.id,data3.email,data3.username));
   if(data3.quit){
     generateHTML();
     return;
   }
   else {
     getAnswers2();
   }
 });
}

function getAnswers4() {

  return inquirer.prompt(questions_4).then((data4) => {
   EMPLOYEES.push(new Intern(data4.name,data4.id,data4.email,data4.school));
   if(data4.quit){
     generateHTML();
     return;
   }
   else {
     getAnswers2();
   }
 });
}

function generateHTML(){

  //Basic HTML
  
  const $ = cheerio.load(
  `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team Profile</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
      <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
  </head>
  <body>
      <header>
          <nav class="navbar" id="navbar">
              <section class="navbar-brand text-light bg-danger mb-0 py-5 w-100 text-center">My Team</section>
          </nav>
      </header>
      <main>
          <section class="container">
            <section class="row justify-content-center">
            
            </section>
          </section>
      </main>
    </body>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    </html>`
  
  );

  //Appending cards to each html

  for(var i=0;i<EMPLOYEES.length;i++){

   //checks if object is a Manager object

   if(EMPLOYEES[i].constructor.name==='Manager') {
  

          $('.justify-content-center').append(
                `<section class="col-sm-4 mt-5">
                    <section class="card bg-light shadow">
                        <section class="card-header bg-primary text-white">
                            <h4>${EMPLOYEES[i].name}</h4>
                            <h5><i class="fas fa-mug-hot"> </i>Manager</h5>
                        </section>
                        <section class="card-body">
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${EMPLOYEES[i].id} </li>
                            <li class="list-group-item">Email: ${EMPLOYEES[i].email}</li>
                            <li class="list-group-item">Office Number: ${EMPLOYEES[i].officeNumber}</li>
                          </ul>
                        </section>
                    </section>
                  </section>`
                );
          }

    else if (EMPLOYEES[i].constructor.name==='Engineer') {

          $('.justify-content-center').append(
                  `<section class="col-sm-4 mt-5">
                    <section class="card bg-light shadow">
                        <section class="card-header bg-primary text-white">
                            <h4>${EMPLOYEES[i].name}</h4>
                            <h5><i class="fas fa-glasses"> </i>Engineer</h5>
                        </section>
                        <section class="card-body">
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${EMPLOYEES[i].id}</li>
                            <li class="list-group-item">Email: ${EMPLOYEES[i].email}</li>
                            <li class="list-group-item">GitHub: ${EMPLOYEES[i].github}</li>
                          </ul>
                        </section>
                    </section>
                  </section>`
          );
    }
    else {
          $('.justify-content-center').append(
                  `<section class="col-sm-4 mt-5">
                    <section class="card bg-light shadow">
                        <section class="card-header bg-primary text-white">
                            <h4>${EMPLOYEES[i].name}</h4>
                            <h5><i class="fas fa-user-graduate"> </i>Intern</h5>
                        </section>
                        <section class="card-body">
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item">ID: ${EMPLOYEES[i].id}</li>
                            <li class="list-group-item">Email: ${EMPLOYEES[i].email}</li>
                            <li class="list-group-item">School: ${EMPLOYEES[i].school}</li>
                          </ul>
                        </section>
                    </section>
                  </section>`
          );
       }
    }


  //Write the HTML to a file  
  var dataToWrite=$.html();
  fs.writeFileSync('index.html',dataToWrite);
}

//Main

getAnswers1();

