import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  social: string;
  image: string;
  username: string;
  link: string;
}

const LinkCard = ({social, image, username, link}: Props) => {
  return (
    <div className="w-40 h-40 border rounded-2xl shadow-sm p-4 m-2">
      <Image src={image} className="rounded-lg w-10 h-10" alt="twitter" />
      <h5 className="text-sm capitalize mt-2">{social}</h5>
      <h6 className="text-xs text-gray-500">@{username}</h6>
      <Button className="bg-blue-500 mt-2 p-0 w-16 h-6 text-xs rounded-full">Follow</Button>
    </div>
  )
}

export default LinkCard