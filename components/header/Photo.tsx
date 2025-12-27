import Image from "next/image";

import classes from "./photo.module.css";

export default function Photo() {
   return (
      <div className={classes.card}>
         <Image
            src="https://wjbwobxiekyzfcjxjnkt.supabase.co/storage/v1/object/public/me/me.webp"
            alt="alt"
            fill={true}
            quality={75}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBgAAAAwAQCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA"
            className="rounded-md min-h-64 aspect-square"
         />
      </div>
   );
}
