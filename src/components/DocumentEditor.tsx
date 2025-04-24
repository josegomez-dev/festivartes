import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Editor styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface DocumentEditorProps {
  initialContent?: string;
  title: string;
}

const DocumentEditor = ({ initialContent = "", title }: DocumentEditorProps) => {
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    localStorage.setItem("document", content);
    alert("Document saved!");
  };

  return (
    <div className="editor-container">
      <h2>📄 <b>{title}</b></h2>
      <br />
      <ReactQuill value={content} onChange={setContent} />
      <button onClick={handleSave}>💾 <b>Guardar Documento</b></button>
      <style jsx>{`
        .editor-container {
          max-width: 800px;
          margin: auto;
          padding: 20px 0;

          border: 1px solid #ccc;
              
          background: #31697a;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, #4b9fb2, #31697a);  /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(to right, #4b9fb2, #31697a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

          border-radius: 10px;
        }
        button {
          margin-top: 20px;
          padding: 10px 15px;
          background: orange;
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
