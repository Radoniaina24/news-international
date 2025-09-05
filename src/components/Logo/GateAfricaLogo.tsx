export default function GateAfricaLogo() {
  return (
    <div className="flex items-center">
      <div className="relative">
        {/* Logo container with shadow and border */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 py-2 rounded-lg shadow-lg border-2 border-white relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-transparent"></div>
          <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-full -translate-y-2 translate-x-2"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 bg-white/10 rounded-full translate-y-2 -translate-x-2"></div>

          {/* Main logo text */}
          <div className="relative z-10">
            <h1 className="text-lg font-black text-white drop-shadow-md tracking-tight leading-none">
              <span className="block text-center">Gate of Africa Magazine</span>
              <span className="block text-center text-xs font-bold text-yellow-100"></span>
              <span className="block text-center text-xs font-semibold text-yellow-200 tracking-wide"></span>
            </h1>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1 left-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
          </div>
          <div className="absolute bottom-1 right-1">
            <div className="w-1 h-1 bg-white rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Subtle outer glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg opacity-20 blur-sm -z-10"></div>
      </div>
    </div>
  );
}
