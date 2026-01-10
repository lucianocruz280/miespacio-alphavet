import api from "@/lib/axios"
import { useEffect, useState } from "react"

type Props = {
  url: string
  method?: "post" | "get" | "put"
  postData?: Record<string, any>
  params?: Record<string, any>
  defaultValue?: any
  skip?: boolean
}

const useAxios = <T,>(
  {
    url,
    postData,
    params,
    method = "get",
    defaultValue,
    skip = false,
  }: Props,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(defaultValue ?? null)
  const [loading, setLoading] = useState(false)

  const exec = async () => {
    if (skip) return

    setLoading(true)
    try {
      const response =
        method === "get"
          ? await api.get(
              `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
              { params }
            )
          : await api[method](
              `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
              postData,
              { params }
            )

      setData(response.data)
    } catch (err) {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    exec()
  }, dependencies)

  return {
    data,
    loading,
    refetch: exec,
  }
}

export default useAxios
