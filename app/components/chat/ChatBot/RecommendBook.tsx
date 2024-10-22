"use client";
import { useState } from "react";
import KakaoChat from "../KakaoChat";
import styles from"./RecommendBook.module.css";
import { PiRadioButtonDuotone } from "react-icons/pi";
import { PiRadioButtonFill } from "react-icons/pi";
import { IoIosSearch } from "react-icons/io";

export default function RecommendBook() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(true);

  const handleToggle = () => {
    setIsHidden((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(
          data.error || `Request failed with status ${response.status}`,
        );
      }

      setAnswer(data.result);
      setQuestion("");
    } catch (error: any) {
      console.error("Error response:", error.response?.data || error.message);

      alert(error.message);
    }
  };

  return (
    <div className="relative">
      <div className="fixed bottom-8 right-6 z-30">
        <div id={styles.targetItem} className={isHidden ? "hidden" : ""}>
          {answer &&<div id={styles.answerTag}>추천 결과: {answer}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="책 취향을 입력하세요"
            />
            <button type="submit">
              <IoIosSearch />
            </button>
          </form>
        </div>

        <div className="fixed bottom-6 right-6 z-30">
          <button type="button" id={styles.triggerBtn} onClick={handleToggle}>
            {isHidden ? <PiRadioButtonDuotone /> : <PiRadioButtonFill />}
          </button>
          <KakaoChat />
        </div>
      </div>
    </div>
  );
}
