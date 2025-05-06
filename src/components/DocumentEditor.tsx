import { useState } from "react";
import dynamic from "next/dynamic";
import registerForm from '@/app/assets/styles/RegisterForm.module.css';
import { toast } from "react-hot-toast";
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from "./../../firebaseConfig";

import "react-quill/dist/quill.snow.css";
import { totalmem } from "os";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
interface DocumentEditorProps {
  initialContent?: string;
  title?: string;
  placeholder?: string;
  readOnly?: boolean;
  onSave?: (content: string) => void;
  theme?: "snow" | "bubble";
  height?: string;
  toolbarOptions?: string[];
  artworkIdentifier: string;
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
  artworkIdentifier,
  readOnly = false,
}: DocumentEditorProps) => {
  const [content, setContent] = useState(initialContent);

  const saveArtworkDocument = async () => {
    // Save the content to the firebase database
    if (!artworkIdentifier) {
      toast.error('Artwork identifier is missing!');
      return;
    }
    const docRef = doc(db, 'artworks', artworkIdentifier);
    await updateDoc(docRef, {
      document: content,
    });
    toast.success('Document saved successfully!');
  };

  return (
    <div className="editor-container">
      <h2>
        <b className="font-size-title">  {title}</b>
      </h2>
      <br />
      <ReactQuill theme="snow" value={content} onChange={setContent} className="quill-editor"/>
      <br />
      <button onClick={saveArtworkDocument} className={registerForm['submitButton']}>
        💾 <b>Guardar Documento</b>
      </button>
      <style jsx>{`
        .editor-container {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          // background: #f0f0f0;
          back
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
          background: #fff;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default DocumentEditor;
