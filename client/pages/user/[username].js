import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserPostContext } from "../../context/userPostContext";
import { useAuthenticationContext } from "../../context/authenticationContext";
import useSWR from "swr";
import Axios from "axios";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { BiComment, BiDotsVerticalRounded } from "react-icons/bi";

const fetcher = (url) =>
  Axios.get(url, { withCredentials: true }).then((res) => res.data);

function Username() {
  const router = useRouter();
  const { currentUser } = useAuthenticationContext();

  const [allPosts, setAllPosts] = useState();

  const { data, error } = useSWR(
    `http://localhost:8080/${currentUser?.username}/posts/`,
    fetcher
  );

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (data) {
      setAllPosts(data);
    }
  }, [data]);

  console.log(allPosts);

  return (
    <div className="mx-auto mt-20 flex max-w-5xl items-center justify-center dark:text-whiteColor">
      <div className="flex flex-col items-center md:grid md:grid-cols-2 md:items-start md:space-x-44">
        <div className="order-last flex flex-col items-center justify-start space-y-5 md:order-first  ">
          {allPosts?.map((post) => {
            const { title, content, createdAt } = post;
            return (
              <div
                key={post.id}
                className="flex w-96  max-h-80 flex-col space-y-4 rounded-md border border-lightDark border-opacity-10 px-5 py-4 shadow dark:border-opacity-50"
              >
                <div className="flex items-center justify-between ">
                  <div className="flex items-center justify-between space-x-2">
                    <img
                      src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                      alt="default"
                      className="w-10 rounded-full"
                    />
                    <p>{currentUser.username}</p>
                  </div>

                  <p>{new Date(createdAt).toLocaleString()}</p>

                  <button className="text-2xl font-semibold  ">
                    <BiDotsVerticalRounded />
                  </button>
                </div>
                <div className="flex flex-col pb-3">
                  <p className="text-lg font-bold">{title}</p>
                  <p>{content}</p>
                </div>
                <div className="mt-10 flex items-center justify-center space-x-36  ">
                  <button className="text-3xl font-semibold text-pinkColor ">
                    <HiOutlineHeart />
                  </button>
                  <button className="text-3xl font-semibold text-lightTealColor ">
                    <BiComment />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-9 flex h-fit w-72 max-w-sm flex-col items-center space-y-3 rounded-lg border  border-lightDark border-opacity-10 px-8 py-6 shadow dark:border-opacity-50 md:mb-0">
          <img
            src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
            alt="default"
            className="w-32 rounded-full"
          />
          <div className="flex h-auto  flex-col items-center space-y-3 rounded-md p-1 ">
            <p className="text-lg font-bold text-lightTealColor">
              @{currentUser?.username}
            </p>
            <div className="flex items-center justify-evenly">
              <div className="flex items-center justify-around space-x-8">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-medium">Post</p>
                  <p>12</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-medium">Followers</p>
                  <p>43</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-medium">Following</p>
                  <p>67</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button className="text-md text-darkColor  rounded-md border-darkColor bg-lightTealColor px-3 py-2 font-semibold  shadow">
              Follow
            </button>
          </div>

          <div>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Username;
