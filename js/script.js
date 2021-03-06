const cardContainer = document.getElementById("card-container");
const cardName = document.getElementById("card-name");
const cardAttribute = document.getElementById("card-attribute");
const cardLevelContainer = document.getElementById("card-level-container");
const cardImage = document.getElementById("card-image");
const cardNumber = document.getElementById("card-number");
const cardCategory = document.getElementById("card-category");
const cardText = document.getElementById("card-text");
const cardStatus = document.getElementById("card-status");
const cardDate = document.getElementById("card-date");
const cardAuthor = document.getElementById("card-author");
const accountType = document.getElementById("account-type");
const accountId = document.getElementById("account-id");

const cardNameInput = document.getElementById("card-name-input");
const cardAttributeInput = document.getElementById("card-attribute-input");
const cardLevelInput = document.getElementById("card-level-input");
const cardImageInput = document.getElementById("card-image-input");
const cardCategoryInput = document.getElementById("card-category-input");
const cardTextInput = document.getElementById("card-text-input");
const accountTypeInput = document.getElementById("account-type-input");
const accountIdInput = document.getElementById("account-id-input");
const downloadBtn = document.getElementById("download-btn");
const tweetBtn = document.getElementById("tweet-btn");

function getToday() {
  const dt = new Date();
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + dt.getDate()).slice(-2);
  const result = y + m + d;
  return result;
}

function getStatus() {
  const level = cardLevelInput.value;
  const totalStatus = Math.round(level * 10 * 0.6875);
  const maxAttackStatus = level == 1 ? 7 : Math.round(2.5 * level + 10);
  const maxDefenseStatus = Math.round(4.5 * level + 4);

  let attackStatus = Math.round(
    maxAttackStatus - Math.random() * maxAttackStatus * (1 / level)
  );
  let defenseStatus = Math.round(
    maxDefenseStatus - Math.random() * maxDefenseStatus * (1 / level)
  );

  if (totalStatus < attackStatus) {
    attackStatus = totalStatus;
  }
  if (totalStatus < attackStatus + defenseStatus) {
    defenseStatus = totalStatus - attackStatus;
  }

  return [attackStatus * 100, defenseStatus * 100];
}

function getCardNumber() {
  const dt = new Date();
  const hour = ("00" + dt.getHours()).slice(-2);
  const minute = ("00" + dt.getMinutes()).slice(-2);
  const dayNum = dt.getDay();
  const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][dayNum];
  const cardNumber = `${day}-${hour}${minute}`;
  return cardNumber;
}

cardDate.innerText = getToday();

cardNumber.innerText = getCardNumber();

cardNameInput.addEventListener("input", function () {
  cardName.innerText = this.value;
});

cardAttributeInput.addEventListener("change", function () {
  cardAttribute.innerText = this.value;
});

cardLevelInput.addEventListener("change", function () {
  let innerHtml = "";
  for (let i = 0; i < this.value; i++) {
    innerHtml += '<div class="card-star"></div>';
  }
  cardLevelContainer.innerHTML = innerHtml;

  const [attackStatus, defenseStatus] = getStatus();
  cardStatus.innerText = `ATK/${attackStatus}???DEF/${defenseStatus}`;
});

cardImageInput.addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      cardImage.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
});

cardCategoryInput.addEventListener("change", function () {
  cardCategory.textContent = this.value;
});

cardTextInput.addEventListener("input", function () {
  cardText.innerText = this.value;
});

accountTypeInput.addEventListener("change", function () {
  accountType.innerText = this.value;
});

accountIdInput.addEventListener("input", function () {
  accountId.innerText = this.value;
});

downloadBtn.addEventListener("click", async () => {
  const canvas = await html2canvas(cardContainer);
  let downloadEle = document.createElement("a");
  downloadEle.href = canvas.toDataURL("image/png");
  downloadEle.download = "nameCard.png";
  downloadEle.click();
});

tweetBtn.addEventListener("click", function () {
  const cardCategoryText =
    document.getElementsByClassName("card-category")[0].innerText;
  const arr = [
    `${cardName.innerText} (${cardAttribute.innerText})??????\n????????? ${cardLevelInput.value}`,
    `${cardCategoryText}\n${cardText.innerText}`,
    `${cardStatus.innerText}\n\n`,
  ];
  const dataURL = encodeURI(location.href);
  const dataText = encodeURI(arr.join("\n\n"));
  const dataHashtags = "????????????????????????";

  window.open(
    `https://twitter.com/share?text=${dataText}&url=${dataURL}&hashtags=${dataHashtags}`
  );
});
