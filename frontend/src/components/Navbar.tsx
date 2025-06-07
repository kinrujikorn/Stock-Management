// export default function Navbar() {
//   return (
//     <nav className="bg-white text-black font-semibold px-6 py-4 flex justify-between items-center">
//       <ul>
//         <li className="flex space-x-20">
//           <a href="/">Lovely Home</a>
//         </li>
//       </ul>
//       <ul>
//         <li className="flex space-x-20">
//           <a href="/products">Management & Finance</a>
//           {/* <a href="/finance">Finance</a> */}
//         </li>
//       </ul>
//     </nav>
//   );
// }

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white text-black  shadow-lg">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Lovely Store</h1>
        </div>
        <ul className="space-y-4">
          <li>
            <a
              href="/"
              className="block p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Lovely Home Product
            </a>
          </li>
          <li>
            <a
              href="/products"
              className="block p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Management & Finance
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
