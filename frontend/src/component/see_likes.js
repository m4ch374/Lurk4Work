import UserHandle from "./user_handle.js";

const SeeLikes = (props) => {
  const wrapper = document.createElement('div');
  wrapper.id = "see-like-content";

  if (props.length == 0) {
    wrapper.textContent = "There are currently no likes";
  } else {
    wrapper.appendChild(UserHandle(props[0].userId));
    props.slice(1).forEach(l => {
      wrapper.appendChild(document.createElement('hr'));
      wrapper.appendChild(UserHandle(l.userId));
    });
  }

  return wrapper;
}

export default SeeLikes;
