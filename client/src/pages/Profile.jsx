import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  deleteUserRequest,
  deleteUserSuccess,
  signoutUserFail,
  signoutUserRequest,
  signoutUserSuccess,
  updateUserFail,
  updateUserRequest,
  updateUserSuccess,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatar: currentUser.avatar,
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });
  const [file, setFile] = useState();
  const [filePerc, setFilePerc] = useState();
  const [fileUploadError, setFileUploadError] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);

  const fileRef = useRef(null);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
    if (!currentUser) {
      navigate("/signIn");
    }
  }, [file, currentUser]);
  const handleFileUpload = (fil) => {
    const storage = getStorage(app);
    const fileName = new Date().getDate() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, fil);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const hadleInputs = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };
  const update = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserRequest());
      const res = await fetch(`/api/auth/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFail(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setSuccessUpdate(true);
    } catch (error) {
      console.log(error);
      dispatch(updateUserFail(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserRequest());
      const res = await fetch(`/api/auth/deleteuser/${currentUser._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        dispatch(deleteUserSuccess());
        return;
      }
      dispatch(deleteUserFail(data.message));
    } catch (error) {
      dispatch(deleteUserFail(data.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutUserRequest());
      const res = await fetch("/api/auth/signOut", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutUserFail(data.message));
        return;
      }
      dispatch(signoutUserSuccess());
    } catch (error) {
      console.error("Error occurred during signout:", error);
      dispatch(signoutUserFail("An error occurred during signout."));
    }
  };

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
            <span className="text-green-700 font-semibold">
              Image Upload Successfully
            </span>
          ) : null}
        </p>

        <input
          type="text"
          onChange={hadleInputs}
          className="border p-3 rounded-lg"
          placeholder="username"
          value={formData.username}
          id="username"
        />
        <input
          type="email"
          onChange={hadleInputs}
          className="border p-3 rounded-lg"
          placeholder="email"
          id="email"
          value={formData.email}
        />
        <input
          type="password"
          onChange={hadleInputs}
          className="border p-3 rounded-lg"
          placeholder="password"
          id="password"
        />
        <button
          disabled={loading}
          onClick={update}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between py-3">
        <button
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </button>
        <button onClick={handleSignout} className="text-red-700 cursor-pointer">
          Sign out
        </button>
      </div>
      {/* {error && error ? (
        <p className="text-red-800 text-center">{error}</p>
      ) : (
        ""
      )}
      {successUpdate ? (
        <p className="text-green-500 text-center font-semibold">
          User Successfully Updated!
        </p>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Profile;
