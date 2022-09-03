import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserPostContext } from "../../context/userPostContext";
import { useAuthenticationContext } from "../../context/authenticationContext";
import useSWR from "swr";
import Axios from "axios";

const fetcher = (url) =>
  Axios.get(url, { withCredentials: true }).then((res) => res.data);

function Username() {
  const router = useRouter();
  const { currentUser } = useAuthenticationContext();

  const [allPosts, setAllPosts] = useState();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, []);

  const { data, error } = useSWR(
    `http://localhost:8080/${currentUser?.username}/posts/`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setAllPosts(data);
    }
  }, [data]);

  console.log(allPosts);

  return (
    <div className="mx-auto mt-20 flex max-w-5xl items-center justify-center dark:text-whiteColor">
      <div className="flex flex-col space-y-5 md:grid md:grid-cols-2 md:space-y-0 md:space-x-44 ">
        <div className="flex flex-col items-center justify-start space-y-5">
          {allPosts?.map((post) => {
            return (
              <div className="flex max-h-80 w-full max-w-xl flex-col space-y-4 rounded-md px-5 py-4 shadow">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center justify-between space-x-2">
                    <img
                      src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                      alt="default"
                      className="w-10 rounded-full"
                    />
                    <p>ramla</p>
                  </div>

                  <p>september/1/2022</p>

                  <p>...</p>
                </div>
                <div className="flex flex-col space-y-3">
                  <p className="text-lg font-bold">
                    Lorem ipsum dolor sit amet.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi ipsam sed eveniet doloribus aspernatur debitis. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Animi
                    ipsam sed eveniet doloribus aspernatur debitis.
                  </p>
                </div>
                <div className="flex items-center justify-center space-x-36 ">
                  <button className="rounded-full border-darkColor bg-pinkColor px-3 py-2 text-xs font-semibold text-whiteColor shadow-md ">
                    L
                  </button>
                  <button className="rounded-full border-darkColor bg-darkColor px-3 py-2 text-xs font-semibold text-whiteColor shadow-md ">
                    C
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex h-fit w-72 max-w-sm flex-col items-center space-y-3 rounded-lg px-8 py-6 shadow  ">
          <img
            src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
            alt="default"
            className="w-32 rounded-full"
          />
          <div className="flex h-auto  flex-col items-center space-y-3 rounded-md p-1 ">
            <p className="text-lg font-bold text-lightTealColor">@ramla</p>
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
            <button className="text-md  rounded-md border-darkColor bg-lightTealColor px-3 py-2 font-semibold text-whiteColor shadow">
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
