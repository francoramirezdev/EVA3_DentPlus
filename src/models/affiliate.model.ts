import prisma from '../lib/prisma'
import type { Prisma  } from '../generated/prisma/client'

export const getAll = async (userId: number) => {
  return await prisma.affiliate.findMany({where: { userId }})
}

export const getById = async (id: number, userId: number) => {
  return await prisma.affiliate.findUnique({ where: { id, userId } })
}

export const create = async (data: Prisma.AffiliateCreateInput) => {
  return await prisma.affiliate.create({ data })
}

export const update = async (id: number, userId: number, data: Omit<Prisma.AffiliateUncheckedCreateInput, 'userId'>) => {
  return await prisma.affiliate.update({ where: { id, userId }, data })
}

export const remove = async (id: number, userId: number) => {
  await prisma.affiliate.delete({ where: { id, userId } })
} 
