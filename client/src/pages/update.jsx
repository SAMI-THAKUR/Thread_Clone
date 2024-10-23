import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../feature/User";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function Update() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);
  const user = store.user;
  const navigate = useNavigate();
  const toast = useToast();
  // Separate state variables
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [profilePic, setProfilePic] = useState();
  const [password, setPassword] = useState();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle changes in the image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log("clicked");
    try {
      const res = await axios.put(
        `/api/user/update/${user._id}`,
        {
          name,
          email,
          username,
          profilePic,
          bio,
          password,
        },
        {
          credentials: "include",
          withCredentials: true,
        },
      );

      const data = res.data;
      if (data.error) {
        toast({
          title: "Error",
          description: "Unable to Edit the profile",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        dispatch(getUserProfile());
        toast({
          title: "Success",
          description: "Profile updated successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate(`/`);
      }
    } catch (error) {
      const errorMessage = error.response.data.error || "Something went wrong";
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <div class="sm:mx-32 lg:mx-32 xl:mx-72 h-full px-10 py-10">
        <div class="flex justify-between container mx-auto">
          <div class="w-full">
            <div class="mt-4 px-4">
              <h1 class="text-text dark:text-darktext font-Konkhmer flex text-3xl pt-10 px-5">EDIT YOUR PROFILE</h1>
              {/* Name input */}
              <label class="relative block p-3 border-2 border-black rounded" htmlFor="name">
                <span class="text-text dark:text-darktext text-md font-semibold" htmlFor="name">
                  Name
                </span>
                <input
                  class="text-text dark:text-darktext w-full bg-transparent p-0 text-sm"
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </label>
              {/* Email input */}
              <label class="relative block p-3 border-2 border-black rounded my-5" htmlFor="email">
                <span class="text-text dark:text-darktext text-md font-semibold" htmlFor="email">
                  Email
                </span>
                <input
                  class="text-text dark:text-darktext w-full bg-transparent p-0 text-sm focus:outline-none"
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
              {/* Username input */}
              <label class="relative block p-3 border-2 border-black rounded my-5" htmlFor="username">
                <span class="text-text dark:text-darktext text-md font-semibold" htmlFor="username">
                  Username
                </span>
                <input
                  class="text-text dark:text-darktext w-full bg-transparent p-0 text-sm focus:outline-none"
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </label>
              {/* Password input */}
              <label class="relative block p-3 border-2 border-black rounded my-5" htmlFor="username">
                <span class="text-text dark:text-darktext text-md font-semibold" htmlFor="username">
                  Password
                </span>
                <input
                  class="text-text dark:text-darktext w-full bg-transparent p-0 text-sm focus:outline-none"
                  type="password"
                  onChange={handlePasswordChange}
                />
              </label>
              {/* Profile picture preview */}
              <div class="shrink-0 mt-5">
                <img class="h-10 w-10 object-cover rounded-full my-5" src={profilePic} alt="Current profile photo" />
              </div>
              {/* Profile picture input */}
              <label class="block pt-2">
                <input
                  type="file"
                  name="profilePic"
                  id="profilePic"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-text dark:text-darktext focus:outline-none"
                />
              </label>

              {/* Bio input */}
              <label class="relative block p-3 border-2 mt-5 border-black rounded" htmlFor="bio">
                <span class="text-md font-semibold text-text dark:text-darktext" htmlFor="bio">
                  Bio
                </span>
                <input
                  class="w-full p-0 text-sm border-none bg-transparent text-text dark:text-darktext focus:outline-none"
                  type="text"
                  placeholder="Write Your Bio"
                  value={bio}
                  onChange={handleBioChange}
                />
              </label>

              <button
                onClick={handleSubmit}
                class="text-head dark:text-darkhead mt-5 border-2 px-5 py-2 rounded-lg border-head dark:border-darkhead border-b-4 font-black translate-y-2 border-l-4"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
