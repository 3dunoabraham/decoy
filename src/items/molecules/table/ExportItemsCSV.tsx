import { useMemo } from "react";
import { CSVLink } from "react-csv";

export default function Component ({ itemsArray, columnLookup, filename })  {
  const csvData = useMemo(() => {
    let theCSV = [];

    // Create header row using column names from columnLookup object
    const headerRow = Object.keys(columnLookup).map(key => columnLookup[key]);
    theCSV.push(headerRow);

    // Create data rows using column names from columnLookup object
    itemsArray.forEach((item) => {
      const row = Object.keys(columnLookup).map((key) => item[key]);
      theCSV.push(row);
    });

    return theCSV;
  }, [itemsArray, columnLookup]);

  return (
    <div className="ims-tx-link flex-center pr-3 opaci-hov-50 mr-100">
      <CSVLink data={csvData} filename={filename}>
        Export CSV
      </CSVLink>
    </div>
  );
};