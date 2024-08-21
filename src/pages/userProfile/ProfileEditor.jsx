import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setuserProfile } from "../../redux/slices/profileSlice";
import profileIcon from "/ProfOutlook.png";
import ProfilImage from "../../component/ProfileButton";
import { setUser } from "../../redux/slices/authSlice";
import { useMutation, useQueryClient } from "react-query";
import { setToast } from "../../redux/slices/uiSlice";
import { debounce } from "../../utils/debounce";
import useProfileApi from "../../Apis/ProfileApis";

function ProfileEditor() {
  const { user } = useSelector((state) => state.auth);
  const [newInfo, setNewInfo] = useState(user);

  const [ProfileImage, SetProfileImage] = useState();
  const { EditeUserProfile } = useProfileApi();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  console.log(newInfo);
  const { isLoading, isError, mutate } = useMutation(
    (profileUpdated) => EditeUserProfile(profileUpdated),
    {
      onSuccess: () => {
        dispatch(
          setToast({
            message: "Profile updated successfully !",
            type: "success",
          })
        );
        queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
      },
    }
  );
  useEffect(() => {
    setNewInfo(user);
  }, [user]);

  useMemo(() => {
    if (newInfo?.removeImage) {
      SetProfileImage(profileIcon);
    } else if (newInfo.NewImageFile) {
      SetProfileImage(URL.createObjectURL(newInfo.NewImageFile));
    } else if (newInfo?.userImage !== null) {
      SetProfileImage(`${import.meta.env.VITE_BASE_URL}/${newInfo?.userImage}`);
    } else {
      SetProfileImage(profileIcon);
    }
  }, [newInfo?.removeImage, newInfo.NewImageFile, newInfo?.userImage]);

  // Handle input changes
  const handleChange = debounce((event) => {
    const { name, value, files } = event.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setNewInfo((prev) => ({
        ...prev,
        NewImageFile: file,
      }));
      event.target.value = "";
    } else {
      setNewInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, 600);

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  const RemoveSelecteImage = () => {
    if (newInfo.userImage && newInfo.NewImageFile) {
      delete newInfo.NewImageFile;
      setNewInfo((prev) => ({
        ...prev,
      }));
    } else {
      setNewInfo((prev) => ({ ...prev, removeImage: true }));
    }
  };
  // console.log(newInfo);
  return (
    <div className=" relative flex h-screen justify-center items-start dark:*:border-[#0f0f0f]">
      <article className=" w-full   flex flex-col max-w-[700px] mt-[70px] shadow-xl  rounded-xl px-4  border-inherit  gap-6 sm:text-sm text-xs">
        <h1 className="w-full text-center text-2xl p-2  bg-inherit  ">
          User Information
        </h1>
        <div
          className=" flex justify-start gap-3   w-full  font-light border-inherit "
          aria-label="Upload profile picture"
        >
          <div className="flex flex-col  min-w-28 px-2 ">
            <label htmlFor="">Profile image</label>
            <img
              onClick={triggerFileInput}
              className="sm:h-[100px]   sm:w-[100px] w-20 h-20 cursor-pointer object-cover object-top rounded-full p-1"
              src={ProfileImage}
              alt="Profile"
            />
            <div className="w-full">
              <input
                className="w-full p-3 bg-inherit  border border-inherit"
                id="fileInput"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <div className="py-1">
              <button
                className="rounded-xl text-md font-light text-red-500 px-2 flex gap-2"
                onClick={() =>
                  (newInfo?.userImage !== null || newInfo?.NewImageFile) &&
                  RemoveSelecteImage()
                }
              >
                <i className="bi bi-trash3"></i>
                Remove
              </button>
            </div>
            <p className="text-start  break-words font-light ">
              Importent: Insert image in JPG,JPEG,PNG format and high quality
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full items-end h-full  font-light  dark:*:border-[#383838] gap-2">
          <div className="w-full flex flex-col gap-3">
            <label className=" px-2" htmlFor="username">
              User Name
            </label>
            <input
              maxLength={50}
              className="w-full p-3  bg-inherit  border border-inherit rounded-lg"
              type="text"
              name="username"
              defaultValue={newInfo?.username}
              onChange={handleChange}
            />
            <span className=" flex justify-end">
              {newInfo?.username?.length}/50
            </span>
          </div>
          <div className="w-full flex flex-col gap-3">
            <label className=" px-2" htmlFor="email">
              Email
            </label>
            <input
              maxLength={30}
              className="w-full p-3  bg-inherit  border border-inherit rounded-lg"
              type="text"
              name="email"
              defaultValue={newInfo?.email}
              onChange={handleChange}
            />
            <span className=" flex justify-end">
              {newInfo?.email?.length}/30
            </span>
          </div>

          <div className="w-full flex flex-col gap-3">
            <label className=" px-2" htmlFor="userInfo">
              Bio
            </label>
            <input
              maxLength={30}
              className="w-full p-3  bg-inherit  border border-inherit rounded-lg"
              type="text"
              name="userInfo"
              id="userInfo"
              placeholder="About you"
              onChange={handleChange}
              defaultValue={newInfo?.userInfo}
            />
            <span className=" flex justify-end">
              {newInfo?.userInfo?.length}/100
            </span>
          </div>
          <div className="mt-5 py-2">
            <button
              className={`px-4 py-1 rounded-xl border border-sky-300`}
              onClick={() => mutate(newInfo)}
            >
              {isLoading ? "Updating..." : "Save"}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ProfileEditor;
