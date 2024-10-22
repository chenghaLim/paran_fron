import styles from "./InputField.module.css";
import React, { useEffect } from "react";

const InputField = ({
  message,
  setMessage,
  sendMessage,
}: {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}) => {
  useEffect(() => {
    const textarea = document.getElementById(
      "autoResize",
    ) as HTMLTextAreaElement;

    if (textarea) {
      const adjustHeight = () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      };

      textarea.addEventListener("input", adjustHeight);
      adjustHeight();

      return () => {
        textarea.removeEventListener("input", adjustHeight);
      };
    }
  }, []);

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (!e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className={styles.inputArea}>
      <div className={styles.inputContainer}>
        <textarea
          id="autoResize"
          rows={1} 
          placeholder="메세지를 작성해주세요.."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          style={{
            resize: "none",
            whiteSpace: "pre-wrap",
            overflow: "hidden", 
          }}
          onKeyDown={handleEnter}
          className="w-[90%] rounded border p-4"
        />
        <button disabled={message === ""} type="submit" className={styles.sendButton} onClick={handleSubmit}>
          <svg
            className="size-5 rotate-45 rtl:-rotate-45 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InputField;
