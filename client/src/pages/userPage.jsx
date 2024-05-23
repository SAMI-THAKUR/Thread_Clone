import { UserHeader, Tweet } from "../components/components";
import useGetUserProfile from "../hooks/useGetUser";
import { useParams } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";

export default function UserPage() {
  const { username } = useParams();
  const { user, loading } = useGetUserProfile(username);

  if (username === "undefined") return <h1>User not found</h1>;
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) return <h1>User not found</h1>;
  return (
    <div className="z-0 pb-20 w-fit mt-10">
      <UserHeader user={user} />
    </div>
  );
}
