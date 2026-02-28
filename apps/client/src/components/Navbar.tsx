import { Button } from "@repo/ui/Button";
export const Navbar = () => {
  return (
    <div className="flex fixed top-0 left-3 w-15">
      <img className=" rouned-xl" src="./../../dump.svg" />
      <span className="pt-7 text-gray-300 text-2xl font-bold">
        <span className=" font-bold text-3xl pr-1">
          <span className="text-4xl text-purple-700">D</span>ump
        </span>
        <span className="text-purple-700">{"</>"}</span>
      </span>
      <div className="flex fixed bottom-5 left-5 lg:top-5 lg:right-10 lg:left-auto lg:bottom-auto">
        <div className="pr-5">
          <Button className="w-30 border-purple-800" type={"submit"}>
            SignUp
          </Button>
        </div>
        <div className="pr-5">
          <Button className="w-30 border-purple-800" type={"submit"}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
