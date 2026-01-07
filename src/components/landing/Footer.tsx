import { Github, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
                                <span className="text-xl">A</span>
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">
                                Alpha<span className="text-primary">vet</span>
                            </span>
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed mb-6">
                            Líderes en el cuidado integral de mascotas, combinando amor, tecnología y profesionalismo desde 2015.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Servicios</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Consulta General</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Estética y Spa</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Cirugías</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Farmacia</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Compañía</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Nosotros</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Testimonios</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© 2026 AlphaVet Medical Center. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
                        <a href="#" className="hover:text-white transition-colors">Política de Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

