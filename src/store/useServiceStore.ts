import { create } from "zustand"

type Service = {
  title: string
  price: string
  duration: string
}

type ServiceState = {
  selectedService: Service | null
  selectService: (service: Service) => void
}

export const useServiceStore = create<ServiceState>((set) => ({
  selectedService: null,
  selectService: (service) => set({ selectedService: service }),
}))
