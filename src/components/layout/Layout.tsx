import { FC } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"

type Props = {
    children: React.ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <div className="
        max-w-[1600px] mx-auto px-4 lg:px-6 py-6
        flex flex-col lg:flex-row gap-6
      ">
                <div className="flex-1">
                    {children}
                </div>

                <div className="hidden lg:block w-80 shrink-0">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default MainLayout