import SignOutButton from "@/components/SignOutButton";
import { Row, Stack } from "@/components/ui";
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
        {/* Mock navigation element with session info */}
        <Stack className="w-60 bg-gray-200">
          <div className="w-60 truncate">
            <p>NAVIGATION</p>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
          <SignOutButton />
        </Stack>
        <main className="grow">{children}</main>
      </Row>
    </section>
  );
}
