import SignupForm from "@/app/components/SignupForm";


export default function SignUpPage() {
  return (
    <SignupForm />
  )
}

export const metadata = {
  title: "회원가입 | MovieRevue",
  description: "MovieRevue 회원가입",
  openGraph: {
    title: '회원가입 | MovieRevue',
    description: 'MovieRevue 회원가입',
  },
}