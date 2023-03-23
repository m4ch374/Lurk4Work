import Comment from "./comment.js";

const SeeComments = (props) => {
  const wrapper = document.createElement('div');
  wrapper.id = "see-comment-content";

  if (props.length == 0) {
    wrapper.textContent = "There are no comments";
  } else {
    wrapper.appendChild(Comment(props[0]));
    props.slice(1).forEach(c => {
      wrapper.appendChild(document.createElement('hr'));
      wrapper.appendChild(Comment(c));
    });
  }

  return wrapper;
}

export default SeeComments;
