import React from 'react'

const Admin = () => {

  const fileUpload = (e) => {
   console.log(e.target.files[0])
  }

  const fileSubmit = (e) => {
    console.log(e);
  }

  return (
    <>
    <div>Admin</div>
    <input type="file" id="fileUpload" onChange={fileUpload}/>
    <button onClick={fileSubmit}>제출하기</button>
    </>
  )
}

export default Admin