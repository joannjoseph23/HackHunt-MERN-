// app/layout.tsx
export const metadata = {
  title: 'HackHunt',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Cinzel Decorative', serif" }}>
        {children}
      </body>
    </html>
  );
}
