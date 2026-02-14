export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="w-14 h-14 border-4 border-[#3A9E75] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

