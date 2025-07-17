// "use client"
// import React, { useState } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../../../../components/ui/dialog";
// import { Input } from "../../../../../components/ui/input"
// import EmojiPicker from 'emoji-picker-react';
// import {db} from '../../../../..//utils/dbConfig';
// import { Budgets } from '../../../../../utils/schema';
// import { useUser } from '@clerk/nextjs';
// import { toast } from 'sonner';

 
// function CreateBudget() {

//   const[emojiIcon, setEmojiIcon]=useState( '😊');
//   const[openEmojiPicker,setOpenEmojiPicker]=useState(false)
//   const [name, setName] = useState('');
//   const [amount, setAmount] = useState('');

//   const {user}=useUser();
//   const onCreateBudget=async()=>{

    
//     const result=await db.insert(Budgets)
//     .values({
//       name:name,
//       amount:amount,
//       createdBy:user?.primaryEmailAddress?.emailAddress,
//       icon:emojiIcon
//     }).returning({insertedId:Budgets.id})

//     if(result){
//       toast("New Budget Created!")
//     }
//   }

//   return (
//     <div>
      
//   <Dialog>
//   <DialogTrigger asChild>
//     <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed
//       cursor-pointer hover:shadow-md'>
//       <h2 className='text-xl'>+</h2>
//       <h2>Create New Budget</h2>
//       </div>
//       </DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle className="text-2xl">Create New Budget</DialogTitle>
//       <DialogDescription>
//         {/* <Button variant="outline">{emojiIcon}</Button> */}

//   <div className='mt-4'>
//   <button 
//     className="px-4 py-2 border-2  text-gray-500 bg-transparent rounded-md cursor-pointer hover:bg-gray-200 transition-all text-lg"
//     onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
//   >
//     {emojiIcon}
//   </button>
  
//   {/* Conditionally render the EmojiPicker based on openEmojiPicker state */}
//   {openEmojiPicker && (
//     <div className='absolute'>
//       <EmojiPicker 
//          onEmojiClick={(e) => {
//          setEmojiIcon(e.emoji);
//          setOpenEmojiPicker(false);
//         }}
//       />

//     </div>
//   )}
// </div>

//        <div className='mt-3'>
//         <h2 className='text-black my-1 text-base'>Budget Name</h2>
//         <Input placeholder="e.g. Home Decor"
//         className="focus-visible:border-black focus-visible:ring-0"
//         onChange={(e)=>setName(e.target.value)}/>
//        </div>
//        <div className='mt-2'>
//         <h2 className='text-black my-1 text-base'>Budget Amount</h2>
//         <Input 
//         type="number"
//         placeholder="e.g. ₹5000"
//         className="focus-visible:border-black focus-visible:ring-0"
//         onChange={(e)=>setAmount(e.target.value)}
//         />
//        </div>
//        <div className="flex justify-end">
//        <button
//        onClick={onCreateBudget} 
//         className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
//          disabled={!name || !amount}
//         >
//         Create Budget
//         </button>
//         </div>


        
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>

//     </div>
//   )
// }

// export default CreateBudget




"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Input } from "../../../../../components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateBudget({refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useUser();

  const onCreateBudget = async () => {
    if (!name || !amount) return;

    try {
      const result = await db.insert(Budgets)
        .values({
          name:name,
          amount: parseFloat(amount),
          createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets.id });

      if (result?.length > 0) {
        refreshData()
        toast.success("New Budget Created!");
        setName("");
        setAmount("");
        setEmojiIcon("😊");
        setOpenEmojiPicker(false);
      } else {
        toast.error("Failed to create budget.");
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      toast.error("Error creating budget.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
            <h2 className="text-xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Create New Budget</DialogTitle>
            <DialogDescription>
              Add a name, amount, and emoji icon for your new budget.
            </DialogDescription>
          </DialogHeader>

          {/* Interactive content outside DialogDescription */}
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
              className="focus-visible:border-black focus-visible:ring-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label className="text-black my-1 text-base block">Budget Amount</label>
            <Input
              type="number"
              placeholder="e.g. ₹5000"
              className="focus-visible:border-black focus-visible:ring-0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onCreateBudget}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name || !amount}
            >
              Create Budget
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
