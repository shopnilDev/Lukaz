// // components/Banner.js
// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";

// const TopBanner = () => {
//   // Demo data
//   const bannerData = {
//     title: "INTERNATIONAL ORDER ",
//     subtitle: "AVAILABLE",
//     buttonText: "Shop Now",
//     buttonLink: "/international-shop",
//     backgroundImage: "/images/banner/b1.png", // put a demo image in public/images
//   };

//   return (
//     <section className="relative w-full h-[70vh] md:h-[60vh] flex items-center justify-center text-center bg-gray-100 overflow-hidden">
//       <Image
//         src={bannerData.backgroundImage}
//         alt="Banner Background"
//         fill
//         className="object-cover object-center z-0"
//       />
//       <div className="absolute inset-0 bg-black/40 z-10"></div>
//       <div className="relative z-20 px-4 md:px-8 text-white max-w-3xl">
//         <h1 className="text-3xl md:text-5xl font-bold mb-4 ">
//           {bannerData.title}
//         </h1>
//         <p className="text-lg md:text-2xl mb-6">{bannerData.subtitle}</p>
//         <Link
//           href={bannerData.buttonLink}
//           className="inline-block border border-white hover:bg-[#3A9E75] hover:border-[#3A9E75] text-white font-semibold py-3 px-6 rounded-md transition"
//         >
//           {bannerData.buttonText}
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default TopBanner;
