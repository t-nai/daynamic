const currentDate = document.querySelector(".current-date");

let days_tag = document.querySelector(".days"),
page_selector = document.querySelectorAll(".icons span");

let date = new Date(),
current_year = date.getFullYear(),
current_month = date.getMonth(),
current_date = date.getDate();

const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const renderCalendar = () => {
	let first = new Date(current_year, current_month, 1).getDay();
	let last = new Date(current_year, current_month + 1, 0).getDate();
	
	if (first === 0) {
		first = 6;
	}
	else {
		first = first-1;
	}
	
	let date = "";
	
	for (let i=first; i>0; i--){
		date += `<li class="empty"></li>`;
	}
	
	for (let i=1; i<= last; i++){
		date += `<li class="${i === current_date && current_month === new Date().getMonth() && current_year === new Date().getFullYear() ? 'today' : ''}">${i}</li>`;
	}
	
	if (current_year === new Date().getFullYear() && current_month === new Date().getMonth()) {
		currentDate.innerText = `${month_names[current_month]} ${current_date} ${current_year}` ;
	}
	else {
		currentDate.innerText = `${month_names[current_month]} ${current_year}` ;
	}
		
	
	days_tag.innerHTML = date;
}
renderCalendar();

page_selector.forEach(icon => {
	icon.addEventListener("click", () => {
		if (icon.id == "prev") {
			current_month = current_month - 1;
		}
		else {
			current_month = current_month + 1;
		}
		if(current_month < 0 || current_month > 11) {
			date = new Date(current_year, current_month);
			current_year = date.getFullYear();
			current_month = date.getMonth();
		}
		else {
			date = new Date();
		}
		renderCalendar();
	});
});

const meds_button = document.querySelector(".meds-btn");
const meds_modal = document.querySelector(".meds-modal");
const close_modal = document.querySelector("#close-modal");
const new_med_input = document.querySelector("#newMedInput");
const med_list = document.querySelector(".meds-list");

let med_list_array = JSON.parse(localStorage.getItem("med_list")) || [];
let checked_meds = JSON.parse(localStorage.getItem("checked_meds")) || [];

function renderList() {
  const med_contr = document.querySelector(".meds-list");
  med_contr.innerHTML = '';

  if (med_list_array.length === 0)
  {
    med_contr.innerHTML = '<li>add your current medications!</li>';
  }
  else {
    med_list_array.forEach((med, index) => {
      const li = document.createElement("li");

      const med_span = document.createElement("span");
      med_span.classList.add("med-name");
      med_span.innerText = med;
      med_span.setAttribute('data-index', index);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("med-checkbox");
      checkbox.setAttribute('data-index', index);

      checkbox.checked = checked_meds[index] || false;

      li.appendChild(checkbox);
      li.appendChild(med_span);

      checkbox.addEventListener("change", () => {
      checked_meds[index] = checkbox.checked;
      localStorage.setItem("checked_meds", JSON.stringify(checked_meds));
      });

      med_contr.appendChild(li);

      med_span.addEventListener("click", () => {
      deleteMed(index);
      });
    });
  }
}

function deleteMed(index) {
  med_list_array.splice(index, 1);
  checked_meds.splice(index, 1);
  renderList();
  localStorage.setItem("med_list", JSON.stringify(med_list_array));
  localStorage.setItem("checked_meds", JSON.stringify(checked_meds));
}

new_med_input.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && new_med_input.value.trim() !== "")
  {
    med_list_array.push(new_med_input.value.trim());
    checked_meds.push(false);
    new_med_input.value = '';
    renderList();
    localStorage.setItem("med_list", JSON.stringify(med_list_array));
    localStorage.setItem("checked_meds", JSON.stringify(checked_meds));
  }
});

close_modal.addEventListener("click", function () {
    meds_modal.style.display = "none";
});

meds_button.addEventListener("click", function () {
    meds_modal.style.display = "flex";
});

renderList();

document.addEventListener("DOMContentLoaded", () => {
    meds_modal.style.display = "none";
});
