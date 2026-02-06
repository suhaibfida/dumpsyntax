import { useForm } from "react-hook-form";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupType } from "@repo/common/zod";
import { z } from "zod";
type signUpFormData = z.infer<typeof signuptype>;
export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormData>({ resolver: zodResolver(signUpType) });
  const onSubmit = (data: signUpFormData) => {
    console.log("Login Data:", data);
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-600">
        <div className=" flex w-17 fixed top-3 left-6 text-white">
          <img className="text-red-500" src="./../../dump.svg" />
          <h2 className="pt-7 text-md font-bold">
            <span className="font-mono text-2xl text-gray-300">
              Dump{"<>"}Syntax...
            </span>
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-96 h-96 text-white backdrop-blur-xl bg-black/30 border border-gray-800 rounded-xl"
        >
          <h2 className="pb-12 pt-3 text-gray-200 font-bold text-2xl text-center">
            Login
          </h2>
          <div className="space-y-4 text-center">
            <Input
              type="text"
              placeholder="Username"
              {...register("username")}
            />
            {error.username && (
              <p className="text-red-400 text-sm">{errors.username.message}</p>
            )}
            <Input
              type="text"
              placeholder="Username"
              {...register("password")}
            />
            {erros.email && (
              <p className="text-red-400 text-sm">{error.email.message}</p>
            )}
            <Input
              type="text"
              placeholder="Username"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
            <Button />
          </div>
        </form>
      </div>
    </>
  );
};
