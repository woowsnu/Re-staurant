import React, { useState } from 'react'
import axios from '../../api/axios'

const ImageUpload = () => {
    const [state, setState] = useState({file : ""})
    const saveImage = (e) => {
        let file = e.target.files[0]
        setState({file: file})
        // console.log(e.target.files)
        console.log(e.target.files[0])
        console.log(file)
    }

    const uploadImage = (e) => {
        let file = state.file;
        console.log(file);
        let formData = new FormData();
        formData.append('file', state.file[0]);
        axios.post("http://localhost:3500/profile-img", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }});
        console.log(formData)
    }

  return (
    <div>
        <form>
            <label>파일을 선택해주세요</label>
            <input type="file" name="profilepic" onChange={saveImage}/>

        </form>
        <button onClick={uploadImage}>이미지 업로드</button>
    </div>

  )
}

export default ImageUpload