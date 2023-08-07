import { ChangeEvent, FormEvent, useState } from "react";
import DropDown from "./components/DropDown";
import "./App.css";


function App() {
  const serviceQuality = [
    "poor",
    "below average",
    "average",
    "above average",
    "excellent",
  ];

  const [formInputs, setFormInputs] = useState({
    quality: "poor",
    numOfPeople: 1,
    totalBill: 0,
    tipPercentage: 0,
    tipPerPerson: 0
  })

  const [active, setActive] = useState(false)

  const handleQuality = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs(existingValues => ({
      ...existingValues,
      quality: e.target.value,
    }))
  };

  const handleNumOfPeople = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs(existingValues => ({
      ...existingValues,
      numOfPeople: parseInt(e.target.value),
    }))
  };

  const handleTotal = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs(existingValues => ({
      ...existingValues,
      totalBill: parseInt(e.target.value),
    }))
  };

  function getPercentage(quality: string): number {
    if(quality == "poor"){
      return .15;
    }
    else if(quality == "below average"){
      return .17
    }
    else if(quality == "above average"){
      return .22
    }
    else if(quality == "excellent"){
      return .25
    }
    
    return .2
  }




  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tip = getPercentage(formInputs.quality)
    setFormInputs(prevElements => ({
      ...prevElements,
      tipPercentage: tip
    }))

    
    setTimeout(() => {
      setActive(true)
    }, 500)

  }

  return (
    <>

    <div className="top-container">
      <h1 className="title">Tip Calculator</h1>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label>Service Quality: </label>
          <DropDown items={serviceQuality} handleItems={handleQuality} />
          <label>Number Of People: </label>
          <input
            type="number"
            min="1"
            className="input"
            value={formInputs.numOfPeople}
            onChange={handleNumOfPeople}
            required
          />
          <label>Total Bill: </label>
          <input
            type="number"
            min="0"
            className="input"
            value={formInputs.totalBill}
            onChange={handleTotal}
            required
          />
          <input type="submit" className="button" />
        </form>
      </div>

      {active && (
        <div className="form">
          <h3 className="title">Total Tip: </h3>
          <p>{`The total tip for the meal is $${((formInputs.totalBill * formInputs.tipPercentage).toFixed(2))}. That would mean for a total of ${formInputs.numOfPeople} people would each give $${(((formInputs.totalBill * formInputs.tipPercentage) / formInputs.numOfPeople).toFixed(2))}.`}</p>
        </div>
        
      )}
      </div>
    </>
  );
}

export default App;
