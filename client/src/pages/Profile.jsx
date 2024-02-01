import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({avatar:""});
  const [file, setFile] = useState();
  const [filePerc, setFilePerc] = useState();
  const [fileUploadError, setFileUploadError] = useState(false);
  console.log(formData);

  const fileRef = useRef(null);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (fil) => {
    const storage = getStorage(app);
    const fileName = new Date().getDate() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, fil);

    
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    }, (error) => {
      setFileUploadError(true);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, avatar: downloadURL });
      });
    });
  };
  const hadleInputs = (event = {});
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" className="flex flex-col gap-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="w-24 h-24 object-cover rounded-full my-2 self-center cursor-pointer"
        />
        <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">Error Image Upload</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span>{filePerc + "%"}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700 font-semibold">Image Upload Successfully</span>
            ) : null }
        </p>

        <input
          type="text"
          onChange={hadleInputs}
          className="border p-3 rounded-lg"
          placeholder="username"
          id="username"
        />
        <input
          type="email
        onChange={hadleInputs}"
          className="border p-3 rounded-lg"
          placeholder="email"
          id="email"
        />
        <input
          type="text"
          onChange={hadleInputs}
          className="border p-3 rounded-lg"
          placeholder="password"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between py-3">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sigin out</span>
      </div>
    </div>
  );
};

export default Profile;
