import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";
var wallet_id: null;
async function checkwalletidIndb(wallet_id:any) {
  if (wallet_id != null) {
    const { data, error } = await supabase
      .from("community_data")
      .select("*")
      .eq("walletid", wallet_id); 
    if (error != null)
    wallet_id=null
    if (data == null) wallet_id = null;
    if (data != null && data.length == 0) wallet_id = null;
  }
}
const  RouteGuardAdmin = (WrappedComponent: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedJsonData = localStorage.getItem("data");
        const jsonData = JSON.parse(storedJsonData ?? "{}");
        wallet_id = jsonData.wallet_id;
      }
      checkwalletidIndb(wallet_id)
      console.log("shit")
      console.log(wallet_id)
      if (!wallet_id) {
        router.push("/LoginSection");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  if (WrappedComponent.getServerSideProps) {
    Auth.getServerSideProps = WrappedComponent.getServerSideProps;
  }

  return Auth;
};

export default RouteGuardAdmin;
