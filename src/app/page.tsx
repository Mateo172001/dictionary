"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import WordDefinition from "@/components/WordDefinition";
import FontSelector from "@/components/FontSelector";
import ThemeToggle from "@/components/ThemeToggle";
import SearchHistory from "@/components/SearchHistory";

const AppContent = () => {
  const handleFontChange = () => {
    const font = store.getState().ui.font;
    // Se eliminan todas las clases primero
    document.body.classList.remove("font-serif", "font-sans", "font-monospace");
    // Se agrega la clase correspondiente según la fuente seleccionada
    if (font === "serif") {
      document.body.classList.add("font-serif");
    } else if (font === "sans-serif") {
      document.body.classList.add("font-sans");
    } else if (font === "monospace") {
      document.body.classList.add("font-monospace");
    }
  };

  const handleThemeChange = () => {
    const theme = store.getState().ui.theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  // Suscripción al cambio en el store
  useEffect(() => {
    handleFontChange();
    handleThemeChange();

    const unsubscribe = store.subscribe(() => {
      handleFontChange();
      handleThemeChange();
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen px-6 py-8 md:px-10 md:py-12 transition-colors bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="max-w-2xl mx-auto flex justify-between items-center mb-10">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="38"
            viewBox="0 0 34 38"
            fill="none"
            className="mr-4"
          >
            <path
              d="M25 20 
           L75 20 
           Q80 20, 80 25 
           L80 80 
           L25 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M25 80 
           Q20 80, 20 75
           L20 25
           Q20 20, 25 20
           M25 80
           C25 90, 30 90, 80 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />

            <line
              x1="30"
              y1="35"
              x2="70"
              y2="35"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <h1 className="text-2xl font-bold">Dictionary</h1>
        </div>
        <div className="flex items-center gap-4">
          <FontSelector />
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-700"></div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-2xl mx-auto">
        <SearchHistory />
        <SearchBar />
        <WordDefinition />
      </main>
    </div>
  );
};

const DictionaryApp = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default DictionaryApp;
