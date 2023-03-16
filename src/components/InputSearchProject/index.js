import React from 'react'

const InputSearchProject = ({name,placeholder,type,width,height}) =>{

    const input = {

        background:"white",
        border:"none",
        height:"45px",
        width:"290px",
        borderRadius:"60px",
        outline:"none",
        paddingLeft:"50px",
        border:"1.9px solid #d7d7d7"
    }

    const column1 = {

        display:"flex",
        position:"relative",
    }


    return(
        
        <div style={column1}>
        
          <div style={{position:'absolute',left:"15px",top:"6px"}}>
          <svg style={{cursor: 'pointer'}} width="30" height="25" viewBox="2 -2 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.16667 16.4798C12.8486 16.4798 15.8333 13.4951 15.8333 9.81315C15.8333 6.13125 12.8486 3.14648 9.16667 3.14648C5.48477 3.14648 2.5 6.13125 2.5 9.81315C2.5 13.4951 5.48477 16.4798 9.16667 16.4798Z" stroke="#1172EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.5 18.1465L13.875 14.5215" stroke="#1172EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </div>

          

        <input className="inputLogin" maxLength={100} type={type} placeholder={placeholder} style={input}/>
        </div>
    )

}

export default InputSearchProject