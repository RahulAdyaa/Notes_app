import React,{useState} from 'react'
import {FaRegEye , FaRegEyeSlash} from "react-icons/fa6"

const PasswordInput = ({value , placeholder , onChange}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword=()=>{
        setIsShowPassword(!isShowPassword)
    }
  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3' >
        <input
        value={value}
        placeholder={placeholder || "Password"}
        onChange={onChange}
        type={isShowPassword ?"text":"password"}
        //Agar isShowPassword true hai, toh type="text" hoga (password dikhayega).
        //Agar false hai, toh type="password" hoga (password hide rahega)
        className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
         />

         {isShowPassword
         ?
         <FaRegEye
         size={22}
         className='text-blue-600'
         onClick={toggleShowPassword}
         />
         :
         <FaRegEyeSlash
         size={22}
         className='text-slate-400'
         onClick={toggleShowPassword}
         />}
         
    </div>
  )
}

export default PasswordInput