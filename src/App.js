import React, { useState } from "react";
import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  //This way, the yearlyData is a derived state based on the userInput state (Lesson 117. starting at 6:00)
  const yearlyData = [];

  if (userInput) {
    let currentSavings = userInput["current-savings"];
    const yearlyContribution = userInput["yearly-contribution"];
    const expectedReturn = userInput["expected-return"] / 100;
    const duration = userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  // Another way to do it (see Lesson 117. starting at 6:00)
  // const [results, setResults] = useState(null);

  // const calculateHandler = (userInput) => {
  //   const yearlyData = [];

  //   let currentSavings = userInput['current-savings'];
  //   const yearlyContribution = userInput['yearly-contribution'];
  //   const expectedReturn = userInput['expected-return'] / 100;
  //   const duration = userInput['duration'];

  //   // The below code calculates yearly results (total savings, interest etc)
  //   for (let i = 0; i < duration; i++) {
  //     const yearlyInterest = currentSavings * expectedReturn;
  //     currentSavings += yearlyInterest + yearlyContribution;
  //     yearlyData.push({
  //       year: i + 1,
  //       yearlyInterest: yearlyInterest,
  //       savingsEndOfYear: currentSavings,
  //       yearlyContribution: yearlyContribution,
  //     });
  //   }
  //   setResults(yearlyData);
  // };

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler} />

      {/* Fallback text is dynamically output if there is no user input:  */}
      {!userInput && <p style={{textAlign: 'center'}}>No investment calculated yet.</p>}

      {/* Output results if we have user input (not null) */}
      {userInput && <ResultsTable data={yearlyData} initialInvestment={userInput['current-savings']} />}
    </div>
  );
}

export default App;
