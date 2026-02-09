import { Input } from "@repo/ui/Input";
import { useForm } from "react-hook-form";
import { Button } from "@repo/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginType } from "@repo/common/zod";
import { login } from "./auth";
import { z } from "zod";
type loginSchema = z.infer<typeof loginType>;
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({ resolver: zodResolver(loginType) });
  const onSubmit = async (data: loginSchema) => {
    try {
      const result = await login(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black ">
        <div className="flex fixed top-0 left-3 w-15">
          <img className=" rouned-xl" src="./../../dump.svg" />
          <span className="pt-7 text-gray-300 text-2xl font-bold">
            <span className="text-purple-700 font-bold text-3xl pr-1">
              Dump
            </span>
            {"</>"}
          </span>
          <div className="flex fixed bottom-5 left-5 lg:top-5 lg:right-10 lg:left-auto lg:bottom-auto">
            <div className="pr-5">
              <Button className="w-30" type={"submit"}>
                SignUp
              </Button>
            </div>
            <div className="pr-5">
              <Button className="w-30" type={"submit"}>
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className="fixed top-20 w-screen h-px bg-gray-700" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-white space-y-7 text-center backdrop-blur-xl bg-white/7 rounded-xl pt-10 border border-gray-800"
        >
          <div className="font-mono text-3xl text-purple-500">Login</div>
          <div className="font-bold text-3xl">{"</>"}</div>
          <div className="pt-5">
            <Input
              {...register("usernameOrEmail")}
              type="text"
              placeholder="Username or Email"
            />
            <div>
              {errors.usernameOrEmail && (
                <span className="text-red-500 text-sm">
                  {errors.usernameOrEmail.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <Input
              {...register("password")}
              type="text"
              placeholder="Password"
            />
            <div>
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className="p-10">
            <Button>Login</Button>
          </div>
        </form>
      </div>
    </>
  );
};
