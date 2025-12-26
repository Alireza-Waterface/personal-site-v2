import { LuLoaderCircle } from "react-icons/lu";

export default function ModalLoading() {
   return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
         <div className="flex flex-col items-center gap-4 text-white">
            <LuLoaderCircle size={48} className="animate-spin text-red-600" />
            <p className="text-sm font-medium opacity-80">Loading Image...</p>
         </div>
      </div>
   );
}
