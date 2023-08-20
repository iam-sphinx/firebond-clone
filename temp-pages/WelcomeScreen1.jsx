
import RouteGuardAdmin from '@/utils/RouteGuardAdmin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

var name = 'user';
if (typeof window !== "undefined"){
const storedJsonData = localStorage.getItem('data');
const jsonData = JSON.parse(storedJsonData ?? '{}');
name = jsonData.name;
console.log(jsonData)
}

const WelcomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/WelcomeScreen1A');
    }, 3000); // delay for 3 seconds

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="min-h-screen bg-[#161b21] flex justify-center items-center relative overflow-hidden">
     
      <h1 className="font-generalsans font-light text-6xl text-white">
        
        Hello,{name}
      </h1>
      <div
        className="absolute top-[388px] left-[50%] translate-x-[-50%] bg-blend-color-dodge mix-blend-color-dodge w-[1193px] h-[1458px]"
        style={{
          background:
            "radial-gradient(58.37% 58.37% at 49.96% 44.14%, #19596A 0%, rgba(38, 38, 38, 0) 100%)",
        }}
      ></div>
    </div>
  );
};

export default RouteGuardAdmin(WelcomePage)

