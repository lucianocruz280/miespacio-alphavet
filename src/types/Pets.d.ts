export type Pet = {
  id: string
  name: string
  species: string
  breed: string
  gender: string
  birthDate: string | null
  color: string | null
  weight: number | null
  microchip: string | null
  photo: string
  notes: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  myRelationship: string
  isPrimaryOwner: boolean
}