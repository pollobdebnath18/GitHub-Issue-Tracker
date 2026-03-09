const username = document.getElementById("username");
const password = document.getElementById("password");
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const cartContainer = document.getElementById("cartContainer");
const totalCount = document.getElementById("totalCount");
const loaderSpinner = document.getElementById("loaderSpinner");
const myModal = document.getElementById("my_modal");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("author");
const modalTime = document.getElementById("time");
const modalDes = document.getElementById("modal-des");
const modalAssignee = document.getElementById("assignee");
const modalPriority = document.getElementById("priority");
const modalOpenOrClose = document.getElementById("open-or-close");

let allCart = [];
let openCart = [];
let closedCard = [];
let stat = "all";
//Login part
function login() {
  console.log("hey");
  const userNameValue = username.value;
  const passwordValue = password.value;
  console.log(userNameValue, passwordValue);
  if (userNameValue === "admin") {
    if (passwordValue === "admin123") {
      window.location.assign("home.html");
    } else {
      alert("Password Invalid");
    }
  } else {
    alert("UserName Invalid");
  }
}
function showLoader() {
  loaderSpinner.classList.remove("hidden");
}
function hideLoader() {
  loaderSpinner.classList.add("hidden");
}
function openModal(item) {
  myModal.showModal();
  modalTitle.textContent = item.title;
  modalAuthor.textContent = item.author;
  modalTime.textContent = item.updatedAt;
  modalDes.textContent = item.description;
  modalAssignee.textContent = item.assignee;
  modalPriority.textContent = item.priority;
  modalOpenOrClose.textContent = item.status;
  if (item.priority == "high") {
    modalPriority.className =
      "text-[#EF4444] bg-[#FEECEC] text-[14px]  px-2 py-1  rounded-xl";
  } else if (item.priority == "medium") {
    modalPriority.className =
      "text-[#F59E0B] bg-[#FFF6D1] text-[14px]  px-2 py-1  rounded-xl";
  } else if (item.priority == "low") {
    modalPriority.className =
      "text-[#9CA3AF] bg-[#EEEFF2] text-[14px]  px-2 py-1  rounded-xl";
  }
}

//toggle btn
function toggleButton(id) {
  showLoader();
  stat = id;
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  document.getElementById(id).classList.add("btn-primary");

  loadAllIssue();
}

//load all card
const loadAllIssue = async () => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues`,
  );
  const data = await res.json();
  hideLoader();
  displayAllIssue(data.data);
};
loadAllIssue();
const displayAllIssue = (issues) => {
  //   console.log(stat);
  let cnt = 0;

  cartContainer.innerHTML = "";
  issues.forEach((item) => {
    if (stat === "all" || item.status === stat) {
      cnt++;
      const cart = document.createElement("div");
      const topBorderClass =
        item.status === "open"
          ? "border-t-4 border border-t-green-500 rounded-t-xl"
          : "border-t-4 border border-t-purple-500 rounded-t-xl";
      cart.className = `bg-white shadow-xl rounded-xl px-5 py-3 space-y-3 cursor-pointer ${topBorderClass}`;

      const priorityClass =
        item.priority === "high"
          ? "text-[#EF4444] bg-[#FEECEC]"
          : item.priority === "medium"
            ? "text-[#F59E0B] bg-[#FFF6D1]"
            : "text-[#9CA3AF] bg-[#EEEFF2]";
      cart.innerHTML = `
        <div class="flex justify-between items-center ">
            ${item.priority === "low" ? `<img class="w-8 h-8" src="assets/Closed- Status .png" alt="" />` : `<img class="w-8 h-8" src="assets/Open-Status.png" alt="" />`}
            
            <p
              class="${priorityClass} px-5 py-2 rounded-b-2xl rounded-t-2xl"
            >
             ${item.priority.toUpperCase()}
            </p>
          </div>
          <div>
            <h2 class="text-[17px] font-semibold">
              ${item.title}
            </h2>
          </div>
          <div>
            <p class="text-[12px] text-[#64748B] line-clamp-2">
              ${item.description}
            </p>
          </div>
          <div class="flex justify-start items-center gap-2">
            <p
              class="text-[#EF4444] bg-[#FEECEC] text-[12px] px-2 py-1 rounded-b-2xl rounded-t-2xl"
            >
              <i class="fa-solid fa-bug"></i> BUG
            </p>
            <p
              class="text-[#F59E0B] bg-[#FFF6D1] text-[12px] px-2 py-1 rounded-b-2xl rounded-t-2xl"
            >
              <i class="fa-solid fa-life-ring"></i> HELP WANTED
            </p>
          </div>
          <div>
                <div class="divider -mx-5"></div>
          </div>
          <div>
            <p class="text-[13px] text-[#64748B]">#${item.id} by ${item.author}</p>
            <p class="text-[13px] text-[#64748B] p-2">${item.createdAt}</p>
          </div>
    `;
      cart.addEventListener("click", () => openModal(item));
      cartContainer.appendChild(cart);
    }
  });

  totalCount.textContent = cnt;
};
//search functionality
document.getElementById("search-btn").addEventListener("click", async () => {
  showLoader();
  const input = document.getElementById("search-input");
  const searchValue = input.value.trim().toLowerCase();
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`,
  );
  const data = await res.json();
  const allWords = data.data;
  hideLoader();
  displayAllIssue(allWords);
});
