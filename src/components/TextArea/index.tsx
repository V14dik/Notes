import { useEffect, useRef } from "react";
import "./index.scss";

interface TextAreaProps {
  value: string;
  onChange: (newValue: string) => void;
  checkContent: () => void;
  highlightedWords: string[];
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  checkContent,
  highlightedWords,
}) => {
  const textAreaRef = useRef<HTMLDivElement>(null);

  const highlightWords = (text: string, highlightedWords: string[]): string => {
    return highlightedWords.reduce((acc, cur) => {
      return acc.replace(
        new RegExp(`(${cur})`, "gi"),
        `<span style="background-color: yellow;">$1</span>`
      );
    }, text);
  };

  const handleInput = (e: any) => {
    const text = e.target.innerText || textAreaRef.current?.innerText;

    const html = highlightWords(text, highlightedWords);
    textAreaRef.current!.innerHTML = html;
    setCursor();

    onChange(text);
  };

  const setCursor = () => {
    let range = document.createRange();
    let sel = window.getSelection()!;
    range.setStart(
      textAreaRef.current!,
      textAreaRef.current!.childNodes.length
    );
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  useEffect(() => {
    const html = highlightWords(value, highlightedWords);
    textAreaRef.current!.innerHTML = html;
    setCursor();
  }, [value, highlightedWords]);

  return (
    <div
      className="text-area"
      contentEditable
      ref={textAreaRef}
      onInput={handleInput}
      onKeyDown={(e) => {
        if (e.code === "Space") {
          checkContent();
        }
      }}
    ></div>
  );
};
