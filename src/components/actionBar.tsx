import { Image, Link, Monitor, Smartphone, Text, Type } from "lucide-react";
import { Button } from "./ui/button";

const ActionBar = () => {
  return (
    <div className="bg-white w-fit absolute bottom-10 left-0 right-0 mx-auto border rounded-xl p-3 shadow">
      <div className="flex flex-row">
        <Button className="bg-green-400 hover:bg-green-500">Share My Link</Button>
        <span className="mx-3 flex justify-center items-center text-gray-300">|</span>
        <div className="flex gap-2 mt-0.5">
          <Button variant="outline" className="w-8 h-8 p-0">
            <Link className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            <Type className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            <Text className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="w-8 h-8 p-0">
            <Image className="w-4 h-4" />
          </Button>
        </div>
        <span className="mx-3 flex justify-center items-center text-gray-300">|</span>
        <div className="flex gap-2">
          <Button>
            <Monitor className="w-4 h-4" />
          </Button>
          <Button variant="ghost">
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActionBar;