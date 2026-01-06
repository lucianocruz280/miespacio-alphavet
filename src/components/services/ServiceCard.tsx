import { useServiceStore } from "@/store/useServiceStore";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/router";

type Props = {
    title: string;
    description: string;
    duration: string;
    price: string;
    icon: LucideIcon;
};

export default function ServiceCard({
    title,
    description,
    duration,
    price,
    icon: Icon,
}: Props) {
    // const selectService = useServiceStore((s) => s.selectService)
    const router = useRouter()
    const selectService = ({}) => {
        router.push("/appointments")
    }
    return (

        <button
            onClick={() =>
                selectService({ title, duration, price })
            }
            className="group cursor-pointer flex flex-col p-4 md:p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-left ">
            <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100">
                    <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-base md:text-lg font-medium text-slate-900">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500">{description}</p>
                </div>
            </div>

            <div className="mt-auto pt-4 flex justify-between text-sm border-t border-slate-50">
                <span className="text-slate-400">Duración: {duration}</span>
                <span className="font-medium text-slate-900">desde {price}</span>
            </div>
        </button>
    );
}
