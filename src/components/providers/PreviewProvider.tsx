"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface PreviewContextType {
  isPreview: boolean;
  liveData: any;
  currentModelKey?: string;
}

const PreviewContext = createContext<PreviewContextType>({ isPreview: false, liveData: null });

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [isPreview, setIsPreview] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);
  const [currentModelKey, setCurrentModelKey] = useState<string | undefined>();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "CMS_UPDATE") {
        setIsPreview(true);
        setLiveData(e.data.data);
        setCurrentModelKey(e.data.modelKey);
      }
    };

    window.addEventListener("message", handleMessage);
    
    if (typeof window !== "undefined" && window.location.search.includes('preview=true')) {
        setIsPreview(true);
    }

    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');
    }

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <PreviewContext.Provider value={{ isPreview, liveData, currentModelKey }}>
      {children}
    </PreviewContext.Provider>
  );
}

export function usePreview<T>(initialData: T, modelKey?: string): T {
  const { isPreview, liveData, currentModelKey } = useContext(PreviewContext);
  
  if (isPreview && liveData && (!modelKey || modelKey === currentModelKey)) {
    // If we are injecting a single edited item into a list page
    if (Array.isArray(initialData) && !Array.isArray(liveData)) {
      const index = initialData.findIndex((item: any) => item._id === liveData._id);
      if (index >= 0) {
        const newData = [...initialData];
        newData[index] = { ...newData[index], ...liveData };
        return newData as unknown as T;
      } else {
        return [liveData, ...initialData] as unknown as T;
      }
    }
    
    // If it's an object replacing an object (detail page or singleton page)
    if (typeof initialData === 'object' && initialData !== null && !Array.isArray(initialData)) {
       return { ...initialData, ...liveData } as T;
    }

    // Direct replacement fallback
    return liveData as T;
  }
  
  return initialData;
}
