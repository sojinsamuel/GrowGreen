async function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-950  ">
      <div className="pt-20"></div>
      <div>{children}</div>
    </div>
  );
}

export default NewsLayout;
