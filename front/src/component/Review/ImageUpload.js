import { useState } from 'react';

const ImageUpload = ({ imgId, isMultiple }) => {
  const [imgFile, setImgFile] = useState('');
  const [MainImgUrl, setMainImgUrl] = useState([]);
  const [detailImgs, setDetailImgs] = useState([]);
  console.log(detailImgs);
  const handleAttachedImg = (e) => {
    const file = e.target.files[0];
    const imgLists = e.target.files;

    let imgUrlLists = [...detailImgs];

    if (!isMultiple) {
      const currentImgUrl = URL.createObjectURL(file);

      setImgFile(file.name);
      setMainImgUrl(currentImgUrl);
      return;
    } else {
      setImgFile([...imgFile, file.name]);

      for (let i = 0; i < imgLists.length; i++) {
        const currentImgUrl = URL.createObjectURL(imgLists[i]);
        imgUrlLists.push(currentImgUrl);
      }

      if (imgUrlLists.length > 5) {
        imgUrlLists = imgUrlLists.slice(0, 5);
      }
      setDetailImgs(imgUrlLists);
    }
  };

  const handleRemoveFile = (id) => {
    setDetailImgs(detailImgs.filter((_, index) => index !== id));
    setImgFile('');
  };

  return (
    <div multiple={isMultiple}>
      <label htmlFor={imgId}>+ 이미지 첨부</label>

      <input
        type='file'
        id={imgId}
        accept='image/jpg, image/png, image/jpeg'
        onChange={handleAttachedImg}
        multiple={isMultiple}
      />

      {!isMultiple && imgFile && (
        <div>
          <p>{imgFile}</p>

          <button onClick={() => handleRemoveFile(imgId)}>X</button>
        </div>
      )}

      {isMultiple &&
        detailImgs.map((image, id) => (
          <div key={id}>
            <img src={image} alt={`${image}-${id}`} />

            <button onClick={() => handleRemoveFile(id)}>X</button>
          </div>
        ))}
    </div>
  );
};

export default ImageUpload;
