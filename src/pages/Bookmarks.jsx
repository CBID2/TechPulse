import React, { useState, useCallback } from "react";
import { useGlobalContext } from "../Context";

const Bookmarks = () => {
  const { bookMark, setBookMark } = useGlobalContext();
  const [removingId, setRemovingId] = useState(null);

  const removeBookmark = useCallback((news) => {
    setRemovingId(news.objectID);

    setTimeout(() => {
      const updatedBookmarks = bookMark.filter(
        (item) => item.objectID !== news.objectID
      );
      setBookMark(updatedBookmarks);
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      setRemovingId(null);
    }, 300);
  }, [bookMark, setBookMark]);

  if (!bookMark.length) {
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
        <h1>No Bookmarks Yet! ⭐</h1>
      </div>
    );
  }

  return (
    <>
      <div className="stories-div" style={{ paddingTop: "3rem" }}>
        {bookMark.map((curPost) => {
          const { title, author, objectID, url, num_comments } = curPost;
          const isRemoving = removingId === objectID;

          return (
            <div
              className={`card ${isRemoving ? "removing" : ""}`}
              key={objectID}
            >
              <h2>{title}</h2>
              <p>
                By <span>{author}</span> | <span>{num_comments}</span> comments
              </p>
              <div className="card-button">
                <a href={url} target="_blank" rel="noreferrer">
                  Read More
                </a>
                <button
                  onClick={() => removeBookmark(curPost)}
                  style={{ paddingBlock: "0.6rem" }}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Bookmarks;
