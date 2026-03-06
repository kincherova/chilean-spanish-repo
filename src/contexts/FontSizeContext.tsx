import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface FontSizeContextType {
  fontSize: FontSize;
  cycleFontSize: () => void;
}

const FontSizeContext = createContext<FontSizeContextType | null>(null);

const SIZES: FontSize[] = ['normal', 'large', 'xlarge'];

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('lessonFontSize') as FontSize) ?? 'normal';
  });

  useEffect(() => {
    localStorage.setItem('lessonFontSize', fontSize);
  }, [fontSize]);

  const cycleFontSize = () => {
    setFontSize((prev) => {
      const idx = SIZES.indexOf(prev);
      return SIZES[(idx + 1) % SIZES.length];
    });
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, cycleFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error('useFontSize must be used within FontSizeProvider');
  return ctx;
}
