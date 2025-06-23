"use client";

import { GalleryImage } from "@/app/types";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useSearchParams, notFound } from "next/navigation";

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const pwd = searchParams.get("pwd");
  console.log(pwd)
  if (pwd !== "admin+page") {
    notFound();
  }

  const [prompts, setPrompts] = useState<GalleryImage[]>([]);
  const [form, setForm] = useState({ imageUrl: "", prompt: "", alt: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch prompts from API
  const fetchPrompts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/image-prompts");
      setPrompts(res.data?.data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editingId) {
        // Update prompt
        await api.put(`/api/image-prompts?id=${editingId}`, form);
      } else {
        // Create prompt
        await api.post("/api/image-/prompts", form);
      }
      setForm({ imageUrl: "", prompt: "", alt: "" });
      setEditingId(null);
      fetchPrompts();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const prompt = prompts.find((p) => p._id === id);
    if (prompt) {
      setForm({ imageUrl: prompt.imageUrl, prompt: prompt.prompt, alt: prompt.alt });
      setEditingId(id);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/image-prompts?id=${id}`);
      if (editingId === id) setEditingId(null);
      fetchPrompts();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Prompts Management</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="border px-2 py-1 rounded"
            required
          />
          <input
            name="prompt"
            value={form.prompt}
            onChange={handleChange}
            placeholder="Prompt"
            className="border px-2 py-1 rounded"
            required
          />
          <input
            name="alt"
            value={form.alt}
            onChange={handleChange}
            placeholder="Alt text"
            className="border px-2 py-1 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" disabled={loading}>
            {editingId ? "Update Prompt" : "Add Prompt"}
          </button>
        </form>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-slate-100">
                <th className="border px-2 py-1">Image</th>
                <th className="border px-2 py-1">Prompt</th>
                <th className="border px-2 py-1">Alt</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prompts?.map((p) => (
                <tr key={p._id}>
                  <td className="border px-2 py-1">
                    <img src={p.imageUrl} alt={p.alt} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="border px-2 py-1">{p.prompt}</td>
                  <td className="border px-2 py-1">{p.alt}</td>
                  <td className="border px-2 py-1">
                    <button className="text-blue-600 mr-2" onClick={() => handleEdit(p._id!)} disabled={loading}>
                      Edit
                    </button>
                    <button className="text-red-600" onClick={() => handleDelete(p._id!)} disabled={loading}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
