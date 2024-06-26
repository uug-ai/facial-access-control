import Navigation from "@/components/Navigation";
import { Row } from "@/components/ui";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Row>
      <Navigation />
      <main className="grow">{children}</main>
    </Row>
  );
}
