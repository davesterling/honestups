const showBtn = document.querySelectorAll(".showBtn");
const leaderboardContainers = document.querySelectorAll(".leaderboard-items");

const originalLength = 6; // Change this to the original length of the leaderboard

// Dummy array of data
const dataArray = [
  { name: "John", record: 100 },
  { name: "Jane", record: 200 },
  { name: "Bob", record: 150 },
  { name: "Alice", record: 300 },
  { name: "Michael", record: 250 },
  { name: "Emily", record: 180 },
  { name: "David", record: 220 },
  { name: "Sarah", record: 400 },
  { name: "Daniel", record: 280 },
  { name: "Laura", record: 350 },
  { name: "Chris", record: 170 },
  { name: "Olivia", record: 320 },
  { name: "Matthew", record: 270 },
  { name: "Emma", record: 190 },
  { name: "Ryan", record: 230 },
  { name: "Sophia", record: 420 },
  { name: "Joshua", record: 310 },
  { name: "Ava", record: 260 },
  { name: "Justin", record: 380 },
  { name: "Ethan", record: 290 },
  { name: "Hannah", record: 390 },
  { name: "Nathan", record: 340 },
  { name: "Mia", record: 210 },
  { name: "Andrew", record: 320 },
  { name: "Madison", record: 360 }
];

// Function to generate HTML rows for a chunk of data
function generateRows(dataChunk, chunkIndex) {
  let rowsHTML = '';
  dataChunk.forEach((data, i) => {
    let overallIndex = chunkIndex * 5 + i + 1;

    const row = `
      <div class="row">
        <div class="trophy-container">
          <i class="bx bxs-trophy trophy-icon"></i>
          <div class="trophy-text">#${overallIndex}</div>
        </div>
        <span>${data.name}</span>
        <span>${data.record}</span>
      </div>
    `;
    rowsHTML += row;
  });
  return rowsHTML;
}

// Function to display leaderboard for a specific chunk
function displayLeaderboard(chunkIndex, dataArray, containers) {
  containers.forEach(container => {
    // Clear existing content
    container.innerHTML = '';

    // Determine the chunk boundaries
    const start = chunkIndex * 5;
    const end = Math.min(start + 5, dataArray.length);

    // Generate HTML for the current chunk
    const dataChunk = dataArray.slice(start, end);
    const rows = generateRows(dataChunk, chunkIndex, dataArray.length);

    // Append generated rows to the container
    container.innerHTML = rows;
  });
}

let currentChunkIndex = 0;

//Sorting array by records
dataArray.sort((a, b) => b.record - a.record);

displayLeaderboard(currentChunkIndex, dataArray, leaderboardContainers);

showBtn.forEach((b) => {
  b.addEventListener('click', () => {
    currentChunkIndex++;
    if (currentChunkIndex * 5 >= dataArray.length) {
      currentChunkIndex = 0; // Reset to first chunk
    }
    displayLeaderboard(currentChunkIndex, dataArray, leaderboardContainers);
  });
})