import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupType } from "@repo/common/zod";
import { z } from "zod";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/Button";

type SignUpFormData = z.infer<typeof signupType>;

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupType),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Signup Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-600">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 text-white backdrop-blur-xl bg-black/30 border border-gray-800 rounded-xl p-6"
      >
        <h2 className="pb-6 text-gray-200 font-bold text-2xl text-center">
          Signup
        </h2>

        <div className="space-y-4 text-center">
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

          <Button type={"submit"} />
        </div>
      </form>
    </div>
  );
};
