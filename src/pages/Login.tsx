import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from "@/components/shared/inputs/CustomFormField"
import { images } from "@/constants/images"
import { LogIn, Mail, Lock } from "lucide-react"
import { SubmitButton } from "@/components/shared/buttons/SubmitButton"
import { loginFormSchema, LoginFormValues } from "@/validations/auth.validation"

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      navigate("/", { replace: true })
    } catch (err) {
      form.setError("root", {
        message: "Unable to login. Please check your credentials.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col md:flex-row">
      {/* Left Panel: Form */}
      <div className="flex w-full flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-8 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-8">
            {/* Logo with enhanced styling */}
            <div className="mb-2 flex justify-center">
              <div className="relative">
                <img 
                  src={images.logo} 
                  width={200} 
                  height={176} 
                  alt="Logo" 
                  className="relative rounded-2xl transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
            
            {/* Welcome Section with decorative elements */}
            <div className="relative text-center">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-text-secondary">
                Sign in to manage your gluten-free marketplace
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                <div className="space-y-4">
                  <CustomFormField
                    fieldType={FormFieldType.EMAIL}
                    control={form.control}
                    name="email"
                    label="Email Address"
                    placeholder="admin@beyondgluten.com"
                    disabled={isLoading}
                    leftIcon={Mail}  
                    iconPosition="left"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.PASSWORD}
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    leftIcon={Lock}  
                    iconPosition="left"
                  />
                </div>


                <SubmitButton 
                  isLoading={isLoading}
                  text="Sign In"
                  loadingText="Authenticating..."
                  icon={<LogIn className="h-4 w-4" />}
                />

              </form>
            </Form>

            {/* Footer */}
            <p className="text-center text-xs text-text-muted">
              © 2026 Beyond Gluten. All rights reserved.
            </p>
          </div>
        </div>
      </div>

   <div className="relative hidden w-1/2 md:block">
  <img
    src={images.login}
    alt="Beyond Gluten products and ingredients"
    className="h-screen w-full "
  />
  
  {/* Powered by badge in bottom right corner */}
  <div className="absolute bottom-1 -mb-6 right-4 flex items-center gap-2 ">
    <span className="text-white text-sm font-medium">Powered by</span>
    <img 
      src={images.futureX}  
      alt="X Logo" 
      className="h-24 w-24"
    />
  </div>
</div>
    </div>
  )
}

export default Login