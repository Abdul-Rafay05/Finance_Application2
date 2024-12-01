import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyDz4K9YYZNP1oHoxMx3R674z1NsuS5M9Pc",
  authDomain: "finance-application-172bf.firebaseapp.com",
  projectId: "finance-application-172bf",
  storageBucket: "finance-application-172bf.firebasestorage.app",
  messagingSenderId: "164590268202",
  appId: "1:164590268202:web:d12d6a7fee6ff23cccb853",
  measurementId: "G-LV6JJ9740X",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
const db = getDatabase(app);
let user_item = document.querySelector("#user_item");
let user_amount = document.querySelector("#user_amount");
let user_income_expense = document.querySelector("#user_income_expense");
let Add_Data = document.querySelector("#Add_Data");

function UpdateFunc() {
  console.log("Update");
}
function DeleteFunc() {
  console.log("Delete");
}

let count = 1;
Add_Data.addEventListener("click", () => {
  AddData()
  user_item.value = null;
  user_amount.value = null;
  count += 1
})

function AddData() {
  if (user_item.value.length > 0 && user_amount.value.length > 0) {
    set(ref(db, 'users/' + count), {
      productname: (user_item.value).toUpperCase(),
      useramount: Number(user_amount.value),
      typeIE: user_income_expense.value
    }).then(() => console.log("The data has been successfully added")).catch((error) => console.log("Unsccessfully", error));
  } else {
    console.log("please Enter Item name and price");
  }
}
let Income_total = 0;
let Expense_total = 0;
let totalAmount = 0;

onValue(ref(db, "users/"), (snapshot) => {
  const data = snapshot.val();
  // count += 1
  // console.log(data);
  let show_data = ""
  for (const key in data) {
    let items = data[key]
    // console.log(items);
    totalAmount += data[key].useramount;
    if (items.typeIE === "Income") {
      Income_total += items.useramount
    } else if (items.typeIE === "Expense") {
      Expense_total += items.useramount
    }
    show_data +=
      `<tr class="border">
                  <td>${key}</td>
                  <td>${items.productname}</td>
                  <td>${items.useramount}</td>
                  <td>${items.typeIE}</td>
                  <td>
                    <button class="bg-black text-white py-1 px-2 border-2 rounded-lg shadow-lg cursor-pointer text-xl" onclick="UpdateFunc('${key}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="bg-black text-white py-1 px-2 border-2 rounded-lg hover:shadow-lg cursor-pointer text-xl" onclick="DeleteFunc('${key}')"><i class="fa-solid fa-trash-can"></i></button>
                  </td>
             </tr>
             `
    document.querySelector("#Insert_data").innerHTML = show_data
    document.getElementById("Over_All_Total").innerHTML = totalAmount
    document.getElementById("income_total").innerHTML = Income_total
    document.getElementById("expense_total").innerHTML = Expense_total
    // console.log();
  }
  // console.log(Income_total);
  // console.log(Expense_total);
  // console.log(totalAmount);
})
