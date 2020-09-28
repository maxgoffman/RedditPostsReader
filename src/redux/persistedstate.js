import Cookie from "js-cookie";

//in case a browser refresh 
//we're saving basic stuff 
//to recover data into a cookie

//Load Posts from Cookie
export const loadPosts = () => {
    try {
      const serializedState =  Cookie.get("posts");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
//Save Posts to cookie
export const savePosts = (postIds) => {
  try {
    const serializedState = JSON.stringify(postIds);
    Cookie.set("posts", serializedState, { sameSite:'strict' });
  } catch (err) {
    //ignoring write errors
  }
};
