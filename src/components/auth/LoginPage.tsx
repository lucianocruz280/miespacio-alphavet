'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Loader } from 'lucide-react'

import Card from '@/components/ui/Card'
import Field from '@/components/ui/Field'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const LoginPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      )

      const data = await res.json()

      if (!data.success) {
        throw new Error(data.message || 'Credenciales inválidas')
      }

      localStorage.setItem('token', data.data.token)
      router.push('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="h-screen w-full flex overflow-hidden bg-white">

      <div className="hidden lg:block relative w-1/2 h-full bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        <div className="absolute bottom-0 left-0 p-12 w-full text-white">
          <p className="text-2xl font-medium leading-snug tracking-tight max-w-lg">
            “Cuidamos a quienes más amas con la mejor tecnología y el cariño que
            merecen.”
          </p>

          <div className="mt-6 text-sm text-slate-300">
            Más de 2,000 dueños felices
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Iniciar sesión
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Accede a tu cuenta para gestionar tus mascotas y citas.
            </p>
          </div>

          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Email" required>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    placeholder="nombre@ejemplo.com"
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

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button type="submit" className="w-full">
                {loading ? <Loader /> : "Iniciar Sesión"}
              </Button>
            </form>
          </Card>

          <p className="mt-6 text-sm text-slate-500 text-center">
            ¿No tienes cuenta?{' '}
            <a
              href="/auth/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
