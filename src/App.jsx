import { useRef, useState, useEffect } from "react";
import {
  Bold, Italic, Underline,
  AlignLeft, AlignCenter, AlignRight,
  Download, Sun, Moon
} from "lucide-react";

export default function WritingApp() {
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Times New Roman, serif");
  const [wordCount, setWordCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.fontSize = fontSize + "px";
      editorRef.current.style.fontFamily = fontFamily;
    }
  }, [fontSize, fontFamily]);

  const handleInput = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText;
    setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
  };

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const exportFile = (type) => {
    if (!editorRef.current) return;
    let content = editorRef.current.innerHTML;

    if (type === "md") {
      content = content
        .replace(/<b>(.*?)<\/b>/g, "**$1**")
        .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
        .replace(/<i>(.*?)<\/i>/g, "_$1_")
        .replace(/<em>(.*?)<\/em>/g, "_$1_")
        .replace(/<u>(.*?)<\/u>/g, "__$1__")
        .replace(/<div>(.*?)<\/div>/g, "$1\n")
        .replace(/<br>/g, "\n")
        .replace(/<[^>]+>/g, "");
    } else {
      content = editorRef.current.innerText;
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = type === "md" ? "document.md" : "document.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-[#f9f9f9] text-gray-900"} min-h-screen flex flex-col items-center p-4 sm:p-6`}>
      
      {/* Top bar: words & dark mode toggle */}
      <div className="flex justify-between items-center w-full max-w-3xl mb-4">
        <span className="text-sm">{wordCount} words</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Toolbar - always visible */}
      <div className="flex flex-wrap gap-2 mb-4 w-full max-w-3xl transition-all duration-300">
        <button onClick={() => exec("bold")} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700"><Bold className="w-5 h-5" /></button>
        <button onClick={() => exec("italic")} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700"><Italic className="w-5 h-5" /></button>
        <button onClick={() => exec("underline")} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700"><Underline className="w-5 h-5" /></button>
        <button onClick={() => exec("justifyLeft")} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700"><AlignLeft className="w-5 h-5" /></button>
        <button onClick={() => exec("justifyCenter")} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700"><AlignCenter className="w-5 h-5" /></button>
        <button onClick={() => exec("justifyRight")} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700"><AlignRight className="w-5 h-5" /></button>

        {/* Font Family */}
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-gray-100 cursor-pointer"
        >
          <option value="Times New Roman, serif">Times New Roman</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Courier New, monospace">Courier New</option>
          <option value="Verdana, sans-serif">Verdana</option>
        </select>

        {/* Font Size */}
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-gray-100 cursor-pointer"
        >
          {Array.from({ length: 7 }, (_, i) => 10 + i).map((size) => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>

        {/* Headings */}
        <select
          onChange={(e) => exec("formatBlock", e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-gray-100 cursor-pointer"
          defaultValue="p"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        {/* Export */}
        <button onClick={() => exportFile("md")} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-1">
          <Download className="w-5 h-5" /> .md
        </button>
        <button onClick={() => exportFile("txt")} className="p-3 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-1">
          <Download className="w-5 h-5" /> .txt
        </button>
      </div>

      {/* Editor container */}
      <div className="editor-container w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg transition-colors duration-300">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          className="editor outline-none whitespace-pre-wrap min-h-[300px] sm:min-h-[400px] leading-relaxed p-4 sm:p-6"
          style={{ fontSize: fontSize + "px", fontFamily }}
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
}
