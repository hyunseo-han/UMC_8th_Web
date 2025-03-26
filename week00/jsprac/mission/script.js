document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const todoList = document.getElementById("todoList");
  const doneList = document.getElementById("doneList");

  // 할 일 추가
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && taskInput.value.trim() !== "") {
      addTask(taskInput.value.trim());
      taskInput.value = ""; // 입력 필드 초기화
    }
  });

  function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    // 완료 버튼
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", function () {
      moveToDoneList(li);
    });

    li.appendChild(completeBtn);
    todoList.appendChild(li);
  }

  function moveToDoneList(taskItem) {
    taskItem.querySelector(".complete-btn").remove(); // 완료 버튼 제거

    // 삭제 버튼 추가
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      taskItem.remove();
    });

    taskItem.appendChild(deleteBtn);
    doneList.appendChild(taskItem);
  }
});
