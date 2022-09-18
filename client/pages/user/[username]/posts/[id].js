import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Axios from "axios";
import { useRouter } from "next/router";
import { usePostingContext } from "../../../../context/postingContext";
import parse from "html-react-parser";
import { IoPersonCircleSharp } from "react-icons/io5";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import {
  BiComment,
  BiDotsVerticalRounded,
  BiSend,
  BiTrash,
} from "react-icons/bi";
import { useCommentContext } from "../../../../context/commentContext";
import { useAuthenticationContext } from "../../../../context/authenticationContext";
import { useLikesContext } from "../../../../context/likesContext";

const fetcher = (url) =>
  Axios.get(url, { withCredentials: true }).then((res) => res.data);

function Id() {
  const { comment, setComment, createComment, deleteComment } =
    useCommentContext();

  const { likePost, unLikePost } = useLikesContext();

  const { currentUser } = useAuthenticationContext();
  const router = useRouter();
  const { id, username } = router.query;
  const postId = parseInt(id);
  const { data: postData, error: postDataError } = useSWR(
    `http://localhost:8080/${username}/posts/${postId}`,
    fetcher,
    { refreshInterval: 100 }
  );

  const { data: comments, error: commentsError } = useSWR(
    `http://localhost:8080/post/${postId}/comment`,
    fetcher
  );

  if (!postData) {
    return <h1>Loading...</h1>;
  }

  const { content } = postData;
  return (
    <div className="mx-auto mt-10  max-w-5xl dark:text-whiteColor">
      <div className="flex w-full flex-col lg:w-[60rem]">
        <div className="max-h-auto flex flex-col space-y-8 rounded-md border border-lightDark border-opacity-20 px-5 py-4 shadow hover:border-opacity-50 dark:border-opacity-100 hover:dark:border-darkTeal">
          <div className="flex items-center justify-between ">
            <div className="flex items-center justify-between space-x-2">
              <img
                src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                alt="default"
                className="w-10 rounded-full"
              />
              <p>{postData?.author.username}</p>
            </div>

            <p className="text-sm opacity-80">
              {new Date(postData?.createdAt).toLocaleString()}
            </p>

            {postData?.user_id == currentUser?.id ? (
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

          <div className="ml-2 flex flex-col space-y-7 pb-3">
            <p className="text-xl font-bold">{postData?.title}</p>
            <div className="prose text-sm leading-3 text-lightDark dark:text-grayColor md:text-lg ">
              {parse(content)}
            </div>
          </div>

          <div className="h-[1px] w-full bg-lightDark opacity-20 dark:opacity-70 "></div>

          <div className=" flex items-center justify-center  space-x-20 md:space-x-40 ">
            {postData?.Likes?.map((like) => like.user_id).includes(
              currentUser?.id
            ) ? (
              <button
                onClick={() => unLikePost(postData?.id)}
                className="flex items-center justify-center space-x-2 text-xl font-semibold text-pinkColor md:text-2xl "
              >
                <HiHeart />{" "}
                <span className="text-xs md:text-[15px]">
                  {postData?.Likes?.length} Likes
                </span>
              </button>
            ) : (
              <button
                onClick={() => likePost(postData?.id)}
                className="flex items-center justify-center space-x-2 text-xl font-semibold text-pinkColor md:text-2xl "
              >
                <HiOutlineHeart />{" "}
                <span className="text-xs md:text-[15px]">
                  {postData?.Likes?.length} Likes
                </span>
              </button>
            )}
            <button className="flex items-center space-x-2 text-xl font-semibold text-lightTealColor md:text-3xl  ">
              <BiComment />{" "}
              <span className="text-xs md:text-[16px]">
                {postData?.Comments?.length} Comments
              </span>
            </button>
          </div>
          <div className="h-[1px] w-full bg-lightDark opacity-20 dark:opacity-70 "></div>
          <div className="flex items-center space-x-5">
            <input
              type="text"
              name="title"
              id="title"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block w-full  break-words  border border-t-0 border-l-0 border-r-0 border-lightDark p-2 text-sm text-darkColor outline-none dark:border-lightDark dark:bg-darkColor dark:text-grayColor md:rounded-md md:p-2.5  md:text-lg "
              placeholder="Share your thoughts..."
            />
            <BiSend
              onClick={() => {
                createComment(postData.id, postData?.author.username);
              }}
              className="text-4xl text-darkTeal hover:opacity-60 dark:text-lightTealColor"
            />
          </div>

          <div>
            <h1 className="mb-5 text-lg underline underline-offset-8 md:text-2xl">
              Comments
            </h1>
            <div className="flex flex-col items-start space-y-1">
              {comments?.map((comment) => {
                return (
                  <div className="w-full" key={comment.id}>
                    <div className="flex items-center justify-between">
                      <div className="m-4 flex justify-start space-x-3 py-5">
                        <div>
                          <IoPersonCircleSharp className="text-4xl md:text-5xl " />
                        </div>
                        <div>
                          <p className="md:text-md text-sm font-medium text-darkTeal opacity-90">
                            @{comment?.author.username}
                          </p>
                          <p className="text-md md:text-lg">{comment.text}</p>
                        </div>
                      </div>
                      <div>
                        {postData?.user_id == currentUser?.id ||
                        comment.user_id == currentUser?.id ? (
                          <button
                            onClick={() => {
                              deleteComment(
                                postData.id,
                                comment.id,
                                currentUser.username
                              );
                            }}
                            className="cursor-pointer text-2xl font-semibold text-pinkColor "
                          >
                            <BiTrash />
                          </button>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-lightDark opacity-20 dark:opacity-70 "></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Id;
