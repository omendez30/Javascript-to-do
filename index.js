const clear = document.querySelector(".clear");

const dateElement = document.getElementById("date");

const list = document.getElementById("list");

const input = document.getElementById("input");

const CHECK = "fa-check-circle";

const UNCHECK = "fa-circle";

const LINE_THROUGH = "lineThrough"; //create this in css
let LIST, id;

let today = new Date();
let options = { weekday: "long", month: "short", day: "numeric" };

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

const addToDo = (todo, id, done, trash) => {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `
    <li class="item">
      <i class="far ${DONE} co" job="complete" id="${id}"></i>
      <p class="text ${LINE}">${todo}</p>
      <i class="far fa-trash-alt de" job="delete" id="${id}"></i>
    </li>
  `;
  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
};

// addToDo("walk dog");

//store a todo item

//add an item to the list using the enter key
document.addEventListener("keyup", () => {
  if (event.keyCode === 13) {
    const toDo = input.value;
    //if input isn't empty
    if (toDo) {
      addToDo(toDo);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });
    }
    input.value = "";
    id++;
    localStorage.setItem("TODO", JSON.stringify(LIST));
  }
});
//addToDo("walk dog", 1, false, true);

//complete to do
const completeToDo = (element) => {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
};

//remove to do
const removeTodo = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
};

//target the items created dynamically
list.addEventListener("click", (event) => {
  const element = event.target;
  const elementJob = element.attributes.job.value; //delete or complete
  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") {
    removeTodo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

//save todo list to localStorage
// localStorage.setItem("key", "value");
// let variable = localStorage.getItem("key");

// localStorage.setItem("TODO", JSON.stringify(LIST));

//restore todo list form local storage
let data = localStorage.getItem("TODO");
const loadToDo = (array) => {
  array.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
};

if (data) {
  LIST = JSON.parse(data);
  loadToDo(LIST);
  id = LIST.length;
} else {
  LIST = [];
  id = 0;
}

clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
