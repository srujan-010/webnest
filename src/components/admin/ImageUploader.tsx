"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  aspectRatio?: string;
  label?: string;
}

export function ImageUploader({ value, onChange, aspectRatio, label }: ImageUploaderProps) {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setProgress(20);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setProgress(50);
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        body: formData,
      });
      setProgress(80);
      const json = await res.json();
      console.log('📤 [Frontend ImageUpload] Upload response:', json);
      if (!res.ok || !json.success) throw new Error(json.message || "Upload failed.");
      onChange(json.url);
      toast.success("Image uploaded!");
      setProgress(100);
    } catch (err: any) {
      toast.error(err.message || "Upload failed.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [token, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"] },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div className="space-y-2 select-none">
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
          <div className={`relative w-full ${aspectRatio ? "" : "h-40"}`} style={aspectRatio ? { aspectRatio } : {}}>
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => onChange("")}
              className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragActive ? "border-indigo-500 bg-indigo-500/5 text-zinc-300" : "border-zinc-800 hover:border-zinc-700 bg-zinc-950 hover:bg-zinc-900/40 text-zinc-500"
          } ${uploading ? "opacity-60 pointer-events-none" : ""}`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
              <p className="text-xs text-zinc-400 font-semibold">Uploading asset... {progress}%</p>
              <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400">
                <Upload className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-zinc-300">
                {isDragActive ? "Drop image here" : "Drag & drop or click to upload"}
              </p>
              <p className="text-[10px] text-zinc-500 font-medium">JPG, PNG, WebP, SVG • Max 10MB</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
