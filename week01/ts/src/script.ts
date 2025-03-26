//1. html 요소 선택
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLDataListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

//할 일이 어떻게 생긴 애인지 Type정의
type Todo = {
  id: number;
  text: string;
};
let todos: Todo[] = [];
let doneTasks: Todo[] = [];

//할 일 목록을 렌더링 하는 함수 정의
const renderTasks = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo) => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((todo): void => {
    const li = createTodoElement(todo, true); //수정
    doneList.appendChild(li);
  });
};

//할 일 텍스트 입력 처리 함수
const getTodoText = (): string => {
  console.log("Input Value:", todoInput.value); // 입력 값 확인
  return todoInput.value.trim();
};

//할 일 추가 처리 함수
const addTodo = (text: string): void => {
  console.log("Adding Todo:", text); // 값이 정상적으로 전달되는지 확인
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};

//할 일 상태 변경
const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t): boolean => t.id != todo.id);
  doneTasks.push(todo);
  renderTasks();
};

//완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
  renderTasks();
};

//할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone: boolean): HTMLElement => {
  const li = document.createElement("li");
  li.classList.add("render-container__item");
  li.textContent = todo.text;

  const button = document.createElement("button");
  button.classList.add("render-container__item-button");

  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#dc3545";
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745";
  }
  button.addEventListener("click", (): void => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  li.appendChild(button);
  return li;
};

//폼 제출 리스너
todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});
renderTasks();
