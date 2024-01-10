// import LandingNav from "@/components/custom/landing-nav";

// export default function Home() {
//   return (
//     <div>
//       <LandingNav />
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react"


function DashboardPage() {

  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/lists")
  })

  return (
    <div>
      
    </div>
  )
}


export default DashboardPage

