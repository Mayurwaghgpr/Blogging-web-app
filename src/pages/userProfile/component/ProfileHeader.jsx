import React from "react";

import { Link } from "react-router-dom";

import profileIcon from "/ProfOutlook.png";
import Follow from "../../../component/buttons/follow";
import { useDispatch, useSelector } from "react-redux";
import { setFollowInfo } from "../../../redux/slices/profileSlice";

const ProfileHeader = React.memo(({ profileId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userProfile } = useSelector((state) => state.profile);
  return (
    <div className="flex flex-col justify-evenly dark:bg-inherit dark:*:border-[#383838] dark:border-[#383838]  p-4 ">
      <div className="flex w-full justify-start items-center flex-col gap-2 sm:px-3">
        <div className="relative flex  h-full border-b p-2 py-5  w-full justify-start   items-basline   gap-5 sm:gap-9 border-inherit">
          <div>
            <div className="lg:min-w-[80px] lg:min-h-[80px] h-[70px] w-[70px]   ">
              <img
                className=" w-full h-full items-center  cursor-pointer rounded-full   object-cover object-top "
                src={
                  userProfile?.userImage
                    ? `${userProfile.userImage}`
                    : profileIcon
                }
                alt={userProfile?.username}
              />
            </div>
          </div>

          <div className="flex flex-col  justify-start  gap-3  h-full sm:text-lg text-xs ">
            <div className="flex justify-start items-center w-full   ">
              <div className="">
                <h1 className="lg:text-xl  text-sm font-medium">
                  {userProfile?.username}
                </h1>
                <span className=" font-light sm:text-md text-xs">he/him</span>
              </div>
            </div>
            <div className=" flex  gap-4 justify-start ">
              <button
                onClick={() =>
                  dispatch(
                    setFollowInfo({
                      Info: "Followers",
                      count: userProfile?.followersCount,
                    })
                  )
                }
                className="flex   justify-start  items-start h-full gap-1 "
              >
                <span>{userProfile?.followersCount}</span>
                <h1>Followers</h1>
              </button>
              <button
                onClick={() =>
                  dispatch(
                    setFollowInfo({
                      Info: "Following",
                      count: userProfile?.followingCount,
                    })
                  )
                }
                className="flex   justify-start  items-start h-full  gap-1   "
              >
                <span>{userProfile?.followingCount}</span>
                <h1>Following</h1>
              </button>
            </div>
            <div className="flex justify-start items-center ">
              <p className=" h-full break-words ">{userProfile?.userInfo}</p>
            </div>
          </div>

          {profileId === user?.id && (
            <Link
              to="/profileEditor"
              className=" absolute top-0 right-0  text-end text-sm   rounded-lg transition-colors duration-300 text-blue-600 my-2 mx-2"
            >
              Edite profile
            </Link>
          )}
        </div>
      </div>
      <div className="sm:px-3 font-normal flex justify-start items-center gap-4  text-gray-500 py-4 text-sm  min-h-10 h-full   ">
        {profileId !== user.id && (
          <Follow
            profileId={userProfile.id}
            className={`sm:w-[90px]  h-7 flex w-full  justify-center items-center  font-light   rounded-3xl bg-sky-300`}
          />
        )}
        {profileId !== user.id && (
          <button className=" bg-sky-300  w-9 h-9 text-xl rounded-full">
            <i className="bi bi-envelope"></i>
          </button>
        )}
      </div>
    </div>
  );
});

export default ProfileHeader;
