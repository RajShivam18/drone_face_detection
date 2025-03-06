document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('darkModeToggle').addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  });

  const userTable = document.getElementById('userTable');
  const addUserBtn = document.getElementById('addUser');

  // Sample Users
  let users = [
      { name: "pintu kumar", role: "pintu kumar" },
      { name: "ankit anurag", role: "ankit anurag" }
  ];

  function loadUsers() {
      userTable.innerHTML = "";
      users.forEach((user, index) => {
          let tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${user.name}</td>
              <td>${user.role}</td>
              <td>
                  <button onclick="deleteUser(${index})">🗑️ Delete</button>
              </td>
          `;
          userTable.appendChild(tr);
      });
  }

  addUserBtn.addEventListener('click', () => {
      let userName = document.getElementById('userName').value.trim();
      let userRole = document.getElementById('userRole').value;

      if (userName !== "") {
          users.push({ name: userName, role: userRole });
          loadUsers();
      }
  });

  window.deleteUser = function (index) {
      users.splice(index, 1);
      loadUsers();
  };

  loadUsers();
});
