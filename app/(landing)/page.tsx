// import LandingNav from "@/components/custom/landing-nav";

// export default function Home() {
//   return (
//     <div>
//       <LandingNav />
//     </div>
//   );
// }

"use client";

import LandingNav from "@/components/custom/landing-nav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/lists");
  }, [router]);

  return <div><LandingNav /></div>;
}

export default DashboardPage;
