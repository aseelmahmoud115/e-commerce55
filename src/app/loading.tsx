export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="relative size-14">
        <span className="absolute inset-0 rounded-full border-4 border-green-100" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-green-600" />
      </div>
      <p className="text-sm font-medium text-gray-500">Loading fresh content...</p>
    </div>
  );
}
