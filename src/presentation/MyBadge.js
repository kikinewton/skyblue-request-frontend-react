import React from 'react'

const MyBadge = ({count}) => {
  return (
    <>
      <div style={{backgroundColor: "red", color: "#fff", borderRadius: "50%", 
        display: "flex", justifyContent: "center", alignItems: "center", width: "20px", height: "20px"}}>
        {count}
      </div>
    </>
  )
}

export default MyBadge