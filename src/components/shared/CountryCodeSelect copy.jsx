// "use client";

// export default function CountryCodeSelect({ countries, value, onChange }) {

//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-18 px-2 py-1.5 border border-gray-300 rounded-sm bg-white text-sm focus:ring-2 focus:ring-[#3A9E75]"
//     >
//       <option value="">Code</option>

//       {countries?.map((c,i) => (
//         <option key={i} value={c?.phonecode}>
//     {c?.sortname} ({c?.phonecode})
//         </option>
//       ))}
//     </select>
//   );
// }
