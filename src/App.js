import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import Table from "./Table";

function App() {
  // START TO GET THE DATA FROM LOCAL STORAGE

  // END TO GET THE DATA FROM LOCAL STORAGE
  const [trainingData, setTrainingData] = useState([]);
  // console.log(trainingData);

  //   () => {
  //   // getting stored value
  //   const saved = localStorage.getItem("trainData");
  //   const initialValue = JSON.parse(saved);
  //   return initialValue || "";
  // };

  // const getLocalItems = () => {
  //   const list = localStorage.getItem("trainData");
  //   if (list) {
  //     return JSON.parse(localStorage.getItem("list"));
  //   } else {
  //     return [];
  //   }
  // };
  // START INPUTS VALUES GET IN USER
  const [trainingDataEditingId, setTrainingDataEditingId] = useState("");
  // console.log(trainingDataEditingId);
  const [inputs, setInputs] = useState({
    trainingName: "",
    taggedParticipants: "",
    startDate: "",
    endDate: "",
    difference: "",
    totalCost: "",
    costForHead: "",
    status: "",
    trainee: "",
  });

  // END INPUTS VALUES GET IN USER

  let difference = "";
  let status = "";
  let costForHead = "";

  const trainingFeed = useRef();
  const tagParticipants = useRef();
  const durationHide = useRef();
  const costForHeadHide = useRef();
  const statusHide = useRef();

  // START TRANING NAME  STATE
  const [trainingNameVal, setTrainingNameVal] = useState("");
  const [trainingNameFeed, setTrainingNameFeed] = useState("");
  // END TRAINING NAME STATE

  // START TAGGED PARTICIPANTS STATE
  const [taggedParValue, setTaggedParValue] = useState("");
  const [taggedParFeed, setTaggedParFeed] = useState("");
  // END TAGGED PARTICIPANTS STATE

  // START DATE STATE
  const [startDate, setStartDate] = useState("");

  // END START DATE STATE

  // END DATE STATE
  const [endDate, setEndDate] = useState("");
  const [endDisable, setEndDisable] = useState(true);

  // END DATE STATE

  // START TOTAL COST

  const [totalCostValue, setTotalCostValue] = useState("");

  // END TOTAL COST

  const startMinDate = new Date();
  const startMinYear = startMinDate.getFullYear();

  const startMinMonth = startMinDate.getMonth() + 1;
  const startMinDat = startMinDate.getDate();

  const strminSelectMont = startMinDate.getMonth();

  const minYear = startMinYear;
  let minMonth = "";
  let minDate = "";
  let strminMonth = "";

  //  START MIN DYNAMIC START MONTH
  if (startMinMonth <= 9) {
    minMonth = "0" + startMinMonth;
  } else {
    minMonth = startMinMonth;
  }
  if (strminSelectMont <= 9) {
    strminMonth = "0" + strminSelectMont;
  } else {
    strminMonth = strminSelectMont;
  }
  // END MIN DYNAMIC END MONTH

  // START MIN DYNAMIC START DATE
  if (startMinDat <= 9) {
    minDate = "0" + startMinDat;
  } else {
    minDate = startMinDat;
  }
  // END MIN DYNAMIC END DATE
  let minStartDate = minYear + "-" + minMonth + "-" + minDate;

  let minOneMonthBefore = minYear + "-" + strminMonth + "-" + minDate;

  // DYNAMIC MINUMUM STARTING DATE FINISHED

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value.trim();
    setInputs((preValues) => ({ ...preValues, [inputName]: inputValue }));
    console.log(inputValue);

    // STRAT VALIDATE TRAINING NAME
    if (inputName === "trainingName") {
      let alphabets = /^[a-zA-Z ]*$/;
      if (inputValue.length < 3) {
        setTrainingNameVal(inputValue);
        setTrainingNameFeed("* minimum three letters required *");
        trainingFeed.current.style.color = "red";
      } else if (
        inputValue !== "" &&
        inputValue.match(alphabets) &&
        3 <= inputValue.length &&
        inputValue.length <= 25
      ) {
        setTrainingNameVal(inputValue);
        setTrainingNameFeed(" * Looks Good *");
        trainingFeed.current.style.color = "green";
      } else {
        setTrainingNameFeed("* Should be alphabets only *");
        trainingFeed.current.style.color = "red";
      }
    }
    // END VALIDATE TRAINING NAME
    // START TAGGED PARTICIPANTS VALIDATION
    if (inputName === "taggedParticipants") {
      // setCostForHead(inputValue*100/inputValue);
      let pattern = /^[0-9]*$/;
      if (inputValue === "e") {
        setTaggedParFeed("* Should be number!.. *");
        tagParticipants.current.style.color = "red";
      } else if (inputValue.match(pattern) && inputValue !== "") {
        setTaggedParValue(inputValue);
        setTaggedParFeed("* Looks Good. *");
        tagParticipants.current.style.color = "green";
      } else {
        setTaggedParFeed("* Should be number!..*");
        tagParticipants.current.style.color = "red";
      }
    }

    // END TAGGED PARTICIPANTS VALIDATION

    // START START DATE VALIDATION
    if (inputName === "startDate") {
      setStartDate(inputValue);
      setEndDisable(false);
      if (inputValue === "") {
        console.log("empty");
      }
    }
    // END START DATE VALIDATION

    //END DATE VALIDATION
    if (inputName === "endDate") {
      setEndDate(inputValue);
      durationHide.current.style.color = "rgb(82, 81, 81)";
      statusHide.current.style.color = "rgb(82, 81, 81)";
    }
    //END END DATE VALIDATION

    // START TOTAL COST VALIDATION

    if (inputName === "totalCost") {
      // console.log(inputValue);
      setTotalCostValue(inputValue);
      costForHeadHide.current.style.color = "rgb(82, 81, 81)";
    }

    // END TOTAL COST VALIDATION
  };

  // AFTER END DATE GIVEN VALIDATION

  if (taggedParValue !== "" && totalCostValue !== "") {
    costForHead = parseFloat(totalCostValue / taggedParValue).toFixed(2);
  }
  // DURATION PARTS

  // DURATION DATE CALCULATED(DIFFERENCE BETWEEN TWO DAYS)
  if (endDate) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const a = new Date(startDate);
    const b = new Date(endDate);

    const utc1 = new Date(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = new Date(b.getFullYear(), b.getMonth(), b.getDate());

    difference = Math.floor((utc2 - utc1) / _MS_PER_DAY + 1);
    // END DURATION DATE CALCULATED (DIFFERENCE BETWEEN TWO DAYS)

    // START  STATUS UPDATED

    if (minStartDate < startDate) {
      status = "Future Planned";
    } else if (startDate <= minStartDate && minStartDate <= endDate) {
      status = "Inprogress";
    } else if (endDate < minStartDate) {
      status = "Completed";
    }

    // END START STATUS UPDATED
  }
  // END DURATION PARTS

  //START HANDLE FORM SUBMIT
  inputs.difference = difference;
  inputs.status = status;
  inputs.costForHead = costForHead;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let formclass = document.querySelector(".form");
    formclass.reset();
    // HTMLFormElement.reset();

    document.getElementById("save").disabled = true;
    document.getElementById("new").disabled = true;
    document.getElementById("delete").disabled = true;
    document.getElementById("edit").disabled = true;

    durationHide.current.style.color = "transparent";
    costForHeadHide.current.style.color = "transparent";
    statusHide.current.style.color = "transparent";
    difference = "";
    // DEFAULT FEED SET
    setTrainingNameVal("");
    setTrainingNameFeed("");
    setTaggedParFeed("");
    setEndDisable(true);

    // START NEW TRAINEE DATA
    const newTrainingData = {
      id: nanoid(),
      trainingName: inputs.trainingName,
      taggedParticipants: inputs.taggedParticipants,
      startDate: inputs.startDate,
      endDate: inputs.endDate,
      difference: inputs.difference,
      totalCost: inputs.totalCost,
      costForHead: inputs.costForHead,
      status: inputs.status,
      trainee: inputs.trainee,
    };

    const newTrainingDatas = [...trainingData, newTrainingData];
    setTrainingData(newTrainingDatas);
    // END NEW TRAINEE DATA

    // END DEFAULT SET
    console.log(inputs);
    setInputs({
      trainingName: "",
      taggedParticipants: "",
      startDate: "",
      endDate: "",
      difference: "",
      totalCost: "",
      costForHead: "",
      status: "",
      trainee: inputs.trainee,
    });
    // localStorage.setItem("name", "david");
    // localStorage.setItem("traineeData", JSON.stringify(inputs));
    // localStorage.setItem("trainData", JSON.stringify(inputs));
  };
  // console.log(trainingData);
  // END HANDLE FORM SUMBIT

  // LOCAL STORAGE SETITEM IN USEEFFECT

  useEffect(() => {
    localStorage.setItem("trainData", JSON.stringify(trainingData));
  }, [trainingData]);

  // END LOCALSTROAGE SETITEM IN USEEFFECT

  const [columnDefs] = useState([
    { field: "trainingName" },
    { field: "trainee" },
    { field: "totalCost" },
    { field: "costForHead" },
    { field: "taggedParticipants" },
    { field: "status" },
    { field: "startDate" },
    { field: "endDate" },
    { field: "difference" },
  ]);

  const defaultColDef = {
    // sortable: true, editable: true, filter: true, floatingFilter: true, editablerow: true //
    flex: 1,
  };
  const pop = (row) => {
    setInputs(row.data);
    setTrainingDataEditingId(row.data.id);
    // WHEN CLICK EDIT BUTTON SUBMIT IS DISABLED
    document.getElementById("submit").disabled = true;
    document.getElementById("submit").style.backgroundColor = "#4285f4";
    document.getElementById("submit").style.color = "white";
    document.getElementById("submit").style.opacity = "0.5";

    // THIS IS DELETE BUTTTON JAVASCRIPT CSS
    document.getElementById("delete").disabled = false;
    document.getElementById("delete").style.backgroundColor = "red";
    document.getElementById("delete").style.color = "white";
    document.getElementById("delete").style.opacity = "1";

    // THIS IS END DELETE BUTTON JAVASCRIPT CSS

    // THIS IS START EDIT BUTTN JAVASCIPT CSS
    document.getElementById("edit").disabled = false;
    document.getElementById("edit").style.color = "black";
    document.getElementById("edit").style.backgroundColor = "yellow";
    document.getElementById("edit").style.opacity = "1";
    document.getElementById("delete").style.backgroundColor = "red";
    document.getElementById("delete").style.color = "white";
    document.getElementById("delete").style.opacity = "1";
    // THIS IS END EDIT BUTTON JAVASCRIPT CSS

    //THIS IS CANCEL BUTTON JAVASCRIPT CSS
    document.getElementById("new").disabled = false;
    document.getElementById("new").style.backgroundColor = "gray";
    document.getElementById("new").style.color = "white";
    document.getElementById("new").style.opacity = "1";

    document.getElementById("save").disabled = "true";
    document.getElementById("save").style.backgroundColor = "green";
    document.getElementById("save").style.color = "white";
    document.getElementById("save").style.opacity = "0.5";

    // THIS IS END CANCEL BUTTON JAVASCRIPT CSS
    // END WHEN CLICK EDIT BUTTON SUBMIT IS DISABLED
    document.getElementById("trainName").disabled = true;
    document.getElementById("taggedParticipants").disabled = true;
    document.getElementById("startDate").disabled = true;
    document.getElementById("totalCost").disabled = true;
    document.getElementById("duration").disabled = true;
    document.getElementById("costForHead").disabled = true;
    document.getElementById("status").disabled = true;
    document.getElementById("external").disabled = true;
    document.getElementById("internal").disabled = true;

    durationHide.current.style.color = "rgb(82, 81, 81)";
    statusHide.current.style.color = "rgb(82, 81, 81)";
    costForHeadHide.current.style.color = "rgb(82, 81, 81)";
    // setTrainingData([row.data]);
    // console.log(row.data.id);
  };
  const editbtn = () => {
    document.getElementById("edit").disabled = true;
    document.getElementById("edit").style.backgroundColor = "yellow";
    document.getElementById("edit").style.color = "black";
    document.getElementById("edit").style.opacity = "0.5";

    document.getElementById("delete").disabled = true;
    document.getElementById("delete").style.color = "white";
    document.getElementById("delete").style.backgroundColor = "red";
    document.getElementById("delete").style.opacity = "0.5";
    document.getElementById("new").disabled = false;
    document.getElementById("new").style.color = "white";
    document.getElementById("new").style.backgroundColor = "gray";
    document.getElementById("new").style.opacity = "1";
    document.getElementById("save").disabled = false;
    document.getElementById("save").style.color = "white";
    document.getElementById("save").style.backgroundColor = "green";
    document.getElementById("save").style.opacity = "1";
    document.getElementById("trainName").disabled = false;
    document.getElementById("taggedParticipants").disabled = false;
    document.getElementById("startDate").disabled = false;
    document.getElementById("totalCost").disabled = false;
    document.getElementById("duration").disabled = false;
    document.getElementById("costForHead").disabled = false;
    document.getElementById("status").disabled = false;
    document.getElementById("external").disabled = false;
    document.getElementById("internal").disabled = false;

    if (inputs.trainee === "External") {
      document.getElementById("external").checked = true;
    } else if (inputs.trainee === "Internal") {
      document.getElementById("internal").checked = true;
    }
  };

  // START EDTIT FORM SUBMIT
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    let formclass = document.querySelector(".form");
    formclass.reset();
    setTrainingNameFeed("");
    setTaggedParFeed("");
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").style.backgroundColor = "#4285f4";
    document.getElementById("submit").style.color = "white";
    document.getElementById("submit").style.opacity = "1";
    document.getElementById("edit").disabled = true;
    document.getElementById("edit").style.color = "black";

    document.getElementById("edit").style.backgroundColor = "yellow";
    document.getElementById("edit").style.opacity = "0.5";
    document.getElementById("save").disabled = true;
    document.getElementById("save").style.color = "white";
    document.getElementById("save").style.backgroundColor = "green";
    document.getElementById("save").style.opacity = "0.5";
    document.getElementById("new").disabled = true;
    document.getElementById("new").style.color = "black";
    document.getElementById("new").style.backgroundColor = "gray";
    document.getElementById("new").style.opacity = "0.5";

    // HANDLE EDIT FORM SUBMIT

    const editedTrainingData = {
      id: trainingDataEditingId,
      trainingName: inputs.trainingName,
      taggedParticipants: inputs.taggedParticipants,
      startDate: inputs.startDate,
      endDate: inputs.endDate,
      difference: inputs.difference,
      totalCost: inputs.totalCost,
      costForHead: inputs.costForHead,
      status: inputs.status,
      trainee: inputs.trainee,
    };

    const newTrainData = [...trainingData];

    const index = trainingData.findIndex(
      (trainingdata) => trainingdata.id === trainingDataEditingId
    );

    newTrainData[index] = editedTrainingData;

    setTrainingData(newTrainData);
    setTrainingDataEditingId("");

    setInputs({
      trainingName: "",
      taggedParticipants: "",
      startDate: "",
      endDate: "",
      difference: "",
      totalCost: "",
      costForHead: "",
      status: "",
      trainee: inputs.trainee,
    });
    durationHide.current.style.color = "transparent";
    costForHeadHide.current.style.color = "transparent";
    statusHide.current.style.color = "transparent";
    difference = "";
  };

  // END EDIT FORM SUBMIT

  // START DELETE PARTICULAR TRAINEE DATA

  const handleDeleteClick = (trainDataId) => {
    const newTrainData = [...trainingData];

    const index = trainingData.findIndex(
      (trainingdata) => trainingdata.id === trainDataId
    );

    newTrainData.splice(index, 1);

    setTrainingData(newTrainData);

    document.getElementById("submit").disabled = false;
    document.getElementById("submit").style.backgroundColor = "#4285f4";
    document.getElementById("submit").style.color = "white";
    document.getElementById("submit").style.opacity = "1";
    document.getElementById("delete").disabled = true;
    document.getElementById("delete").style.color = "white";
    document.getElementById("delete").style.opacity = "0.5";
    document.getElementById("delete").style.backgroundColor = "red";
    document.getElementById("edit").disabled = true;
    document.getElementById("edit").style.color = "black";
    document.getElementById("edit").style.backgroundColor = "yellow";
    document.getElementById("edit").style.opacity = "0.5";
    document.getElementById("new").disabled = true;
    document.getElementById("new").style.color = "white";
    document.getElementById("new").style.backgroundColor = "gray";
    document.getElementById("new").style.opacity = "0.5";
    document.getElementById("save").style.color = "white";
    document.getElementById("save").style.backgroundColor = "green";
    document.getElementById("save").style.opacity = "0.5";

    setInputs({
      trainingName: "",
      taggedParticipants: "",
      startDate: "",
      endDate: "",
      difference: "",
      totalCost: "",
      costForHead: "",
      status: "",
      trainee: inputs.trainee,
    });
    durationHide.current.style.color = "transparent";
    costForHeadHide.current.style.color = "transparent";
    statusHide.current.style.color = "transparent";
    difference = "";
    setTrainingDataEditingId("");

    document.getElementById("trainName").disabled = false;
    document.getElementById("taggedParticipants").disabled = false;

    document.getElementById("startDate").disabled = false;
    document.getElementById("totalCost").disabled = false;
    document.getElementById("duration").disabled = false;
    document.getElementById("costForHead").disabled = false;
    document.getElementById("status").disabled = false;
    document.getElementById("external").disabled = false;
    document.getElementById("internal").disabled = false;
    document.getElementById("submit").disabled = false;
  };

  //END DELETE PARTICULAR TRAINEE DATA

  const newForm = () => {
    let formclass = document.querySelector(".form");
    formclass.reset();
    setTrainingDataEditingId("");
    setTrainingNameFeed("");
    setTaggedParFeed("");
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").style.backgroundColor = "#4285f4";
    document.getElementById("submit").style.color = "white";
    document.getElementById("submit").style.opacity = "1";

    document.getElementById("delete").disabled = true;
    document.getElementById("delete").style.color = "white";
    document.getElementById("delete").style.backgroundColor = "red";
    document.getElementById("delete").style.opacity = "0.5";
    document.getElementById("edit").disabled = true;
    document.getElementById("edit").style.color = "black";
    document.getElementById("edit").style.backgroundColor = "yellow";
    document.getElementById("edit").style.opacity = "0.5";
    document.getElementById("new").disabled = true;
    document.getElementById("new").style.color = "white";
    document.getElementById("new").style.backgroundColor = "gray";
    document.getElementById("new").style.opacity = "0.5";
    document.getElementById("save").disabled = true;
    document.getElementById("save").style.color = "white";
    document.getElementById("save").style.backgroundColor = "green";
    document.getElementById("save").style.opacity = "0.5";

    setInputs({
      trainingName: "",
      taggedParticipants: "",
      startDate: "",
      endDate: "",
      difference: "",
      totalCost: "",
      costForHead: "",
      status: "",
      trainee: "",
    });
    if (inputs.trainee) {
      document.getElementById("internal").checked = false;
      document.getElementById("submit").checked = false;
    }

    durationHide.current.style.color = "transparent";
    costForHeadHide.current.style.color = "transparent";
    statusHide.current.style.color = "transparent";
    difference = "";
    document.getElementById("trainName").disabled = false;
    document.getElementById("taggedParticipants").disabled = false;

    document.getElementById("startDate").disabled = false;
    document.getElementById("totalCost").disabled = false;
    document.getElementById("duration").disabled = false;
    document.getElementById("costForHead").disabled = false;
    document.getElementById("status").disabled = false;
    document.getElementById("external").disabled = false;
    document.getElementById("internal").disabled = false;
    document.getElementById("submit").disabled = false;
  };
  useEffect(() => {
    document.getElementById("edit").disabled = true;
    document.getElementById("new").disabled = true;
    document.getElementById("delete").disabled = true;
    document.getElementById("delete").style.backgroundColor = "red";
    document.getElementById("delete").style.color = "white";
    document.getElementById("delete").style.opacity = "0.5";

    document.getElementById("edit").style.backgroundColor = "yellow";
    document.getElementById("edit").style.color = "black";
    document.getElementById("edit").style.opacity = "0.5";

    document.getElementById("new").style.backgroundColor = "gray";
    document.getElementById("new").style.color = "white";
    document.getElementById("new").style.opacity = "0.5";
    document.getElementById("save").disabled = true;
    document.getElementById("save").style.backgroundColor = "green";
    document.getElementById("save").style.color = "white";
    document.getElementById("save").style.opacity = "0.5";
  }, []);

  return (
    <div className="App">
      {/* <button type="button" onClick={() => arr()}>Click button</button> */}
      <div className="trainee">
        <div className="trainee-table">
          <div className="trainee-table--body">
            <div className="trainee-table-form">
              <form className="form" onSubmit={handleFormSubmit}>
                {/* START EDIT FORM SUBMIT */}
                <div className="buttons">
                  <div className="save-btn">
                    <button
                      className="save-btn"
                      onClick={handleEditFormSubmit}
                      id="save"
                    >
                      Save
                    </button>
                  </div>
                  <div className="cancel-btn">
                    <button className="new-btn" id="new" onClick={newForm}>
                      Cancel
                    </button>
                  </div>
                  <div className="delete-btn">
                    <button
                      className="delete-btn"
                      type="button"
                      onClick={() => {
                        handleDeleteClick(trainingDataEditingId);
                      }}
                      id="delete"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="edit-btn">
                    <button
                      className="edit-btn"
                      id="edit"
                      type="button"
                      onClick={editbtn}
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* END EDIT FORM SUBMIT */}
                <div className="training-table--body">
                  {/* START TRAINING NAME */}
                  <div className="training-name">
                    <label>
                      Training Name &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; :
                    </label>
                    <input
                      type="text"
                      name="trainingName"
                      id="trainName"
                      onChange={handleChange}
                      value={inputs.trainingName}
                      required
                    ></input>
                    <br />
                    <span className="training-feed" ref={trainingFeed}>
                      <i style={{ visibility: "hidden" }}>*</i>
                      {trainingNameFeed}
                    </span>
                  </div>
                  {/* EDN TRAINING NAME */}
                  {/* START PARTICIPANTS */}
                  <div className="tagged-participants">
                    <label>Tagged participants &nbsp;:</label>
                    <input
                      type="number"
                      name="taggedParticipants"
                      id="taggedParticipants"
                      onChange={handleChange}
                      value={inputs.taggedParticipants}
                      required
                    ></input>
                    <br />
                    <span className="tagParticipants" ref={tagParticipants}>
                      <i style={{ visibility: "hidden" }}>*</i>
                      {taggedParFeed}
                    </span>
                  </div>
                  {/* END PARTICPANTS */}
                  {/* START END DATE */}
                  <div className="start-end-date">
                    <div className="start-date">
                      <label>
                        Start Date&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;:
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        onChange={handleChange}
                        min={minOneMonthBefore}
                        value={inputs.startDate}
                        required
                      ></input>
                    </div>
                    <div className="end-date">
                      <label>End Date &nbsp; :</label>
                      <input
                        type="date"
                        name="endDate"
                        min={startDate}
                        onChange={handleChange}
                        disabled={endDisable}
                        value={inputs.endDate}
                        required
                      ></input>
                    </div>
                  </div>
                  {/* START-END DATE */}
                  {/* START COST AND DURATION */}
                  <div className="cost-and-duration">
                    <div className="cost">
                      <label>
                        Total Cost &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; :
                      </label>
                      <input
                        type="number"
                        onChange={handleChange}
                        name="totalCost"
                        id="totalCost"
                        value={inputs.totalCost}
                        required
                      ></input>
                    </div>
                    <div className="duration">
                      <label>Duration&nbsp; &nbsp; :</label>
                      <input
                        type="number"
                        id="duration"
                        ref={durationHide}
                        value={inputs.difference}
                        readOnly
                      ></input>
                    </div>
                  </div>
                  {/* END COST AND DURATION */}
                  {/* COST FOR HEAD */}
                  <div className="cost-for-heed">
                    <label>
                      Cost for head &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp; :
                    </label>
                    <input
                      type="text"
                      id="costForHead"
                      className="costForHead"
                      value={inputs.costForHead}
                      ref={costForHeadHide}
                      readOnly
                    ></input>
                  </div>
                  {/* END COST FOR HEAD */}

                  {/* START STATUS */}
                  <div className="status">
                    <label>
                      Status &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; :
                    </label>
                    <input
                      type="text"
                      id="status"
                      value={inputs.status}
                      ref={statusHide}
                      readOnly
                    ></input>
                  </div>
                  {/* END STATUS */}

                  {/* START EXTERNAL OR INTERNAL TRAINEE */}
                  <div className="trainee-radio">
                    <label className="trainee-label">
                      Trainee<span className="status-semiColon">:</span>
                    </label>
                    <input
                      type="radio"
                      name="trainee"
                      id="external"
                      value="External"
                      className="external-radio"
                      required
                      onChange={handleChange}
                    ></input>
                    <label htmlFor="external" className="external">
                      External
                    </label>
                    <br></br>
                    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;
                    <input
                      type="radio"
                      name="trainee"
                      id="internal"
                      value="Internal"
                      className="internal-radio"
                      onChange={handleChange}
                      required
                    ></input>
                    <label className="internal-label" htmlFor="internal">
                      Internal
                    </label>
                  </div>
                </div>

                {/* END EXTERNAL OR INTERNAL TRAINEE */}
                <button className="submit" id="submit">
                  <i>Submit</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <button className="btntest">testin</button> */}

      {/* START TRAINEE TATA TABLE */}

      <div className="ag-theme-alpine" style={{ height: "300px" }}>
        <AgGridReact
          rowData={trainingData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowDoubleClicked={pop}
        ></AgGridReact>
      </div>

      {/* END TRAINEE TATA TABLE */}
    </div>
  );
}

export default App;
