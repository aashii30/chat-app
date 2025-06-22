import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSideBar = () => {

    const {selectedUser, messages} = useContext(ChatContext)
    const {logout, onlineUsers} = useContext(AuthContext)
    const [msgImages, setMsgImages] = useState([])

    // get all the images from the messages and set them to state 
    useEffect(()=>{
        setMsgImages(
            messages.filter(msg => msg.image).map(msg=>msg.image)
        )
    },[messages])

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll
    ${selectedUser ? "max-md:hidden" : ""}`}>

        <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
            <img src={selectedUser?.profilePic || assets.avatar_icon} alt="" 
            className='w-20 aspect-square rounded-full object-cover'/>
            <h1 className='text-lg font-medium flex items-center gap-2 whitespace-nowrap'>
               {onlineUsers.includes(selectedUser._id) &&  <p className='w-2 h-2 rounded-full bg-green-500'></p> }
                {selectedUser.fullName}
                </h1>
                <p className='text-xs font-light max-w-[80%] text-center px-4 '>{selectedUser.bio}</p>
        </div>

        <hr  className='border-[#ffffff50] my-4'/>

        <div className='px-5 text-sm'>
            <p>Media</p>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 max-h-[220px] overflow-y-auto'>
                {msgImages.map((url,index)=>(
                    <div key={index} onClick={()=> window.open(url)}
                    className='cursor-pointer rounded'>
                        <img src={url} alt="" className='w-full aspect-square object-cover rounded-md' />

                    </div>
                ))}

            </div>

        </div>

        <button onClick={()=> logout()}
        className='absolute bottom-5 left-1/2 transform -translate-x-1/2 
        bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none
        text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
            Logout
        </button>
       
    </div>
  )
}

export default RightSideBar