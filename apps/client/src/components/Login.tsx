import { useForm } from "react-hook-form";
import { Input } from "@repo/ui/Input";
export const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-600">
        <form className="text-white border border-white">
          <h2 className="text-gray-200 font-bold text-center">Login</h2>
          <Input />
        </form>
      </div>
    </>
  );
};
