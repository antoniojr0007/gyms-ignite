import { Gym, Prisma } from '@prisma/client'

export interface findManyNearbyParms {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findByEmail(email: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: findManyNearbyParms): Promise<Gym[]>
}
