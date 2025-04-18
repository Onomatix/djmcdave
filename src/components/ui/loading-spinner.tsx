const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-dj-dark flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-dj-purple/30 border-t-dj-purple animate-spin"></div>
        <div className="mt-4 text-white/70 text-sm">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 