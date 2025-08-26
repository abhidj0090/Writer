import { useRef, useState, useEffect } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Download } from "lucide-react";

export default function WritingApp() {
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState(14);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.fontSize = fontSize + "px";
    }
  }, [fontSize]);

  const handleInput = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    }
  };

  const exec = (command) => {
    document.execCommand(command, false, null);
  };

  const exportFile = (type) => {
    if (!editorRef.current) return;
    let content = editorRef.current.innerHTML;

    if (type === "md") {
      // Convert HTML to Markdown
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
      {/* Top bar */}
      <div className="flex justify-between items-center w-full max-w-3xl mb-4">
        <span className="text-sm text-gray-600">Words: {wordCount}</span>
        <div className="flex gap-2">
          <button onClick={() => exportFile("md")} className="p-2 border rounded hover:bg-gray-100">
            <Download className="w-4 h-4" /> .md
          </button>
          <button onClick={() => exportFile("txt")} className="p-2 border rounded hover:bg-gray-100">
            <Download className="w-4 h-4" /> .txt
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => exec("bold")} className="p-2 border rounded hover:bg-gray-100"><Bold className="w-4 h-4" /></button>
        <button onClick={() => exec("italic")} className="p-2 border rounded hover:bg-gray-100"><Italic className="w-4 h-4" /></button>
        <button onClick={() => exec("underline")} className="p-2 border rounded hover:bg-gray-100"><Underline className="w-4 h-4" /></button>
        <button onClick={() => exec("justifyLeft")} className="p-2 border rounded hover:bg-gray-100"><AlignLeft className="w-4 h-4" /></button>
        <button onClick={() => exec("justifyCenter")} className="p-2 border rounded hover:bg-gray-100"><AlignCenter className="w-4 h-4" /></button>
        <button onClick={() => exec("justifyRight")} className="p-2 border rounded hover:bg-gray-100"><AlignRight className="w-4 h-4" /></button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        style={{
          fontFamily: "Times New Roman, serif",
          fontSize: fontSize + "px",
        }}
        className="border border-gray-300 rounded-2xl p-6 min-h-[400px] w-full max-w-3xl outline-none whitespace-pre-wrap"
      />
    </div>
  );
}
