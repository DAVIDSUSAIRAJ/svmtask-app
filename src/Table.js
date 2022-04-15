import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = ({ trainingData }) => {
  const trainingCollectinData = trainingData;
  const [data ,setData] = useState(trainingCollectinData);
  // console.log(trainingCollectinData);
  // const rowData = useState(trainingCollectinData);
  // console.log(rowData);

  const [columnDefs] = useState([
    { field: "trainingName" },
    { field: "trainee" },
    { field: "totalCost" },

    { field: "taggedParticipants" },
    { field: "status" },
    { field: "startDate" },
    { field: "endDate" },
    { field: "difference" },
  ]);
  const Pop = (row) => {
    console.log("duble Clicked");
    setData(row.data)
    localStorage.setItem("name","david");
  };

  // const defaultColDef = {
  // sortable: true, editable: true, filter: true, floatingFilter: true, editablerow: true // 
  // }

  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        rowData={trainingCollectinData}
        columnDefs={columnDefs}
        // defaultColDef={defaultColDef}
        onRowDoubleClicked={Pop}
      ></AgGridReact>
    </div>
  );
};
export default Table;
