import React from "react"
import Image from "next/image"

const MainSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full relative bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Logo */}
      <div className="z-10 flex items-center justify-center">
        <Image
          src="/going.png"
          alt="Logo"
          width={100}
          height={100}
          className="object-contain animate-pulse"
        />
      </div>
    </div>
  )
}

export default MainSpinner
