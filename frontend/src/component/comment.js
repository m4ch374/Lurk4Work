import UserHandle from "./user_handle.js";

const Comment = (props) => {
  const commentDiv = document.createElement('div');

  const commentBy = UserHandle(props.userName);

  const userComment = document.createElement('div');
  userComment.textContent = props.comment;

  commentDiv.append(commentBy, userComment);
  return commentDiv;
}

export default Comment;
