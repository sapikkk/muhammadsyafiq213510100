export default function Loading() {
  return (
    <main
      aria-busy="true"
      className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 py-10 text-center"
    >
      <p className="text-sm text-muted-foreground">Memuat...</p>
    </main>
  );
}
