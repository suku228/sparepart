import "./App.css";
import React, { useEffect, useState } from "react";
import { spareParts } from "./constants";
import useSpareparts from "./hooks/useSpareparts";

function App() {
  const spareParts = useSpareparts();
  let filteredRows = [];
  let filteredCols = [];

  // React.useEffect(() => {

  spareParts.map((col) => {
    if (filteredCols.indexOf(col.year) === -1) filteredCols.push(col.year);
  });
  spareParts.map((row) => {
    if (filteredRows.indexOf(row.model) === -1) filteredRows.push(row.model);
  });

  // }, [])

  const [filteredVal, setFilteredVal] = useState("");
  // const [isFirst, setFirst] = useState(true);
  const [index, setIndex] = useState(0);
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [sparepart, setSparepart] = useState("-");
  const [errorMsg, setError] = useState(false);
  console.log(errorMsg)
  const clickHandler = (val) => {
    console.log("clicked");
    setIndex(val);
  };
  const fetchSparepart = () => {
    let tempSparepart = "";
    spareParts.map((spare) => {
      if (spare.year === year && spare.model === model)
        tempSparepart = spare.part;
    });
    setSparepart(tempSparepart);
  };

  const locationHandler = (event) => {
    setLocation(event.target.value);
    console.log(event.target.value)
    if(event.target.value === 'mumbai')
    setError(false)
    else 
    setError(true)
  };
  return (
    <div className="App">
      <header className="App-header">
        {index === 0 && (
          <div>
            Location:
            <input type="text" value={location} onChange={locationHandler} /><br />
            {
              errorMsg?<span className="fontred">Location not valid</span>:null
            }
          </div>
        )}
        {index === 1 && (
          <div>
            <table>
              <thead>
                <tr>
                  <td>Model/Year</td>
                  {filteredCols.map((col, key) => (
                    <td key={key}>{col}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, k) => {
                  return (
                    <tr key={k}>
                      <td>{row}</td>
                      {filteredCols.map((col, k) => {
                        return spareParts.map((spare) => {
                          if (spare.model === row && spare.year === col) {
                            return <td key={k}>{spare.part}</td>;
                          }
                        });
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <div>Model:</div>
              <div>
                <select
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                >
                  <option value="">select </option>
                  {filteredRows.map((row, k) => (
                    <option value={row} key={k}>
                      {row}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div>Year:</div>
              <div>
                <select
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                >
                  <option value="">select </option>
                  {filteredCols.map((row, k) => (
                    <option value={row} key={k}>
                      {row}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={fetchSparepart}>get spareprt</button>
            <h1>{sparepart}</h1>
          </div>
        )}
        {
          index ==2&&sparepart!='-'&&
          <h1> Spare part found</h1>
        }
        {index === 0 && (
          <div>
            <button onClick={() => clickHandler(1)} disabled={location!=='mumbai'}>Next </button>
          </div>
        )}

        {index === 1 && (
          <div>
            <button onClick={() => clickHandler(0)}>Previous </button>
            <button onClick={() => clickHandler(2)}>Next </button>
          </div>
        )}

        {index === 2 && (
          <div>
            <button onClick={() => clickHandler(1)}>Previous</button>
          </div>
        )}
        {/* <button onClick={clickHandler}>{isFirst?'next >>':'<<Previous'}</button> */}
      </header>
    </div>
  );
}

export default App;
