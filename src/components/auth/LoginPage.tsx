import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Loader, Smartphone } from "lucide-react"
import axios from "axios"

import Card from "@/components/ui/Card"
import Field from "@/components/ui/Field"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import { signIn } from "next-auth/react"

const LoginPage = () => {

  const router = useRouter()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"login" | "otp">("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [smsConsent, setSmsConsent] = useState(false)
  const isPhone = (value: string) => {
    const digits = value.replace(/\D/g, "")
    return digits.length === 10
  }

  const isEmail = (value: string) => {
    return value.includes("@")
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    setError(null)
    setLoading(true)

    try {

      // 📱 LOGIN POR TELEFONO
      if (isPhone(identifier)) {
        if (!smsConsent) {
          setError("Debes aceptar recibir SMS para continuar")
          setLoading(false)
          return
        }
        const phone = identifier.replace(/\D/g, "")

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/request-phone-code`,
          { phone }
        )

        setStep("otp")
        setLoading(false)
        return
      }

      // 📧 LOGIN EMAIL
      if (isEmail(identifier)) {

        const res = await signIn("credentials", {
          email: identifier,
          password,
          redirect: false,
        })

        if (res?.error) {
          setError("Credenciales inválidas")
        } else {
          router.push("/")
        }

        setLoading(false)
        return
      }

      setError("Ingresa un email o teléfono válido")

    } catch (err) {
      setError("Ocurrió un error")
      setLoading(false)
    }

  }

  const handleVerifyOtp = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)

    try {

      const phone = identifier.replace(/\D/g, "")

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-phone-code`,
        {
          phone,
          code: otp
        }
      )

      const token = res.data.data.token

      await signIn("credentials", {
        token,
        redirect: false
      })

      router.push("/home")

    } catch (error) {
      setError("Código incorrecto")
    }

    setLoading(false)

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
            <h1 className="text-2xl font-semibold tracking-tight">
              Iniciar sesión
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Accede a tu cuenta AlphaVet
            </p>
          </div>

          <Card className="p-6 space-y-5">

            {step === "login" && (

              <form onSubmit={handleSubmit} className="space-y-5">

                <Field label="Email o Teléfono" required>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="pl-9"
                      placeholder="correo o 6691234567"
                    />
                  </div>
                </Field>
                {isPhone(identifier) && (
                  <label className="flex items-start gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-1"
                    />
                    <span>
                      Acepto recibir mensajes SMS para autenticación y notificaciones de AlphaVet.
                      Pueden aplicarse cargos de mi operador.
                    </span>
                  </label>
                )}
                {isEmail(identifier) && (
                  <Field label="Contraseña" required>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </Field>
                )}

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <Button type="submit" className="w-full">
                  {loading ? <Loader /> : "Continuar"}
                </Button>

                <Button onClick={() => signIn("google")}>
                  Continuar con Google
                </Button>

              </form>
            )}

            {step === "otp" && (

              <form onSubmit={handleVerifyOtp} className="space-y-5">

                <Field label="Código SMS">
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="pl-9"
                      placeholder="1234"
                    />
                  </div>
                </Field>

                <Button type="submit" className="w-full">
                  {loading ? <Loader /> : "Verificar código"}
                </Button>

              </form>
            )}

          </Card>

          <p className="mt-8 text-center text-sm text-slate-500">
            ¿No tienes cuenta?{' '}
            <a href="/auth/signin" className="font-medium text-blue-600 hover:underline">
              Crear cuenta
            </a>
          </p>

        </div>
      </div>

    </main >
  )
}

export default LoginPage
