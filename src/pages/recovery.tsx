"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { Mail, Smartphone, Lock, Loader } from "lucide-react"
import { signIn } from "next-auth/react"

import Card from "@/components/ui/Card"
import Field from "@/components/ui/Field"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

type Step =
    | "identifier"
    | "otp"
    | "reset-password"

export default function RecoveryPage() {

    const router = useRouter()
    const searchParams = useSearchParams()

    const emailFromUrl = searchParams.get("email")

    const [step, setStep] = useState<Step>("identifier")

    const [identifier, setIdentifier] = useState("")
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [cooldown, setCooldown] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        if (emailFromUrl) {
            setIdentifier(emailFromUrl)
            setStep("reset-password")
        }

    }, [emailFromUrl])

    useEffect(() => {

        if (cooldown <= 0) return

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)

    }, [cooldown])

    const isPhone = (value: string) => {
        return value.replace(/\D/g, "").length === 10
    }

    const isEmail = (value: string) => {
        return value.includes("@")
    }

    const handleRequestRecovery = async (e: React.FormEvent) => {

        e.preventDefault()

        setLoading(true)
        setError(null)

        try {

            if (isPhone(identifier)) {

                const phone = identifier.replace(/\D/g, "")

                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/request-phone-code`,
                    { phone }
                )
                setStep("otp")
                setCooldown(60)
                setLoading(false)
                return
            }

            if (isEmail(identifier)) {
                setStep("reset-password")
                setLoading(false)
                return
            }

            setError("Ingresa un email o teléfono válido")

        } catch (err: any) {

            setError(
                err?.response?.data?.message ||
                "Usuario no encontrado"
            )

        }

        setLoading(false)

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

            router.push("/")

        } catch {

            setError("Código incorrecto")

        }

        setLoading(false)

    }

    const handleResetPassword = async (e: React.FormEvent) => {

        e.preventDefault()

        setLoading(true)

        try {

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/set-password`,
                {
                    email: identifier,
                    password
                }
            )

            await signIn("credentials", {
                email: identifier,
                password,
                redirect: false
            })

            router.push("/")

        } catch (err: any) {

            setError(
                err?.response?.data?.message ||
                "No se pudo actualizar la contraseña"
            )

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
                        <h1 className="text-2xl font-semibold text-black tracking-tight">
                            Activar cuenta
                        </h1>

                        <p className="text-sm text-slate-500 mt-2">
                            Ingresa tu email o teléfono
                        </p>
                    </div>

                    <Card className="p-6 space-y-5">

                        {step === "identifier" && (

                            <form onSubmit={handleRequestRecovery} className="space-y-5">

                                <Field label="Email o Teléfono">

                                    <div className="relative">

                                        {isPhone(identifier) ? (
                                            <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        ) : (
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                        )}

                                        <Input
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            className="pl-9"
                                            placeholder="correo o 6691234567"
                                        />

                                    </div>

                                </Field>

                                {error && (
                                    <p className="text-sm text-red-600">{error}</p>
                                )}

                                <Button type="submit" className="w-full">
                                    {loading ? <Loader /> : "Continuar"}
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
                                    {cooldown > 0 ? (
                                        <p className="text-sm text-slate-500">
                                            Reenviar código en {cooldown}s
                                        </p>
                                    ) : (
                                        <button
                                            type="button"
                                            className="text-sm text-blue-600"
                                            onClick={handleRequestRecovery}
                                        >
                                            Reenviar código
                                        </button>
                                    )}
                                </Field>

                                {error && (
                                    <p className="text-sm text-red-600">{error}</p>
                                )}

                                <Button type="submit" className="w-full">
                                    {loading ? <Loader /> : "Verificar código"}
                                </Button>

                            </form>

                        )}

                        {step === "reset-password" && (

                            <form onSubmit={handleResetPassword} className="space-y-5">

                                <Field label="Nueva contraseña">

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

                                {error && (
                                    <p className="text-sm text-red-600">{error}</p>
                                )}

                                <Button type="submit" className="w-full">
                                    {loading ? <Loader /> : "Crear contraseña"}
                                </Button>

                            </form>

                        )}

                    </Card>

                </div>
            </div>

        </main>
    )
}