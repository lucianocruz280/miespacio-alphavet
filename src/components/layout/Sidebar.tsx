import SidebarSummary from "../sidebar/SidebarSummary"
import SidebarNavigation from "../sidebar/SidebarNavigation"
import SidebarPromotions from "../sidebar/SidebarPromotions"
import SidebarPackages from "../sidebar/SidebarPackages"
import SidebarSupport from "../sidebar/SidebarSupport"

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
