import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLinkDashboard({
  reference,
  text,
}: {
  reference: string;
  text: string;
}) {
  const pathname = usePathname();

  if (pathname === reference) {
    return (
      <Link href={reference} className="px-2 underline underline-offset-8">
        {text}
      </Link>
    );
  } else {
    return (
      <Link href={reference} className="px-2 hover:underline hover:underline-offset-8">
        {text}
      </Link>
    );
  }
}
