import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import MissionForUser from '../MissionForUser';
import { type } from 'os';
import UserAuthCard from '../UserAuthCard';




export default function CommunityId() {
    const router = useRouter();
    console.log("params->",router.query.communityId);
    const [missionDetails,setMissionDetails] = useState()
    const [invalidCommunityId,setinvalidCommunityId] = useState(false);
    const [loading,setloading] = useState(true);
   
    const [missionId,setmissionId] = useState(router.query.communityId);
    console.log("mission id->",router.query.communityId);

    useEffect(  () => {  
     if(router.query.communityId!=undefined)
      checkRowExists('community_data',Number(router.query.communityId));
    },[router.query.communityId])

    const checkRowExists = async (table:any, id:number) => {
        const { data, error } = await supabase
          .from(table)
          .select('id')
          .eq('id', id)
          
      
        if (error) {
          setinvalidCommunityId(true);
          console.error('Error checking row existence:', error);
          setloading(false);
          return ;
        }
        console.log("data->",data);
        if(data.length > 0){
            console.log('valid id');
            setinvalidCommunityId(false);
        }
        else{
            console.log('invalid id');
            setinvalidCommunityId(true);
        }
        setloading(false);
      };
  

    if(loading){
      return (
        <div>Loading......</div>
      )
    }

   if(invalidCommunityId){
    return (
      <div>404 invalid community</div>
    )
   }
    

  return (

    <div>
     
      <UserAuthCard communityId = {router.query.communityId}/>
    </div>
  )
}
