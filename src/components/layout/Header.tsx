import { Search } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80">

            <div className="max-w-[1600px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-sm">VH</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-slate-900 font-medium text-lg">
                            Alphavet
                        </Link>
                        <span className="hidden md:inline-flex px-2 py-0.5 rounded-full text-xs bg-slate-100 border border-slate-200">
                            Online
                        </span>
                    </div>
                </div>

                {/* Search */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-6">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Busca un servicio: consulta, baño, corte de pelo, cita..."
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 rounded-lg text-sm focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button className="hidden lg:block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                        Mis reservas
                    </button>
                    <button className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                        Iniciar sesión / Registrarse
                    </button>
                </div>
            </div>
        </header>
    );
}
