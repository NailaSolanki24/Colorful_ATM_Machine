#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


//Initialize user balance and pin code
let myBalance = 9000;
let myPin = 2424;

// Print welcome message
console.log(chalk.redBright("\n \tWelcome to Naila Solanki - ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: chalk.green("Enter Your Pin Code:")
  }
])
if (pinAnswer.pin === myPin) {
  console.log(chalk.yellow("\nPin is Correct, Login Successfully!\n"));
  // console.log(`Current Account Balance is ${myBalance}`)

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "Select an Operation:",
      choices: ["Withdraw Amount", "Check Balance"],
    },
  ]);

  if (operationAns.operation === "Withdraw Amount") {
    let withdrawAns = await inquirer.prompt([
      {
        name: "withdrawMethod",
        type: "list",
        message: "Select a Withdrawl Method:",
        choices: ["Fast Cash", "Enter Amount"],
      },
    ]);
    if (withdrawAns.withdrawMethod === "Fast Cash") {
      let fastCashAns = await inquirer.prompt([
        {
          name: "fastCash",
          type: "list",
          message: "Select Amount:",
          choices: [500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000],
        },
      ]);
      if (fastCashAns.fastCash > myBalance) {
        console.log(chalk.blue("Insufficient Balance"));
      } else {
        myBalance -= fastCashAns.fastCash;
        console.log(`${fastCashAns.fastCash} withdraw Successfully`);
        console.log(`Your Remaining Balance is: ${myBalance}`);
      }
    }
    if (withdrawAns.withdrawMethod === "Enter Amount") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          type: "number",
          message: "Enter the Amount to Withdraw:",
        },
      ]);
      if (amountAns.amount > myBalance) {
        console.log(chalk.blue("Insufficient Balance"));
      } else {
        myBalance -= amountAns.amount;
        console.log(`${amountAns.amount} Withdraw Successfully`);
        console.log(`Your Remaining Balance is: ${myBalance}`);
      }
    }
  } else if (operationAns.operation === "Check Balance") {
    console.log(`Your Account Balance is: ${myBalance}`);
  }
} else {
  console.log(chalk.red("Pin is Incorrect , Try Again!"));
}
