
import Image from "next/image";
import Head from "next/head";
export default function BackGroundPage(props) {
  return (
   
        <>
   
            <div className={`flex items-center justify-center bg-[#171C23] min-h-screen ${props.className}`} >


               <Image src="/Icons/FIREBOND.svg" alt="My Image" width={500} height={500} className=" absolute top-10 w-[193px] h-[68.1px] m-auto" />

            </div>
          </>
  );
}
