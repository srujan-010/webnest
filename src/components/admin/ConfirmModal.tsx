"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export function ConfirmModal({ title, description, confirmLabel = "Confirm", onConfirm, onCancel, danger = false }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 select-none animate-fade-in">
      <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${danger ? "bg-red-500/10 text-red-400" : "bg-indigo-500/10 text-indigo-400"}`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{description}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-zinc-400 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 rounded-xl transition-all"
            suppressHydrationWarning
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 text-sm font-bold text-white rounded-xl transition-all shadow-md ${
              danger ? "bg-red-600 hover:bg-red-700 shadow-red-600/10" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/10"
            }`}
            suppressHydrationWarning
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
