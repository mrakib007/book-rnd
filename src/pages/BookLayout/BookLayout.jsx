import Controls from "./Controls";

const BookLayout = () => {
   return (
      <div className="h-screen w-screen grid grid-rows-12">
         <div className="bg-red-500 row-span-10 h-full">a</div>
         <div className="bg-blue-500 row-span-1 h-full">b</div>
         <div className="row-span-1 bg-[#FFDFCD] h-full">
            <Controls/>
         </div>
      </div>
   );
};

export default BookLayout;
