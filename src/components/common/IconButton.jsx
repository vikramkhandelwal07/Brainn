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
  // Size variants
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm font-medium gap-x-1.5",
    md: "px-5 py-2 text-base font-semibold gap-x-2",
    lg: "px-6 py-3 text-lg font-semibold gap-x-2.5",
    xl: "px-8 py-4 text-xl font-bold gap-x-3",
  };

  // Color variants
  const colorVariants = {
    primary: outline
      ? "border-2 border-yellow-400 bg-transparent text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 focus:ring-yellow-400/50"
      : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600 focus:ring-yellow-400/50 shadow-lg hover:shadow-yellow-500/25",

    secondary: outline
      ? "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-300/50"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300/50",

    success: outline
      ? "border-2 border-green-500 bg-transparent text-green-600 hover:bg-green-500 hover:text-white focus:ring-green-500/50"
      : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500/50 shadow-lg hover:shadow-green-500/25",

    danger: outline
      ? "border-2 border-red-500 bg-transparent text-red-600 hover:bg-red-500 hover:text-white focus:ring-red-500/50"
      : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500/50 shadow-lg hover:shadow-red-500/25",

    info: outline
      ? "border-2 border-blue-500 bg-transparent text-blue-600 hover:bg-blue-500 hover:text-white focus:ring-blue-500/50"
      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-blue-500/50 shadow-lg hover:shadow-blue-500/25",
  };

  // Base classes
  const baseClasses = `
    relative
    inline-flex
    items-center
    justify-center
    rounded-lg
    font-poppins
    transition-all
    duration-300
    ease-in-out
    transform
    focus:outline-none
    focus:ring-4
    active:scale-95
    ${fullWidth ? "w-full" : ""}
    ${disabled || loading
      ? "cursor-not-allowed opacity-50 transform-none"
      : "cursor-pointer hover:scale-105 hover:shadow-lg"
    }
  `;

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${colorVariants[variant]}
    ${customClasses}
  `.replace(/\s+/g, ' ').trim();

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
  );

  // Content arrangement based on icon position
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner />
          <span>Loading...</span>
        </>
      );
    }

    if (!children) {
      return <span>{text}</span>;
    }

    if (iconPosition === "left") {
      return (
        <>
          <span className="flex-shrink-0">{children}</span>
          {text && <span>{text}</span>}
        </>
      );
    }

    // Default: icon on right
    return (
      <>
        {text && <span>{text}</span>}
        <span className="flex-shrink-0">{children}</span>
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
    >
      {/* Ripple effect overlay */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
      </div>

      {/* Button content */}
      <div className="relative flex items-center justify-center">
        {renderContent()}
      </div>
    </button>
  );
}