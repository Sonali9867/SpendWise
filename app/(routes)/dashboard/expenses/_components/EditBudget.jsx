// "use client";
// import React, { useEffect, useState } from "react";
// import { PenBox } from "lucide-react";
// import { Button } from "../../../../../components/ui/button";
// import { Input } from "../../../../../components/ui/input";
// import EmojiPicker from "emoji-picker-react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../../../../components/ui/dialog";
// import { Budgets } from "../../../../../utils/schema";

// function EditBudget({budgetInfo,refreshData}) {
//   const [emojiIcon, setEmojiIcon] = useState(budgetInfo.icon);
//   const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
//   const [name, setName] = useState();
//   const [amount, setAmount] = useState();
//   const { user } = useUser();

//   useEffect(()=>{
//     if(budgetInfo){
//         setEmojiIcon(budgetInfo?.icon)
//         setAmount(budgetInfo.amount)
//         setName(budgetInfo.name)
//     }  
//   },[budgetInfo])

//   const onUpdateBudget=async()=>{
//         const result= await db.update(Budgets).set({
//           name:name,
//           amount:amount,
//           icon:emojiIcon,
//         }).where(eq(Budgets.id,budgetInfo.id))
//         .returning();

//         if(result){
//           refreshData();
//           toast("Budget Updated!")
//         }
//   }

//   return (
//     <div>
     

//       <Dialog>
//         <DialogTrigger asChild>
//          <Button className="flex gap-2"><PenBox/>Edit</Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-2xl">Update New Budget</DialogTitle>
//             <DialogDescription>
//               Add a name, amount, and emoji icon for your new budget.
//             </DialogDescription>
//           </DialogHeader>

//           {/* Interactive content outside DialogDescription */}
//           <div className="mt-4">
//             <button
//               className="px-4 py-2 border-2 text-gray-500 bg-transparent rounded-md cursor-pointer hover:bg-gray-200 transition-all text-lg"
//               onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
//             >
//               {emojiIcon}
//             </button>
//             {openEmojiPicker && (
//               <div className="absolute z-10">
//                 <EmojiPicker
//                   onEmojiClick={(e) => {
//                     setEmojiIcon(e.emoji);
//                     setOpenEmojiPicker(false);
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="mt-3">
//             <label className="text-black my-1 text-base block">Budget Name</label>
//             <Input
//               placeholder="e.g. Home Decor"
//               defaultValue={budgetInfo?.name}
//               className="focus-visible:border-black focus-visible:ring-0"
              
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="mt-2">
//             <label className="text-black my-1 text-base block">Budget Amount</label>
//             <Input
//               type="number"
//               placeholder="e.g. ₹5000"
//               className="focus-visible:border-black focus-visible:ring-0"
//               defaultValue={budgetInfo?.amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               onClick={onUpdateBudget}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={!name || !amount}
              
//             >
//               Update Budget
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default EditBudget



// "use client";
// import React, { useEffect, useState } from "react";
// import { PenBox } from "lucide-react";
// import { Button } from "../../../../../components/ui/button";
// import { Input } from "../../../../../components/ui/input";
// import EmojiPicker from "emoji-picker-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../../../../components/ui/dialog";

// import { useUser } from "@clerk/nextjs";
// import { db } from "../../../../../utils/dbConfig";
// import { eq } from "drizzle-orm";
// import { toast } from "sonner";
// import { Budgets } from "../../../../../utils/schema";

// function EditBudget({ budgetInfo, refreshData }) {
//   const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || "💰");
//   const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
//   const [name, setName] = useState(budgetInfo?.name || "");
//   const [amount, setAmount] = useState(budgetInfo?.amount || 0);
//   const { user } = useUser();

//   useEffect(() => {
//     if (budgetInfo) {
//       setEmojiIcon(budgetInfo.icon || "💰");
//       setName(budgetInfo.name || "");
//       setAmount(budgetInfo.amount || 0);
//     }
//   }, [budgetInfo]);

//   const onUpdateBudget = async () => {
//     const result = await db
//       .update(Budgets)
//       .set({
//         name,
//         amount,
//         icon: emojiIcon,
//       })
//       .where(eq(Budgets.id, budgetInfo.id))
//       .returning();

//     if (result) {
//       refreshData();
//       toast("Budget Updated!");
//     }
//   };

//   return (
//     <div>
//       <Dialog>
//         <DialogTrigger asChild>
//           <Button className="flex gap-2">
//             <PenBox /> Edit
//           </Button>
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-2xl">Update Budget</DialogTitle>
//             <DialogDescription>
//               Edit name, amount, and emoji icon of your budget.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="mt-4">
//             <button
//               className="px-4 py-2 border-2 text-gray-500 bg-transparent rounded-md cursor-pointer hover:bg-gray-200 transition-all text-lg"
//               onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
//             >
//               {emojiIcon}
//             </button>
//             {openEmojiPicker && (
//               <div className="absolute z-10">
//                 <EmojiPicker
//                   onEmojiClick={(e) => {
//                     setEmojiIcon(e.emoji);
//                     setOpenEmojiPicker(false);
//                   }}
//                 />
//               </div>
//             )}
//           </div>

//           <div className="mt-3">
//             <label className="text-black my-1 text-base block">Budget Name</label>
//             <Input
//               placeholder="e.g. Home Decor"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="focus-visible:border-black focus-visible:ring-0"
//             />
//           </div>
//           <div className="mt-2">
//             <label className="text-black my-1 text-base block">Budget Amount</label>
//             <Input
//               type="number"
//               placeholder="e.g. ₹5000"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="focus-visible:border-black focus-visible:ring-0"
//             />
//           </div>
//           <div className="flex justify-end">
//             <button
//               onClick={onUpdateBudget}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={!name || !amount}
//             >
//               Update Budget
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default EditBudget;

"use client";
import React, { useEffect, useState } from "react";
import { PenBox } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import EmojiPicker from "emoji-picker-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";

import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../utils/dbConfig";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { Budgets } from "../../../../../utils/schema";

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo.icon || "💰");
      setName(budgetInfo.name || "");
      setAmount(budgetInfo.amount?.toString() || "");
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    if (!name.trim() || isNaN(parseFloat(amount))) {
      toast.error("Please enter a valid name and amount.");
      return;
    }

    try {
      const result = await db
        .update(Budgets)
        .set({
          name: name.trim(),
          amount: parseFloat(amount),
          icon: emojiIcon,
        })
        .where(eq(Budgets.id, budgetInfo.id))
        .returning();

      if (result?.length > 0) {
        refreshData();
        toast.success("Budget Updated!");
      } else {
        toast.error("Failed to update budget.");
      }
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Error updating budget.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Update Budget</DialogTitle>
            <DialogDescription>
              Edit name, amount, and emoji icon of your budget.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <button
              className="px-4 py-2 border-2 text-gray-500 bg-transparent rounded-md cursor-pointer hover:bg-gray-200 transition-all text-lg"
              onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
            >
              {emojiIcon}
            </button>
            {openEmojiPicker && (
              <div className="absolute z-10">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
            )}
          </div>

          <div className="mt-3">
            <label className="text-black my-1 text-base block">Budget Name</label>
            <Input
              placeholder="e.g. Home Decor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus-visible:border-black focus-visible:ring-0"
            />
          </div>
          <div className="mt-2">
            <label className="text-black my-1 text-base block">Budget Amount</label>
            <Input
              type="number"
              placeholder="e.g. ₹5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus-visible:border-black focus-visible:ring-0"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onUpdateBudget}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name.trim() || !amount}
            >
              Update Budget
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;


