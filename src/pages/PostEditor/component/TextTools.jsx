import React, { memo, useState } from "react";

const TextTools = ({ applyStyle }) => {
  const [url, seturl] = useState(null);
  const [isInputVisible, setInputVisible] = useState(false);

  const handleCreatLink = (e) => {
    if (e.key === "Enter" && url) {
      applyStyle("CreateLink", url);
      setInputVisible(false);
    }
  };

  const options = [
    {
      action: () => applyStyle("Bold", null),
      icon: "B",
      className: "flex justify-center items-center border-black w-full",
    },
    {
      action: () => applyStyle("Underline", null),
      icon: "U",
      className: "flex justify-center items-center border-black w-full",
    },
    {
      action: () => setInputVisible(true),
      icon: <i className="bi bi-link "></i>,
      value: url,
      className: "flex justify-center items-center border-black w-full text-xl",
    },
    {
      action: () => applyStyle("Italic", null),
      icon: "I",
      className: "flex justify-center items-center border-black w-full",
    },
  ];
  // console.log(url);

  return isInputVisible ? (
    <div
      className={`bg-gray-500 flex justify-evenly items-center gap-2  p-2    rounded-md transition-transform duration-100 z-10 -top-8 after:absolute after:bg-inherit after:size-3 after:-z-10 after:rotate-45 after:top-10 after:right-[50%]  absolute`}
    >
      <input
        placeholder="Enter url "
        className="w-full bg-gray-400 placeholder:text-inherit outline-none p-1 rounded-sm"
        type="text"
        onChange={({ target: { value } }) => {
          seturl(value);
        }}
        onKeyDown={handleCreatLink}
      />
      <button className=" " onClick={() => setInputVisible(false)}>
        {" "}
        <i className="bi bi-x-lg"></i>{" "}
      </button>
    </div>
  ) : (
    <div
      className={`bg-slate-500 justify-evenly items-center  p-2 px-5 rounded-md transition-transform duration-100 z-10 -top-8 after:absolute after:bg-inherit after:size-3 after:-z-50 after:rotate-45 after:top-9 after:right-[50%]  absolute`}
    >
      <div className="flex w-full items-center gap-3 justify-between">
        {options.map((option, idx) => (
          <span key={idx} className={`${option.className}`}>
            <button onClick={option.action}>{option.icon}</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default memo(TextTools);