const username = document.getElementById("username");
const password = document.getElementById("password");
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const cartContainer = document.getElementById("cartContainer");
const totalCount = document.getElementById("totalCount");
const loaderSpinner = document.getElementById("loaderSpinner");
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
      cart.className = "bg-white shadow-xl rounded-xl px-5 py-3 space-y-3";
      cart.innerHTML = `
        <div class="flex justify-between items-center">
            <img class="w-8 h-8" src="assets/Open-Status.png" alt="" />
            <p
              class="text-[#EF4444] bg-[#FEECEC] px-5 py-2 rounded-b-2xl rounded-t-2xl"
            >
              Help
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
            <p class="text-[13px] text-[#64748B]">#1 by john_doe</p>
            <p class="text-[13px] text-[#64748B] p-2">1/15/2024</p>
          </div>
    `;
      cartContainer.appendChild(cart);
    }
  });

  totalCount.textContent = cnt;
};
