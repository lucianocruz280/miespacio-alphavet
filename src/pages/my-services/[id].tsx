import MainLayout from "@/components/layout/Layout"
import MyServiceDetail from "@/components/services/MyServiceDetail"
import { useRouter } from "next/router"

const MyServiceDetailPage = () => {
  const router = useRouter()
  const { id, category } = router.query

  if (!id || !category) return null

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <MyServiceDetail serviceId={id as string} category={category as string} />
      </div>
    </MainLayout>
  )
}

export default MyServiceDetailPage
