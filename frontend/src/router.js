import Feed from "./component/feed.js";

const router = (hash) => {
  switch(hash) {
    case "":
      return Feed();
    case "profile":
      console.log("profile");
      break;
    default:
      console.log("not found");
      break;
  }

  return document.createElement('div');
}

export default router;
