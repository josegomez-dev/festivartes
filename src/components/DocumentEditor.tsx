import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface DocumentEditorProps {
  initialContent?: string;
  title: string;
  placeholder?: string;
  readOnly?: boolean;
  onSave?: (content: string) => void;
  theme?: "snow" | "bubble";
  height?: string;
  toolbarOptions?: string[];
}

const DocumentEditor = ({
  initialContent = `
  <h1>Titulo de tu obra: "Ecos del Valle"</h1>
  <h2>Sinopsis</h2>
  <p>Una obra que fusiona música folklórica en vivo y la narrativa teatral para contar la historia de un pequeño pueblo que lucha por mantener vivas sus tradiciones.</p>
  <br />
  <p>✨ <i>Escribe aquí tu propia obra cultural inspirada en tus tradiciones.</i></p>
`,
  title,
}: DocumentEditorProps) => {
  const [content, setContent] = useState(initialContent);

  return (
    <div className="editor-container">
      <h2>📄 <b>{title}</b></h2>
      <br />
      <ReactQuill theme="snow" value={content} onChange={setContent} className="quill-editor"/>
      <br />
      <style jsx>{`
        .editor-container {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
        }

        .quill-editor {
          height: 400px;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
        }

        :global(.ql-toolbar.ql-snow) {
          border-radius: 10px 10px 0 0;
          background: #f0f0f0;
        }

        :global(.ql-container.ql-snow) {
          border-radius: 0 0 10px 10px;
          font-family: 'Arial', sans-serif;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default DocumentEditor;
