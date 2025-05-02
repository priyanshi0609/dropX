import * as Z from "zod";
export const signupSchema = Z
.object({
      identifier: Z
      .string()
      .min(1,{message:"Email is required"})
      .email({message:"Please enter a valid email"}),

      password:Z
      .string()
      .min(1,{message:"Password is required"})
      .min(8,{message:"Password must be at least 8 characters long"}),

});