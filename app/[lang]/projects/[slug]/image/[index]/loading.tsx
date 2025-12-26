import { LuLoaderCircle } from "react-icons/lu";

export default function FullPageImageLoading() {
   return (
      <div className="flex items-center justify-center w-full min-h-screen bg-black">
         <LuLoaderCircle size={64} className="animate-spin text-red-600" />
      </div>
   );
}
