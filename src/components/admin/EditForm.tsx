"use client";

import React, { useState } from "react";
import { ImageUploader } from "./ImageUploader";
import type { FormField } from "./CrudTable";
import { X, Check } from "lucide-react";
import { TiptapEditor } from "./visual-editor/TiptapEditor";

interface EditFormProps {
  fields: FormField[];
  defaultValues?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
  onCancel: () => void;
  onChange?: (values: Record<string, any>) => void;
}

function unflatten(data: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const parts = key.split(".");
      let current = result;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          current[part] = data[key];
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      }
    }
  }
  return result;
}

export function EditForm({ fields, defaultValues = {}, onSave, onCancel, onChange }: EditFormProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    const safeDefaults = defaultValues || {};
    fields.forEach((f) => {
      let val: any = undefined;
      if (f.key.includes(".")) {
        const parts = f.key.split(".");
        let current: any = safeDefaults;
        for (const part of parts) {
          if (current == null) {
            current = undefined;
            break;
          }
          current = current[part];
        }
        val = current;
      } else {
        val = safeDefaults[f.key];
      }
      init[f.key] = val ?? (f.type === "toggle" ? false : f.type === "tags" || f.type === "multiselect" ? [] : "");
    });
    return init;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync initial state on mount
  React.useEffect(() => {
    if (onChange) onChange(unflatten(values));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (key: string, val: any) => {
    const next = { ...values, [key]: val };
    console.log('📝 [Frontend EditForm] Form state updated:', next);
    setValues(next);
    if (onChange) onChange(unflatten(next));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.required && !values[f.key] && values[f.key] !== false) {
        errs[f.key] = `${f.label} is required.`;
      }
      if (f.maxLength && typeof values[f.key] === "string" && values[f.key].length > f.maxLength) {
        errs[f.key] = `${f.label} must be under ${f.maxLength} characters.`;
      }
      if (f.type === "url" && values[f.key]) {
        const val = String(values[f.key]);
        const isInternal = val.startsWith("/");
        const isExternal = val.startsWith("http://") || val.startsWith("https://");
        if (!isInternal && !isExternal) {
          errs[f.key] = "Enter a valid internal route (/contact) or a full URL (https://example.com).";
        }
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(unflatten(values));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 select-none">
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              {field.label}
              {field.required && <span className="text-red-400 ml-1 font-extrabold">*</span>}
            </label>

            {/* Text */}
            {field.type === "text" && (
              <div>
                <input
                  suppressHydrationWarning
                  type="text"
                  value={values[field.key] || ""}
                  onChange={(e) => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  maxLength={field.maxLength}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-600"
                />
                {field.maxLength && (
                  <p className="text-[10px] text-zinc-500 mt-1.5 text-right font-medium">{(values[field.key] || "").length}/{field.maxLength}</p>
                )}
              </div>
            )}

            {/* URL */}
            {field.type === "url" && (
              <input
                suppressHydrationWarning
                type="text"
                value={values[field.key] || ""}
                onChange={(e) => set(field.key, e.target.value)}
                placeholder={field.placeholder || "/contact"}
                className="w-full px-3.5 py-2.5 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all placeholder-zinc-600"
              />
            )}

            {/* Number */}
            {field.type === "number" && (
              <input
                suppressHydrationWarning
                type="number"
                value={values[field.key] || ""}
                onChange={(e) => set(field.key, Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all"
              />
            )}

            {/* Textarea */}
            {field.type === "textarea" && (
              <textarea
                suppressHydrationWarning
                value={values[field.key] || ""}
                onChange={(e) => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                maxLength={field.maxLength}
                className="w-full px-3.5 py-2.5 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all resize-none placeholder-zinc-600"
              ></textarea>
            )}

            {/* Rich Text Editor */}
            {field.type === "richtext" && (
              <TiptapEditor
                value={values[field.key] || ""}
                onChange={(html) => set(field.key, html)}
              />
            )}

            {/* Select */}
            {field.type === "select" && field.options && (
              <select
                suppressHydrationWarning
                value={values[field.key] || ""}
                onChange={(e) => set(field.key, e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-semibold border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-white transition-all appearance-none"
              >
                <option value="" className="text-zinc-600">Select...</option>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-zinc-950">{opt.label}</option>
                ))}
              </select>
            )}

            {/* Multiselect */}
            {field.type === "multiselect" && field.options && (
              <div className="border border-zinc-800 bg-zinc-900 rounded-xl p-3 space-y-2 max-h-48 overflow-y-auto select-none">
                {field.options.map((opt) => {
                  const currentVals = Array.isArray(values[field.key]) ? values[field.key] : [];
                  const isChecked = currentVals.includes(opt.value);
                  return (
                    <label key={opt.value} className="flex items-center gap-2.5 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer py-1">
                      <input
                        suppressHydrationWarning
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            set(field.key, [...currentVals, opt.value]);
                          } else {
                            set(field.key, currentVals.filter((v: any) => v !== opt.value));
                          }
                        }}
                        className="rounded border-zinc-700 bg-zinc-950 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-zinc-900"
                      />
                      {opt.label}
                    </label>
                  );
                })}
              </div>
            )}

            {/* Toggle */}
            {field.type === "toggle" && (
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => set(field.key, !values[field.key])}
                className={`relative w-11 h-6 rounded-full transition-colors flex items-center ${values[field.key] ? "bg-indigo-600" : "bg-zinc-800"}`}
              >
                <span className={`absolute w-5 h-5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center ${values[field.key] ? "translate-x-5.5" : "translate-x-0.5"}`}>
                  {values[field.key] ? <Check className="w-3 h-3 text-indigo-600 stroke-[3]" /> : null}
                </span>
              </button>
            )}

            {/* Color */}
            {field.type === "color" && (
              <div className="flex items-center gap-3">
                <input
                  suppressHydrationWarning
                  type="color"
                  value={values[field.key] || "#4F46E5"}
                  onChange={(e) => set(field.key, e.target.value)}
                  className="w-10 h-10 rounded-xl border border-zinc-800 cursor-pointer p-0.5 bg-zinc-900"
                />
                <input
                  suppressHydrationWarning
                  type="text"
                  value={values[field.key] || "#4F46E5"}
                  onChange={(e) => set(field.key, e.target.value)}
                  placeholder="#4F46E5"
                  className="w-32 px-3.5 py-2 text-xs border border-zinc-800 rounded-xl bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono text-white"
                />
              </div>
            )}

            {/* Image */}
            {field.type === "image" && (
              <ImageUploader
                value={values[field.key] || ""}
                onChange={(url) => set(field.key, url)}
              />
            )}

            {/* Tags */}
            {field.type === "tags" && (
              <TagInput
                value={values[field.key] || []}
                onChange={(tags) => set(field.key, tags)}
                placeholder={field.placeholder || "Type tag and press Enter"}
              />
            )}

            {/* Hint */}
            {field.hint && <p className="text-[10px] text-zinc-500 mt-1.5 font-semibold tracking-wide">{field.hint}</p>}

            {/* Error */}
            {errors[field.key] && (
              <p className="text-xs text-red-400 mt-1.5 font-bold">{errors[field.key]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Form Buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800/80 mt-8">
        <button
          suppressHydrationWarning
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-xs font-bold text-zinc-400 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 rounded-xl transition-all"
        >
          Cancel
        </button>
        <button
          suppressHydrationWarning
          type="submit"
          className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
        >
          Save Details
        </button>
      </div>
    </form>
  );
}

// Tag input component
function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (tags: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  return (
    <div className="border border-zinc-800 bg-zinc-900 rounded-xl p-2.5 flex flex-wrap gap-1.5 min-h-[44px] focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all select-none">
      {value.map((tag) => (
        <span key={tag} className="flex items-center gap-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold px-2 py-0.5 rounded-lg">
          {tag}
          <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} className="hover:text-red-400">
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        suppressHydrationWarning
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(input); }
          if (e.key === "Backspace" && !input && value.length) onChange(value.slice(0, -1));
        }}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] text-xs font-semibold outline-none bg-transparent text-white placeholder-zinc-600"
      />
    </div>
  );
}
