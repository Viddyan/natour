// Convert attendance list into an array
let attendanceList = `2022815775
2022472932
2022410342
2022544781
2022517877
2022004737
2022448095
2022526985
2022004280
2022004675
2022007543
2022433132
2022516167
2022455176
2022516793
2022811446
2022006609
2022554244
2022003343
2022561995
2022836012
2022832236
2022528691
2022582528
2022511567
2022552668
2022509625
2022344459
2022004442
2022807476
2022005582
2022502729
2022478479
2022481225
2022004757
2022481431
2022567867
2022484252
2022607404
2023000910
2022005613
2022363409
2022525962
2022446378`.trim().split("\n"); // Convert multiline string into an array

// Declare listFromPortal array
let listFromPortal = [];

// Get all elements with class "present" and process
Array.prototype.slice
  .call(document.getElementsByClassName("present"))
  .forEach((ele) => {
    // Extract ID and store in listFromPortal array
    let studentId = ele.value.split("::")[0].trim();
    listFromPortal.push(studentId);

    // Check if studentId exists in attendanceList and click
    if (attendanceList.includes(studentId)) {
      ele.click();
    }
  });
