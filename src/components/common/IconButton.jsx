export default function IconButton({
  text,
  onclick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
  size = "md",
  variant = "primary",
  loading = false,
  fullWidth = false,
  iconPosition = "right",
}) {
  // Mobile-responsive size variants
  const sizeClasses = {
    sm: "px-3 py-1.5 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium gap-x-1 sm:gap-x-1.5 min-h-[32px] sm:min-h-[36px]",
    md: "px-5 py-2 sm:px-5 sm:py-2 text-sm sm:text-base font-semibold gap-x-1.5 sm:gap-x-2 min-h-[40px] sm:min-h-[44px]",
    lg: "px-6 py-3 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold gap-x-2 sm:gap-x-2.5 min-h-[44px] sm:min-h-[48px]",
    xl: "px-8 py-4 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold gap-x-2 sm:gap-x-3 min-h-[48px] sm:min-h-[56px]",
  };

  // Color variants with better mobile contrast
  const colorVariants = {
    primary: outline
      ? "border-2 border-teal-400 bg-transparent text-teal-400 hover:bg-teal-400 hover:text-gray-900 focus:ring-teal-400/50 active:bg-teal-500 active:text-white"
      : "bg-gradient-to-r from-teal-400 to-teal-500 text-gray-900 hover:from-teal-500 hover:to-teal-600 focus:ring-teal-400/50 shadow-lg hover:shadow-teal-500/25 active:from-teal-600 active:to-teal-700",

    secondary: outline
      ? "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300/50 active:bg-gray-100"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300/50 active:bg-gray-300",

    success: outline
      ? "border-2 border-green-500 bg-transparent text-green-600 hover:bg-green-500 hover:text-white focus:ring-green-500/50 active:bg-green-600 active:text-white"
      : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500/50 shadow-lg hover:shadow-green-500/25 active:from-green-700 active:to-green-800",

    danger: outline
      ? "border-2 border-red-500 bg-transparent text-red-600 hover:bg-red-500 hover:text-white focus:ring-red-500/50 active:bg-red-600 active:text-white"
      : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500/50 shadow-lg hover:shadow-red-500/25 active:from-red-700 active:to-red-800",

    info: outline
      ? "border-2 border-blue-500 bg-transparent text-blue-600 hover:bg-blue-500 hover:text-white focus:ring-blue-500/50 active:bg-blue-600 active:text-white"
      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500/50 shadow-lg hover:shadow-blue-500/25 active:from-blue-700 active:to-blue-800",
  };

  // Base classes with mobile-first approach
  const baseClasses = `
    flex-1
    py-3 px-6
    relative
    inline-flex
    items-center
    justify-center
    rounded-lg
    font-poppins
    transition-all
    duration-200
    ease-in-out
    transform
    focus:outline-none
    focus:ring-2
    sm:focus:ring-4
    select-none
    touch-manipulation
    ${fullWidth ? "w-full" : ""}
    ${disabled || loading
      ? "cursor-not-allowed opacity-50 transform-none"
      : "cursor-pointer hover:scale-105 active:scale-95 sm:hover:shadow-lg"
    }
  `;

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${colorVariants[variant]}
    ${customClasses}
  `.replace(/\s+/g, ' ').trim();

  // Mobile-optimized loading spinner
  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-current border-t-transparent" />
  );

  // Content arrangement based on icon position with mobile considerations
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner />
          <span className="hidden xs:inline sm:inline">Loading...</span>
          <span className="inline xs:hidden sm:hidden" aria-label="Loading">⋯</span>
        </>
      );
    }

    if (!children) {
      return <span className="text-center leading-none">{text}</span>;
    }

    // Mobile: prioritize icon visibility, optionally hide text on very small screens
    if (iconPosition === "left") {
      return (
        <>
          <span className="flex-shrink-0 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5">
            {children}
          </span>
          {text && (
            <span className="truncate leading-none">
              <span className="hidden xs:inline">{text}</span>
              <span className="inline xs:hidden" title={text}>
                {text.length > 8 ? `${text.substring(0, 6)}...` : text}
              </span>
            </span>
          )}
        </>
      );
    }

    // Default: icon on right
    return (
      <>
        {text && (
          <span className="truncate leading-none">
            <span className="hidden xs:inline">{text}</span>
            <span className="inline xs:hidden" title={text}>
              {text.length > 8 ? `${text.substring(0, 6)}...` : text}
            </span>
          </span>
        )}
        <span className="flex-shrink-0 flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5">
          {children}
        </span>
      </>
    );
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={disabled || loading ? undefined : onclick}
      className={buttonClasses}
      type={type}
      aria-label={text || "Button"}
      // Mobile accessibility improvements
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {/* Touch-optimized ripple effect overlay */}
      <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-100" />
      </div>

      {/* Button content with improved mobile layout */}
      <div className="relative flex items-center justify-center w-full">
        {renderContent()}
      </div>
    </button>
  );
}