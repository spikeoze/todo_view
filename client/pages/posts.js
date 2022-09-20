import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { useLikesContext } from "../context/likesContext";
import Link from "next/link";
import parse from "html-react-parser";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { BiComment, BiDotsVerticalRounded, BiTrash } from "react-icons/bi";
import Axios from "axios";
import { useAuthenticationContext } from "../context/authenticationContext";
import { usePostingContext } from "../context/postingContext";

const fetcher = (url) =>
  Axios.get(url, { withCredentials: true }).then((res) => res.data);

function Posts() {
  const { currentUser, User } = useAuthenticationContext();
  const { deletePost } = usePostingContext();
  const { likePost, unLikePost } = useLikesContext();
  const router = useRouter();

  const { data, error, mutate } = useSWR(
    `http://localhost:8080/${currentUser?.username}/following_posts/`,
    fetcher,
    { refreshInterval: 8000 }
  );

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, []);

  if (!data)
    return <div className="flex items-center justify-center">Loading...</div>;

  // const mappedData = data.flat();
  // console.log(mappedData);

  if (data.length === 0) {
    return <div>Follow people to see posts</div>;
  }

  return (
    <div className="mx-auto mt-20  max-w-5xl dark:text-whiteColor">
      <div className="flex flex-col items-center justify-start space-y-5">
        {data?.map((post) => {
          const { title, content, createdAt, Comments, Likes, author } = post;
          // console.log(post);
          // console.log(Likes.map((like) => like.user_id));

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
                  <p>{author?.username}</p>
                </div>

                <p>{new Date(createdAt).toLocaleString()}</p>

                {author?.id == currentUser?.id ? (
                  <button
                    onClick={() => {
                      deletePost(author.username, post.id);
                    }}
                    className="cursor-pointer text-2xl font-semibold text-pinkColor "
                  >
                    <BiTrash />
                  </button>
                ) : (
                  <p></p>
                )}
              </div>
              <Link href={`/user/${post?.author.username}/posts/${post.id}`}>
                <div className="ml-2 flex flex-col space-y-7 pb-3">
                  <p className="text-xl font-bold">{title}</p>
                  <div className="text-md prose leading-3 text-lightDark dark:text-grayColor ">
                    {parse(content)}
                  </div>
                </div>
              </Link>

              <div className=" flex items-center justify-center  space-x-14 md:space-x-36 ">
                {Likes.map((like) => like.user_id).includes(currentUser?.id) ? (
                  <button
                    onClick={() => unLikePost(post?.id)}
                    className="flex items-center justify-center space-x-2 text-xl font-semibold text-pinkColor md:text-2xl "
                  >
                    <HiHeart />{" "}
                    <span className="text-sm md:text-[15px]">
                      {Likes?.length} Likes
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => likePost(post?.id)}
                    className="flex items-center justify-center space-x-2 text-xl font-semibold text-pinkColor md:text-2xl "
                  >
                    <HiOutlineHeart />{" "}
                    <span className="text-sm md:text-[15px]">
                      {Likes?.length} Likes
                    </span>
                  </button>
                )}
                <Link href={`/user/${post?.author.username}/posts/${post.id}`}>
                  <button className="flex items-center space-x-2 rounded p-2 text-xl  font-semibold text-lightTealColor hover:bg-lightDark hover:bg-opacity-40 md:text-2xl  ">
                    <BiComment />{" "}
                    <span className="text-sm md:text-[15px]">
                      {Comments?.length} Comments
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
