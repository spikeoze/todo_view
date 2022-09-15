import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthenticationContext } from "../../context/authenticationContext";
import useSWR, { useSWRConfig } from "swr";
import Axios from "axios";
import Link from "next/link";
import parse from "html-react-parser";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { BiComment, BiDotsVerticalRounded, BiTrash } from "react-icons/bi";
import { usePostingContext } from "../../context/postingContext";

const fetcher = (url) =>
  Axios.get(url, { withCredentials: true }).then((res) => res.data);

function Username() {
  const router = useRouter();
  const { currentUser, User } = useAuthenticationContext();
  const { deletePost } = usePostingContext();

  const { mutate } = useSWRConfig();


  const { data: userPost, error } = useSWR(
    `http://localhost:8080/${router.query?.username}/posts/`,
    fetcher
  );


  if (!userPost) {
    return <h1>loading...</h1>;
  }

  // console.log(User);
  // useEffect(() => {
  //   if (data) {
  //     setAllPosts(data);
  //   }
  // }, [data]);
  // // console.log(allPosts);

  return (
    <div className="mx-auto mt-20  max-w-5xl dark:text-whiteColor">
      <div className="flex flex-col justify-evenly md:space-x-5 lg:flex-row lg:space-x-10 ">
        <div className="order-last flex flex-col items-center justify-start space-y-5 lg:order-first  ">
          {userPost?.map((post) => {
            const { title, content, createdAt, Comments, Likes, author } = post;

            return (
              <div
                key={post.id}
                className="max-h-auto flex w-full flex-col space-y-8 rounded-md border border-lightDark border-opacity-20 px-5 py-4 shadow hover:border-opacity-50 dark:border-opacity-100 hover:dark:border-darkTeal md:w-[44em]"
              >
                <div className="flex items-center justify-between ">
                  <div className="flex items-center justify-between space-x-2">
                    <img
                      src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                      alt="default"
                      className="w-10 rounded-full"
                    />
                    <p>{User?.username}</p>
                  </div>

                  <p>{new Date(createdAt).toLocaleString()}</p>

                  {post?.user_id == currentUser?.id ? (
                    <button
                      onClick={() => {
                        deletePost(User.username, post.id);
                      }}
                      className="cursor-pointer text-2xl font-semibold text-pinkColor "
                    >
                      <BiTrash />
                    </button>
                  ) : (
                    <p></p>
                  )}
                </div>
                <Link href={`/user/${author.username}/posts/${post.id}`}>
                  <div className="ml-2 flex flex-col space-y-7 pb-3">
                    <p className="text-xl font-bold">{title}</p>
                    <div className="text-md prose leading-3 text-lightDark dark:text-grayColor ">
                      {parse(content)}
                    </div>
                  </div>
                </Link>

                <div className=" flex items-center justify-center  space-x-36 ">
                  <button className="flex items-center justify-center space-x-2 text-xl font-semibold text-pinkColor md:text-2xl ">
                    <HiOutlineHeart />{" "}
                    <span className="text-xs md:text-[15px]">
                      {Likes?.length} Likes
                    </span>
                  </button>
                  <Link href={`/user/${author.username}/posts/${post.id}`}>
                    <button className="flex items-center space-x-2 rounded p-2 text-xl  font-semibold text-lightTealColor hover:bg-lightDark hover:bg-opacity-40 md:text-2xl  ">
                      <BiComment />{" "}
                      <span className="text-xs md:text-[15px]">
                        {Comments?.length} Comments
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-9 flex h-fit w-auto max-w-xs flex-col items-center space-y-3 self-center rounded-lg border border-lightDark  border-opacity-20 px-8 py-6 shadow dark:border-opacity-100 lg:mb-0 lg:self-start">
          <img
            src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
            alt="default"
            className="w-32 rounded-full"
          />
          <div className="flex h-auto  flex-col items-center space-y-3 rounded-md p-1 ">
            <p className="text-lg font-bold text-lightTealColor">
              @{User?.username}
            </p>
            <div className="flex items-center justify-evenly">
              <div className="flex items-center justify-around space-x-8">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-medium">Post</p>
                  <p>{User?.Posts?.length}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-medium">Followers</p>
                  <p>{User?.followers?.length}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="font-medium">Following</p>
                  <p>{User?.following?.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {currentUser?.username === router.query.username ? (
              <button className="text-md rounded-md  border-darkColor bg-lightTealColor px-3 py-2 font-semibold text-darkColor  shadow">
                Edit
              </button>
            ) : (
              <button className="text-md rounded-md  border-darkColor bg-lightTealColor px-3 py-2 font-semibold text-darkColor  shadow">
                Follow
              </button>
            )}
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
