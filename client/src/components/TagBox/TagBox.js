import "./TagBox.scss";

function TagBox({tags, setTags}) {
  // 태그 삭제
  const removeTag = (indexToRemove) => {
    const filter = tags.filter((item, index) => index !== indexToRemove);
    setTags(filter);
  };
  // tags 배열에 새로운 태그를 추가
  const addTags = (event) => {
    const inputValue = event.target.value;
    if (
      event.key === "Enter" &&
      inputValue !== "" &&
      !tags.includes(inputValue)
    ) {
      setTags([...tags, inputValue]);
      event.target.value = "";
    }
  };
  return (
    <div className="TagBox">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTag(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        id="tagInput"
        className="tag-input"
        type="text"
        // Enter 누르면 태그 추가
        onKeyUp={(e) => {
          addTags(e);
        }}
        placeholder="Press enter to add tags"
      />
    </div>
  );
}

export default TagBox;
