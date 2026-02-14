  export const getColorClass = (color) => {
    switch (color) {
      case "white":
        return "bg-white border border-gray-300"
      case "black":
        return "bg-black"
      case "blue":
        return "bg-blue-500"
      case "red":
        return "bg-red-500"
      case "brown":
        return "bg-amber-800"
      case "gray":
        return "bg-gray-500"
      case "green":
        return "bg-green-500"
      case "navy":
        return "bg-blue-800"
      case "light-blue":
        return "bg-sky-300" // Custom color for the shoe in the image
      case "orange":
        return "bg-orange-500"
      case "beige":
        return "bg-amber-200"
      case "dark-wash":
        return "bg-blue-900"
      case "light-wash":
        return "bg-blue-300"
      default:
        return "bg-gray-200" // Fallback for unknown colors
    }
  }