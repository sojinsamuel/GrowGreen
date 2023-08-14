"use client";
//@ts-ignore

function MyCart({ seedList }) {
  return (
    <>
      <h3 className="text-lg font-extrabold my-5">Buy Seeds from Amazon</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
        {seedList.map((item: any) => (
          <a
            target="_blank"
            key={item.pos}
            href={`https://amazon.in${item.url}`}
            className="border rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out"
          >
            <div className="border-b p-5 flex-1">
              <p className="text-[#1B66D2]">{item.title}</p>
            </div>
            <div className="px-4 py-2 not-italic">
              <p className="font-light">
                {item.price} {item.currency}
              </p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default MyCart;
