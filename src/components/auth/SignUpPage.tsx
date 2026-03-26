import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/router"
import { Mail, Lock, User, Quote, Loader, Smartphone, Eye, EyeOff } from 'lucide-react'
import { useTranslation } from "react-i18next"

import Card from '@/components/ui/Card'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { signIn } from 'next-auth/react'

const SignupPage = () => {
  const { t, i18n } = useTranslation('common')
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setError(null)

    if (!name.trim()) {
      setError(t('auth.signup.errors.nameRequired'))
      return
    }

    if (!email.includes("@")) {
      setError(t('auth.signup.errors.invalidEmail'))
      return
    }

    if (password.length < 8) {
      setError(t('auth.signup.errors.passwordMinLength'))
      return
    }

    if (password !== confirmPassword) {
      setError(t('auth.signup.errors.passwordsDontMatch'))
      return
    }

    if (!acceptedTerms) {
      setError(t('auth.signup.errors.termsRequired'))
      return
    }

    setLoading(true)

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {

        if (data?.message?.toLowerCase().includes("email")) {
          throw new Error(t('auth.signup.errors.emailExists'))
        }

        if (data?.message?.toLowerCase().includes("phone")) {
          throw new Error(t('auth.signup.errors.phoneExists'))
        }

        throw new Error(data?.message || t('auth.signup.errors.registerError'))
      }

      await signIn("credentials", {
        token: data.data.token,
        redirect: false
      })

      router.push("/home")

    } catch (err: any) {
      setError(err.message || t('auth.signup.errors.unexpectedError'))

    } finally {

      setLoading(false)

    }

  }

  return (
    <main className="h-screen w-full flex overflow-hidden bg-white relative">
      <div className="absolute top-10 right-10">
        <select
          value={i18n.language}
          onChange={(e) => changeLang(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
      </div>
      <div className="hidden lg:block relative w-1/2 h-full bg-slate-900">

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        <div className="absolute bottom-0 left-0 p-12 w-full z-10">

          <div className="flex items-center gap-2 text-white/90 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/10">
              <Quote className="w-5 h-5" />
            </div>
          </div>

          <p className="text-2xl font-medium text-white leading-snug tracking-tight max-w-lg">
            {t('auth.signup.quote')}
          </p>

          <div className="mt-6 flex items-center gap-3">

            <div className="flex -space-x-2">

              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80"
                alt=""
              />

              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80"
                alt=""
              />

              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80"
                alt=""
              />

            </div>

            <span className="text-sm font-medium text-slate-300">
              {t('auth.signup.happyOwners')}
            </span>

          </div>

        </div>

      </div>


      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-8 bg-white overflow-y-auto">

        <div className="w-full max-w-sm">

          <a href='/' className="flex items-center gap-2 mb-14 mt-4 text-slate-900 h-10">
            <img src="/images/logo.png" />
          </a>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {t('auth.signup.title')}
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              {t('auth.signup.subtitle')}
            </p>
          </div>

          <Card className="p-6 sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-5">

              <Field label={t('auth.signup.nameLabel')} required>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9 text-base"
                    placeholder={t('auth.signup.namePlaceholder')}
                  />
                </div>
              </Field>

              <Field label={t('auth.signup.emailLabel')} required>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="email text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    placeholder={t('auth.signup.emailPlaceholder')}
                  />
                </div>
              </Field>

              <Field label={t('auth.signup.phoneLabel')}>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9 text-base"
                    placeholder={t('auth.signup.phonePlaceholder')}
                  />
                </div>
              </Field>

              <Field label={t('auth.signup.passwordLabel')} required>

                <div className="relative">

                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10 text-base"
                    placeholder={t('auth.signup.passwordPlaceholder')}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>

                </div>

                <p className="text-xs text-slate-500 mt-1">
                  {t('auth.signup.passwordHint')}
                </p>

              </Field>

              <Field label={t('auth.signup.confirmPasswordLabel')} required>

                <div className="relative">

                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />

                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-9 pr-10 text-base"
                    placeholder={t('auth.signup.passwordPlaceholder')}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>

                </div>

              </Field>

              <label className="flex items-center gap-2 text-sm text-slate-600">

                <input
                  type="checkbox"
                  className='text-base'
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />

                {t('auth.signup.termsLabel')}

              </label>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? <Loader className="animate-spin" /> : t('auth.signup.submitBtn')}
              </Button>

            </form>

          </Card>

          <p className="mt-8 text-center text-sm text-slate-500">
            {t('auth.signup.hasAccount')}{' '}
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:underline">
              {t('auth.signup.loginBtn')}
            </Link>
          </p>

          <a href="/" >
            <p className="mt-2 text-center text-sm text-blue-500">
              Regresar a Inicio
            </p>

          </a>
        </div>

      </div>

    </main>
  )
}

export default SignupPage
