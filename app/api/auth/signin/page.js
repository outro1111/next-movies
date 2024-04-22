import SigninForm from "@/app/components/SigninForm";


export default function SignInPage() {
  return (
    <SigninForm />
  )
}

export const metadata = {
  title: "로그인 | MovieRevue",
  description: "MovieRevue 로그인",
  openGraph: {
    title: '로그인 | MovieRevue',
    description: 'MovieRevue 로그인',
  },
}