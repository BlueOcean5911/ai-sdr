"use client";
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill"; // Make sure to import Quill

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: any; // Adjust the type according to your needs
  onTextChange?: (...args: any[]) => void;
  onSelectionChange?: (...args: any[]) => void;
}

// Editor is an uncontrolled React component
const Editor = forwardRef<Quill | null, EditorProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const quillRef = useRef<Quill | null>(null); // Mutable ref for Quill instance

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    }, [onTextChange, onSelectionChange]);

    useEffect(() => {
      if (quillRef.current) {
        quillRef.current.enable(!readOnly);
      }
    }, [readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
        placeholder: "Your text here...",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false, 6] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      quillRef.current = quill; // Assign to mutable ref

      // Use a callback to update the forwarded ref
      if (ref && typeof ref === "object" && "current" in ref) {
        ref.current = quill; // Assign to forwarded ref
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        quillRef.current = null; // Cleanup
        if (ref && typeof ref === "object" && "current" in ref) {
          ref.current = null; // Cleanup forwarded ref
        }
        container.innerHTML = "";
      };
    }, [ref]);

    return <div className="h-full" ref={containerRef}></div>;
  }
);

Editor.displayName = "Editor";

export default Editor;
