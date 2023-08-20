import RouteGuardAdmin from "@/utils/RouteGuardAdmin";
import { useRouter } from "next/router";
import { useEffect } from "react";

function WelcomeScreen1A() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/NewDashboard");
    }, 3000); // delay for 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#161B21] flex justify-center items-center relative overflow-hidden">
      <div className="text-center">
        <p className="font-generalsans font-extralight text-6xl mb-3">
          Welcome to <span className="text-[#FE702A]">firebond</span>
        </p>
        <p className="font-generalsans font-extralight text-[#A6A6A6] text-2xl">
          The Growth Platform for Web3
        </p>
      </div>
      <div
        className="absolute top-[388px]  left-[50%] translate-x-[-50%] bg-blend-color-dodge mix-blend-color-dodge w-[1193px] h-[1458px]"
        style={{
          background:
            "radial-gradient(58.37% 58.37% at 49.96% 44.14%, #19596A 0%, rgba(38, 38, 38, 0) 100%)",
        }}
      ></div>
    </div>
  );
}
export default RouteGuardAdmin(WelcomeScreen1A)