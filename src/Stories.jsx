import React from "react";
import { useGlobalContext } from "./Context";

const Stories = () => {
  const { hits, isLoading,bookMark,setBookMark,addBookMark } = useGlobalContext();
  if (isLoading) {
    return (
      <>
        <h1>Loading.....</h1>
      </>
    );
  }
  const toggleBookmark = (news) => {
    const isBookmarked = bookMark.some((item) => item.objectID === news.objectID);
    if (isBookmarked) {
      const updatedBookmarks = bookMark.filter((item) => item.objectID !== news.objectID);
      setBookMark(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } else {
      addBookMark(news);
    }
  };

  return (
    <>
      <div className="stories-div">
        {hits.map((curPost) => {
          const { title, author, objectID, url, num_comments } = curPost;
          const isBookmarked = bookMark.some((item) => item.objectID === objectID);
          return (
            <div className="card" key={objectID}>
              <h2>{title}</h2>
              <p>
                By <span> {author}</span> | <span> {num_comments} </span>
                comments
              </p>
              <div className="card-button">
                <a href={url} target="_blank" rel="noreferrer">
                  Read More
                </a>
                <button onClick={() => toggleBookmark(curPost)} style={{ paddingBlock : "0.6rem"}}>
                  {
                    isBookmarked ? "❌ Remove" : "🔖 Save"
                  }
                </button>
              </div>
            </div>
          );
        })}
        <p>Made with ❤️ by <a href="https://www.linkedin.com/in/choudhury-mehbub-alam-b6b191219/">DevLeo</a></p>
      </div>
    </>
  );
};

export default Stories;