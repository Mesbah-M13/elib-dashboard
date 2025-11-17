import { useRef } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../components/ui/field"
import { Input } from "../components/ui/input"
import { cn } from "../lib/utils"
import { useMutation } from "@tanstack/react-query"
import { login } from "../http/api"
import { useNavigate } from "react-router"
import { LoaderCircle } from "lucide-react"

const LoginPage = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {

  const navigate = useNavigate()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // Sending data in server --> mutation
  // Mutations
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Invalidate and refetch
      console.log('Login successful');
      navigate('/dashboard/home')
    },
  })

  const handleLoginSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();

    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    console.log('Sign in info', { email, password });

    if (!email || !password) {
      return alert('Please enter email and password');
    }
    mutation.mutate({ email, password })
    // make server call

  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
                {mutation.isPaused && <div>Loading...</div>}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      ref={emailRef}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input ref={passwordRef} id="password" type="password" required />
                  </Field>
                  <Field>
                    {/* <Button onClick={handleLoginSubmit} type="submit">Login</Button> */}
                    <Button
                      onClick={handleLoginSubmit}
                      className="w-full"
                      disabled={mutation.isPending}>
                      {mutation.isPending && <LoaderCircle className="animate-spin" />}

                      <span className="ml-2">Sign in</span>
                    </Button>
                    {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                    <FieldDescription className="text-center">
                      Don&apos;t have an account? <a href="/auth/register">Sign up</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>

  )
}

export default LoginPage