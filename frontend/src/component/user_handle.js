const UserHandle = (name) => {
  const handle = document.createElement('div');

  const userIcon = document.createElement('i');
  userIcon.className = "bi bi-person-circle";

  const userName = document.createElement('span');
  userName.textContent = " " + name;

  handle.append(userIcon, userName);
  return handle;
}

export default UserHandle;
