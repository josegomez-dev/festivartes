

// TabDocument.tsx
import React from 'react';
import DocumentEditor from '@/components/DocumentEditor';
import { ARTWORK } from '@/types/artworks.types';

interface TabDocumentProps {
  project: ARTWORK;
  getTodayDate: () => string;
}

const TabDocument: React.FC<TabDocumentProps> = ({ project, getTodayDate }) => {
  return (
    <DocumentEditor
      title={project.title || 'Título de la Obra'}
      placeholder="Empieza a escribir tu historia aquí..."
      readOnly={false}
      theme="snow"
      height="500px"
      artworkIdentifier={project.id}
      initialContent={project.document || `
        <h1><b>${project.title || 'Título de la Obra'}</b></h1>
        <br/>
        <p>Descripción: ${project.description}</p>
        <br/>
        <p>🎨 Esta es una obra de arte creada por <b>${project.artist}</b>.</p>
        <p>📅 Fecha: ${getTodayDate()}</p>
      `}
    />
  );
};

export default TabDocument;