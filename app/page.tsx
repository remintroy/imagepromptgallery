import { getPromptDataPaginated } from "@/models/imagePromptsRepository";
import { GalleryPage } from "../components/GalleryPage";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch initial data from the API (SSR)
  const { data, pagination } = await getPromptDataPaginated({ page: 1 });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-6 py-3">
          <div className="flex items-center justify-between">
            <div className="w-full sm:w-auto text-start">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Image Prompt Gallery
              </h1>
              {/* <h1 className="text-2xl font-bold">Image Prompt Gallery</h1> */}
              <p className="text-slate-600 dark:text-slate-400 mt-1">Click on any image to view its creation prompt</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>{pagination.total} prompts available</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GalleryPage initialData={data} initialPagination={pagination} />
      </main>

      {/* Footer */}
      <footer
        className="w-full flex items-center justify-center sticky bottom-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700"
        style={{ height: "40px" }}
      >
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Powered by{" "}
          <a
            href="https://mastrovia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Mastrovia
          </a>
        </p>
      </footer>
    </div>
  );
}
