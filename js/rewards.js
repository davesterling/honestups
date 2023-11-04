let rewards = [];

const addRewards = (reward) => {
  rewards.push(reward);
  localStorage.setItem("rewardItems", JSON.stringify(rewards));

  showRewards();
  updateCartIcon();
};

function deleteRewardById(id) {
  rewards = rewards.filter((reward) => reward.id !== id);
}

const showRewards = () => {
  let rewardContent = document.querySelector(".reward-content");
  rewardContent.innerHTML = "";
  rewards.forEach((reward) => {
    var card = document.createElement("div");
    card.className = "reward-card";

    card.innerHTML = `
    <div class="reward-code">${reward.code}</div>
  `;
    rewardContent.appendChild(card);
  });
};

function updateCartIcon() {
  var cartBoxes = document.getElementsByClassName("cart-box");
  var rewardCards = document.getElementsByClassName("reward-card");
  var quantity = 0;

  quantity += cartBoxes.length;
  quantity += rewardCards.length;

  var cartIcon = document.querySelector("#cart-icon");
  cartIcon.setAttribute("data-quantity", quantity);

  numberWithCommas(cartIcon);
}

function numberWithCommas(element) {
  var quantity = element.getAttribute("data-quantity");
  var formattedQuantity = quantity
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  element.setAttribute("data-quantity", formattedQuantity);
}

function loadRewardItems() {
  rewards = JSON.parse(localStorage.getItem("rewardItems"));
  showRewards();
  updateCartIcon();
}

showRewards();
loadRewardItems();
