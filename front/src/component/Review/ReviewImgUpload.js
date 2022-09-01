import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewImgUpload = () => {
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "img/default_image.png",
  });

  let inputRef;

  const savaImage = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);

      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  // 업로드를 다시 하는 경우, 기존 이미지 URL 을 삭제
  const deleteImage = () => {
    URL.revokeObjectURL(image.preview_URL);
    setImage({
      image_file: "",
      preview_URL: "img/default_image.png",
    });
  };

  useEffect(() => {
    // 컴포넌트가 언마운트 될 때 createObjectURL을 통해 생성한 기존 URL 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, []);

  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData();
      formData.append("file", image.image_file);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
      await axios.post("http://localhost:3500/review-img", formData, config);
      alert("서버에 등록이 완료되었습니다.");
      setImage({
        image_file: "",
        preview_URL: "img/default_image.png",
      });
    } else {
      alert("사진을 등록하세요!");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={savaImage}
        onClick={(e) => (e.target.value = null)}
        ref={(refParam) => (inputRef = refParam)}
      />
       <div>
        <button type="primary" variant="contained" onClick={() => inputRef.click()}>
          Preview
        </button>
        <button color="error" variant="contained" onClick={deleteImage}>
          Delete
        </button>
        <button color="success" variant="contained" onClick={sendImageToServer}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default ReviewImgUpload;
