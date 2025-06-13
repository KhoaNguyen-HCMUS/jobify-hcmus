"use client";
import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Search,
  UserCheck,
  GlassWater,
  LucideGlassWater,
  MapIcon,
  MapPin,
  Funnel,
  Heart,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [address, setAddress] = useState("");

  const handleFind = (e: React.FormEvent) => {
	e.preventDefault();
	console.log("Key word: ", keyword);
	console.log("Address: ", address);
  };

  return (
	<div className="w-full min-h-screen">
	  <div className="flex w-full">
		<div className="flex w-full p-px py-4 bg-accent-20 justify-between items-center mb-10">
		  <div className="flex items-center">
			<Image
			  src="/logo.png"
			  alt="JOBIFY Logo"
			  width={50}
			  height={50}
			></Image>
			<span className="text-4xl font-bold text-primary ml-4">JOBIFY</span>
		  </div>
		  <nav className="flex items-center justify-center space-x-10">
			<a className="text-2xl font-semibold text-primary">Home</a>
			<a className="text-2xl font-semibold text-primary-60">About us</a>
			<a className="text-2xl font-semibold text-secondary-60">Contact</a>
			<a className="text-2xl font-semibold text-secondary-60">
			  Notification
			</a>
		  </nav>
		  <div className="flex space-x-4">
			<button className="cursor-pointer text-primary text-2xl font-semibold px-8 pb-2 border-4 border-primary rounded-full">
			  Sign up
			</button>
			<button className="cursor-pointer text-background text-2xl font-semibold px-8  border-4 bg-primary border-primary rounded-full">
			  Sign in
			</button>
		  </div>
		</div>
	  </div>
	  <div className="mb-10">
		<h1 className="font-bold text-7xl ml-16 text-primary mb-10">
		  Find Opportunities <br /> That Fit You Best!
		</h1>
		<p className="text-2xl text-secondary ml-16">
		  From Startup Roles to Global Careers - Lat's Build Your Future
		  Together.
		</p>
	  </div>
	  <form onSubmit={handleFind}>
		<div className="flex ml-16 mb-16">
		  <div className="relative mr-10">
			<div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
			  <Search size={24} />
			</div>
			<input
			  type="keyword"
			  value={keyword}
			  onChange={(e) => setKeyword(e.target.value)}
			  placeholder="Enter key word..."
			  className="w-full pl-12 pr-4 py-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
			/>
		  </div>
		  <div className="relative mr-10">
			<div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
			  {/* <HomePagein size={24} /> */}
			</div>
			<input
			  id="address"
			  type="address"
			  value={address}
			  onChange={(e) => setAddress(e.target.value)}
			  placeholder="Enter address..."
			  className="w-full pl-12 pr-4 py-4 bg-accent-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
			/>
		  </div>
		  <div className="relative">
			<button
			  type="submit"
			  className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-20 font-semibold text-2xl bg-secondary px-6 py-3.5 rounded-md"
			>
			  Search
			</button>
		  </div>
		</div>
		<div className="bg-accent-20">
		  <h2 className="font-bold text-5xl text-neutral-light-20 pl-16 bg-primary w-full mb-6">
			<i>NEW JOBS</i>
		  </h2>
		  <div className="flex justify-between mb-5">
			<div className="relative ml-12">
			  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary">
				<Funnel size={24} />
			  </div>
			  <input
				type="keyword"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				placeholder="Enter key word..."
				className="pl-12 pr-4 py-4 bg-highlight-20 rounded-md text-primary-80 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all duration-300"
			  />
			</div>
			<div className="flex mr-12 space-x-10">
			  {/* <button className="bg-highlight-60 rounded-full px-6 py-2">
				<ArrowLeft size={24} />
			  </button>
			  <map name="">abc</map>
			  <button className="bg-highlight-60 rounded-full px-6 py-2">
				<ArrowRight size={24} />
			  </button> */}
			</div>
		  </div>
		  <div>
			<div className="flex mx-6">
			  <div className="bg-highlight-20 p-4 rounded-2xl mx-4 my-6">
				<div className="flex mb-4">
				  <div>
					<Image
					  src="/logo.png"
					  alt="JOBIFY Logo"
					  width="80"
					  height="80"
					  className="border-2 border-primary rounded-2xl mr-4"
					/>
				  </div>
				  <div className="outline-none max-w-xs flex flex-col justify-between">
					<p className="font-bold text-primary line-clamp-2">
					  Thong tin tuyen dung cua mot cong ty ve vi tri viec
					</p>
					<p className="text-primary-80 font-semibold">Cong ty</p>
				  </div>
				</div>
				<div className="flex justify-between mt-2 mx-4">
				  <p className="bg-accent-20 text-primary-80 rounded-full px-4 font-semibold">
					1000 - 2000$
				  </p>
				  <span className="bg-accent-20 text-primary-80 rounded-full px-4 font-semibold">
					Tinh
				  </span>
				  <span>
					<Heart size={24} />
				  </span>
				</div>
			  </div>
			</div>
			<div></div>
			<div></div>
		  </div>
		</div>
	  </form>
	</div>
  );
}

export default HomePage;
