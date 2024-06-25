import Navigation from "@/components/Navigation";
import SignOutButton from "@/components/SignOutButton";
import { Row, Stack } from "../../components/ui";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <section>
      <Row>
        <Navigation />
        <main className="grow">{children}</main>
      </Row>
    </section>
  );
}
