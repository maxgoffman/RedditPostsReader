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
  
//Save Selected Post Details to cookie
export const savePostDetails = (item) => {
  try {
    const savedDetails = {
      data: {
        author: item.data.author,
        title: item.data.title,
        thumbnail: item.data.thumbnail,
        thumbnail_width: item.data.thumbnail_width,
        thumbnail_height: item.data.thumbnail_height,
        url: item.data.url,
        preview: item.data.preview
      }
    };
    const serializedState = JSON.stringify(savedDetails);
    Cookie.set("details", serializedState, { sameSite:'strict' });
  } catch (err) {
    //ignoring write errors
  }
};

//Load Post Details from Cookie
export const loadPostDetails = () => {
  try {
    const serializedState =  Cookie.get("details");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
