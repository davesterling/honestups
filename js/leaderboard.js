const showBtn = document.querySelector(".showBtn");
const leaderboardContainer = document.querySelector(".leaderboard-items");

let isExpanded = false;
const originalLength = 6; // Change this to the original length of the leaderboard

// Dummy array of data
const dataArray = [
  { name: "John", record: 100 },
  { name: "Jane", record: 200 },
  { name: "Bob", record: 150 },
];

showBtn.addEventListener("click", () => {
  if (isExpanded) {
    while (leaderboardContainer.children.length > originalLength) {
      leaderboardContainer.removeChild(leaderboardContainer.lastChild);
    }
  } else {
    for (
      let i = originalLength + 1;
      i <= dataArray.length + originalLength;
      i++
    ) {
      const data = dataArray[i - originalLength - 1];
      const row = `
        <div class="row">
          <div class="trophy-container">
            <i class="bx bxs-trophy trophy-icon"></i>
            <div class="trophy-text">#${i + 3}</div>
          </div>
          <span>${data.name}</span>
          <span>${data.record}</span>
        </div>
      `;
      leaderboardContainer.insertAdjacentHTML("beforeend", row);
    }
  }
  isExpanded = !isExpanded;
});
