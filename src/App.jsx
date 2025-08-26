import { useRef, useState, useEffect } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Download } from "lucide-react";

export default function WritingApp() {
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(14);
  const [wordCount, setWordCount] = useState(0);
  const [fontFamily, setFontFamily] = useState("Times New Roman, serif");

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.fontSize = fontSize + "px";
      editorRef.current.style.fontFamily = fontFamily;
    }
  }, [fontSize, fontFamily]);

  const handleInput = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    }
  };

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
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
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {/* Top bar: word count + export */}
      <div className="flex justify-between items-center w-full max-w-3xl mb-4">
        <span className="text-sm text-gray-600">Words: {wordCount}</span>
        <div className="flex gap-2">
          <button onClick={() => exportFile("md")} className="p-2 border rounded hover:bg-gray-50">
            <Download className="w-4 h-4" /> .md
          </button>
          <button onClick={() => exportFile("txt")} className="p-2 border rounded hover:bg-gray-50">
            <Download className="w-4 h-4" /> .txt
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-4 items-center w-full max-w-3xl">
        <button onClick={() => exec("bold")} className="p-2 border rounded hover:bg-gray-50"><Bold className="w-4 h-4" /></button>
        <button onClick={() => exec("italic")} className="p-2 border rounded hover:bg-gray-50"><Italic className="w-4 h-4" /></button>
        <button onClick={() => exec("underline")} className="p-2 border rounded hover:bg-gray-50"><Underline className="w-4 h-4" /></button>
        <button onClick={() => exec("justifyLeft")} className="p-2 border rounded hover:bg-gray-50"><AlignLeft className="w-4 h-4" /></button>
        <button onClick={() => exec("justifyCenter")} className="p-2 border rounded hover:bg-gray-50"><AlignCenter className="w-4 h-4" /></button>
        <button onClick={() => exec("justifyRight")} className="p-2 border rounded hover:bg-gray-50"><AlignRight className="w-4 h-4" /></button>

        {/* Font Family Dropdown */}
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="ml-auto p-1 border rounded bg-white text-black cursor-pointer"
        >
          <option value="Times New Roman, serif">Times New Roman</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Courier New, monospace">Courier New</option>
          <option value="Verdana, sans-serif">Verdana</option>
        </select>

        {/* Font Size Dropdown */}
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="p-1 border rounded bg-white text-black cursor-pointer"
        >
          {Array.from({ length: 7 }, (_, i) => 10 + i).map((size) => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>

        {/* Headings */}
        <select
          onChange={(e) => exec("formatBlock", e.target.value)}
          className="p-1 border rounded bg-white text-black cursor-pointer"
          defaultValue="p"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
      </div>

      {/* Editor */}
      <div className="editor-container w-full max-w-3xl mx-auto"
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize + "px",
        }}
        className="editor-container"
      />
    </div>
  );
}
