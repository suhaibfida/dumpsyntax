import { Input } from "@repo/ui/Input";
import { useForm } from "react-hook-form";
import { Button } from "@repo/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginType } from "@repo/common/zod";
import { login } from "./api/auth";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
type loginSchema = z.infer<typeof loginType>;
export const Login = () => {
  const api_Url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const run = async () => {
    const res = await fetch(`${api_Url}/me`, {
      method: "GET",
      credentials: "include",
    });
    if (res.ok) {
      navigate("/dashboard");
    }
  };
  run();
  const signUp = () => {
    navigate("/signup");
  };
  const onLogin = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({ resolver: zodResolver(loginType) });
  const onSubmit = async (data: loginSchema) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-black to-sky-900 ">
        <Navbar signUp={signUp} login={onLogin} />
        <div className="fixed top-20 w-screen h-px bg-purple-900" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-white w-100 space-y-7 text-center backdrop-blur-xl bg-white/10 rounded-xl border border-purple-700 border-2"
        >
          <div className="font-bold pt-2 text-3xl text-purple-500">Login</div>
          <div className="font-bold text-3xl">{"</>"}</div>
          <div className="">
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
          <div className="p-5 mb-5">
            <Button className="border-purple-700 text-gray-200 w-50">
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
