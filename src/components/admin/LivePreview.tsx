"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface LivePreviewProps {
  url: string;
  data: any;
  modelKey?: string;
  className?: string;
}

export function LivePreview({ url, data, modelKey, className = "" }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "CMS_UPDATE", data, modelKey },
        "*"
      );
    }
  }, [data, loaded, modelKey]);

  // Handle preview ready message from iframe
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "PREVIEW_READY") {
         // Send data again when iframe signals it is ready
         if (iframeRef.current?.contentWindow) {
             iframeRef.current.contentWindow.postMessage(
                 { type: "CMS_UPDATE", data, modelKey },
                 "*"
             );
         }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [data]);

  const previewUrl = url.includes("?") ? `${url}&preview=true` : `${url}?preview=true`;

  return (
    <div className={`relative w-full h-full bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col ${className}`}>
      {/* Browser chrome header */}
      <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-4 shrink-0">
         <div className="flex gap-1.5">
           <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
           <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
         </div>
         <div className="bg-zinc-950 text-zinc-500 text-[10px] font-mono px-3 py-1 rounded-md flex-1 text-center truncate select-none border border-zinc-800/50 shadow-inner">
            {previewUrl}
         </div>
      </div>
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 z-10 backdrop-blur-sm">
          <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={previewUrl}
        className="w-full flex-1 bg-white"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
