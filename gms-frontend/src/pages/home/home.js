import React from "react";
import Login from "../../components/login/login";
import Register from "../../components/register/register";

const Home = () => {
  return (
    <div>
      <div className="bg-slate-800 text-white font-semibold p-5 text-xl">
        Welcome to Gym Management System
      </div>
      <div class='bg-cover w-full bg-[url("https://media.gettyimages.com/id/1316572851/video/4k-video-footage-of-barbells-in-an-empty-gym.jpg?s=640x640&k=20&c=PCson57j2NIeEucdHlHi0bVykyqyfCDAjQFHY32nU8A=")]'>
        <div class="w-full flex ">
          <Login />
          <Register />
        </div>
        <div class="bg-slate-800 w-full text-white text-sm font-semibold text-center ">
          Build by miket and sujal
        </div>  
      </div>
    </div>
  );
};

export default Home;
