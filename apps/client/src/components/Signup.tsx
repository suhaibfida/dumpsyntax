import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupType } from "@repo/common/zod";
import { z } from "zod";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";
import { signup } from "./api/auth";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

type SignUpFormData = z.infer<typeof signupType>;

export const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupType),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signup(data);
      console.log(result);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Navbar />
      <div className="fixed top-20 w-screen h-px bg-gray-700" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 text-white backdrop-blur-xl bg-white/5 border border-gray-800 rounded-xl p-6"
      >
        <h2 className="pb-3 text-gray-300 font-mono text-3xl text-center">
          Signup
        </h2>
        <h2 className="pb-3 font-bold text-purple-500 font-bold text-2xl text-center">
          {"</>"}
        </h2>

        <div className="space-y-5 text-center">
          {/* Username */}
          <Input type="text" placeholder="Username" {...register("username")} />
          {errors.username && (
            <p className="text-red-400 text-sm">{errors.username.message}</p>
          )}

          {/* Email */}
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}

          <Button className="border-purple-900 w-50" type={"submit"}>
            SignUp
          </Button>
        </div>
      </form>
    </div>
  );
};
