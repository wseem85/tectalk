export default function DashboardLayout({
  side,
  children,
}: {
  side: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row ">
      <div className="flex-none md:w-64">{side}</div>

      <div className="flex-grow p-6  md:p-12">{children}</div>
    </div>
  );
}
