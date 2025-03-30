import React, { useCallback, memo } from "react";
import { useGlobalContext } from "./Context";

const Stories = () => {
  const { hits, isLoading, bookMark, setBookMark, readingMode, fontSize } = useGlobalContext();

  const toggleBookmark = useCallback((news) => {
    const isBookmarked = bookMark.some((item) => item.objectID === news.objectID);

    const updatedBookmarks = isBookmarked
      ? bookMark.filter((item) => item.objectID !== news.objectID)
      : [...bookMark, news];

    setBookMark(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  }, [bookMark, setBookMark]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="stories-div">
        {hits.map((curPost) => {
          const { title, author, objectID, url, num_comments } = curPost;
          const isBookmarked = bookMark.some((item) => item.objectID === objectID);

          return (
            <div className="card" key={objectID}>
              <h2
                style={{
                  fontSize: readingMode === true ? `${fontSize}px` : "",
                }}
              >{title}</h2>
              <p style={{
                fontSize: readingMode === true ? `${fontSize}px` : "",
              }}>
                By <span>{author}</span> | <span>{num_comments}</span> comments
              </p>

              <div className="card-button">
                <a href={url} target="_blank" rel="noreferrer"
                  style={{
                    fontSize: readingMode === true ? `${fontSize}px` : "",
                  }}
                >
                  Read More
                </a>

                <button
                  onClick={() => toggleBookmark(curPost)}
                  style={{ paddingBlock: "0.6rem" }}
                >
                  {isBookmarked ? "❌ Remove" : "🔖 Save"}
                </button>
              </div>
            </div>
          );
        })}

        <p>Made with ❤️ by
          <a href="https://www.linkedin.com/in/choudhury-mehbub-alam-b6b191219/">
            DevLeo
          </a>
        </p>
      </div>
    </>
  );
};

export default memo(Stories);  