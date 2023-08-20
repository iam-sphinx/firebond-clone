// import { IconType } from 'react-icons/fa';
import Button from './Button';
import { MdDone } from "react-icons/md";

import Image from 'next/image';
export const PlatformIconWithBox = (props)=> {
   
    return (
      
        
        <div className={`border-[#353B43] rounded-[10px] flex items-center justify-center ${props.BoxStyle}`}>
           
                 <props.Icon size={props.IconSize} color = {props.IconColor}/>
         
        </div>
       
       
    )
  }