import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Editor styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const DocumentEditor = ({ initialContent = "" }) => {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    localStorage.setItem("document", content);
    alert("Document saved!");
  };

  return (
    <div className="editor-container">
      <h2>📄 Vivir sin miedo</h2>
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleSave}>💾 Save</button>
      <style jsx>{`
        .editor-container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          background: white;
          border-radius: 10px;
          color: black;
        }
        button {
          margin-top: 10px;
          padding: 10px 15px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default DocumentEditor;
