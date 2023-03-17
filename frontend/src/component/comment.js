const Comment = (props) => {
  const commentDiv = document.createElement('div');

  const commentBy = document.createElement('div');

  const userIcon = document.createElement('i');
  userIcon.className = "bi bi-person-fill";

  const userName = document.createElement('span');
  userName.textContent = " " + props.userName;

  commentBy.append(userIcon, userName);

  const userComment = document.createElement('div');
  userComment.textContent = props.comment;

  commentDiv.append(commentBy, userComment);
  return commentDiv;
}

export default Comment;
