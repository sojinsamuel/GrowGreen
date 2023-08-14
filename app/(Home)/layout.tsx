import Header from "@/components/ui/Header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-950 h-full overflow-hidden">
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </div>
  );
}
