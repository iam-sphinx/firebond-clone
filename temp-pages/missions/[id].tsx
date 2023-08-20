import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import MissionForUser from '../MissionForUser';
import { type } from 'os';
import MissionUserAuthCard from '../MissionUserAuthCard';



let communityId:any;
export default function Id() {

    const router = useRouter();
    console.log("params->",router.query.id);
    const [missionDetails,setMissionDetails] = useState()
    const [invalidMissionId,setinvalidMissionId] = useState(false);
    const [loading,setloading] = useState(true);
    const [showMissionUser,setshowMissionUser] = useState(false);
    const [missionId,setmissionId] = useState(router.query.id);
    console.log("mission id->",router.query.id);

  // to be done-> whenever loading -> 404 -> page is showed when mission exist , so i had to solve this issue else everything
  //is fine.

    useEffect( ()=>{  
      iterateColumn();
      
      if(missionDetails===undefined){      
        missionNotFound();
      }
      else{
        setinvalidMissionId(false);
      }
    },[router.query.id])

    async function iterateColumn() {
      const { data, error } = await supabase
        .from('community_data')
        .select('missions');
    
      if (error) {
        console.error(error);
        return;
      }
      const { data:wholeData, error:newError } = await supabase
        .from('community_data')
        .select('*');
    
      if (newError) {
        console.error('error in fetching whole of the community data',error);
        return;
      }
      console.log('comm data->',wholeData);
      wholeData.forEach((val)=>{
   
        if(val.missions){
         
            val.missions.forEach((val2:any)=>{
             
              if(val2.mission_id!=null&&router.query.id==val2.mission_id){
                  // if there is a match then set the community id and then transfer it as a prop
                  communityId = val.id;
                  console.log('mission community->',communityId);
              }
        })
        }
  
       })
      
     data.forEach((val)=>{
   
      if(val.missions){
       
          val.missions.forEach((val2:any)=>{
           
            if(val2.mission_id!=null&&router.query.id==val2.mission_id){
                setMissionDetails(val2);
                setinvalidMissionId(false);
            }
      })
      }

     })
     
     
     setloading(false);
    }
    function missionNotFound(){
      setinvalidMissionId(true);
      console.log("mission not found");  
    }

    if(loading){
      return (
        <div>Loading......</div>
      )
    }

   if(invalidMissionId){
    return (
      <div>404</div>
    )
   }

    
   console.log(missionDetails);
   router.push({
    pathname: '/MissionViewPageForUser',
    query: {
      myData: JSON.stringify(missionDetails),
     }
  },)
  // if(!showMissionUser){
    return (
      <div>correct mission id hence redirecting.....</div>
      // <MissionUserAuthCard communityId = {communityId} missionDetails={missionDetails}/>
    )
  // }
  // return (
    
    // <div>
    //   {/* {missionDetails==null?<div className='text-white'>Mission Not found</div>:<MissionForUser/>} */}
    //   {/* after mission is found have to display things here */}
    //   <MissionForUser missionDetails ={missionDetails} communityId = {communityId}/>
    // </div>
  // )
}
