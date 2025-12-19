import SidebarSummary from "./SidebarSummary"
import SidebarNavigation from "./SidebarNavigation"
import SidebarPromotions from "./SidebarPromotions"
import SidebarPackages from "./SidebarPackages"
import SidebarSupport from "./SidebarSupport"

const Sidebar = () => {
    return (
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <SidebarSummary />
            <SidebarNavigation />
            <SidebarPromotions />
            <SidebarPackages />
            <SidebarSupport />
        </aside>
    )
}

export default Sidebar
