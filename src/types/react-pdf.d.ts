declare module 'react-pdf' {
    import * as React from 'react';
  
    export interface DocumentProps extends React.HTMLAttributes<HTMLDivElement> {
      file: string | File | ArrayBuffer;
      onLoadSuccess?: (pdf: any) => void;
      onLoadError?: (error: Error) => void;
      loading?: React.ReactElement;
      noData?: React.ReactElement;
    }
  
    export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
      pageNumber: number;
      width?: number;
      scale?: number;
      renderTextLayer?: boolean;
      renderAnnotationLayer?: boolean;
      onRenderSuccess?: () => void;
      onRenderError?: (error: Error) => void;
    }
  
    export const Document: React.FC<DocumentProps>;
    export const Page: React.FC<PageProps>;
  
    export const pdfjs: {
      GlobalWorkerOptions: {
        workerSrc: string;
      };
      version: string;
    };
  }