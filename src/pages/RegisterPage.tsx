import { useMutation } from "@tanstack/react-query"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../components/ui/field"
import { Input } from "../components/ui/input"
import { useRef } from "react"
import { useNavigate } from "react-router"
import { LoaderCircle } from "lucide-react"
import { register } from "../http/api"

function RegisterPage({ ...props }: React.ComponentProps<typeof Card>) {


  const navigate = useNavigate()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // Sending data in server --> mutation
  // Mutations
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Invalidate and refetch
      console.log('Login successful');
      navigate('/dashboard/home')
    },
  })

  const handleRegisterSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();

    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value

    // console.log('Registering info', { name, email, password });

    if (!name || !email || !password) {
      return alert('Please enter email and password');
    }
    console.log('Register', name, email, password);
    mutation.mutate({ name, email, password })
    // make server call

  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
            {mutation.isError && <span className="text-red-500 text-sm ">{mutation.error.message} / {'Something went wrong'}</span>}
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input ref={nameRef} id="name" type="text" placeholder="John Doe" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    ref={emailRef}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  <FieldDescription>
                    We&apos;ll use this to contact you. We will not share your email
                    with anyone else.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    ref={passwordRef} id="password" type="password" required />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                </Field>
                {/* <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input id="confirm-password" type="password" required />
                  <FieldDescription>Please confirm your password.</FieldDescription>
                </Field> */}
                <FieldGroup>
                  <Field>
                    <Button
                      onClick={handleRegisterSubmit}
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full">
                      {mutation.isPending && <LoaderCircle className="animate-spin" />}
                      <span className="ml-2">Create Account</span>
                    </Button>
                    {/* <Button variant="outline" type="button">
                      Sign up with Google
                    </Button> */}
                    <FieldDescription className="px-6 text-center">
                      Already have an account? <a href='/auth/login' >Sign in</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>



  )
}

export default RegisterPage