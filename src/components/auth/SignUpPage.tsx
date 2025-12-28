import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Quote, Loader } from 'lucide-react'

import Card from '@/components/ui/Card'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const SignupPage = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!data?.success) {
        throw new Error(data?.message || 'Error al registrar usuario')
      }

      localStorage.setItem('token', data.data.token)
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="h-screen w-full flex overflow-hidden bg-white">
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
            “Crea tu cuenta y lleva el historial, vacunas y citas de tu mascota en un solo lugar.”
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
              Más de 2,000 dueños felices
            </span>
          </div>
        </div>
      </div>


      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-10 text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <span className="text-sm font-semibold">V</span>
            </div>
            <span className="font-semibold tracking-tight text-lg">Alphavet</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Crear cuenta
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Regístrate para gestionar tus mascotas, historial y citas.
            </p>
          </div>

          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Nombre completo" required>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9"
                    placeholder="Juan Pérez"
                  />
                </div>
              </Field>

              <Field label="Email" required>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    placeholder="usuario@alphavet.com"
                  />
                </div>
              </Field>

              <Field label="Contraseña" required>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    placeholder="••••••••"
                  />
                </div>
              </Field>

              {error && <p className="text-sm text-red-600">{error}</p>}

             <Button type="submit" className="w-full">
                {loading ? <Loader /> : "Iniciar Sesión"}
              </Button>
            </form>
          </Card>

          <p className="mt-8 text-center text-sm text-slate-500">
            ¿Ya tienes cuenta?{' '}
            <a href="/auth/signin" className="font-medium text-blue-600 hover:underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

export default SignupPage
