/// <reference types="node" />
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Limpiar datos existentes para poder ejecutar el seed múltiples veces
  await prisma.affiliate.deleteMany()
  await prisma.user.deleteMany()

  const hash = await bcrypt.hash('test2026', 10)

  const users = await Promise.all([
    prisma.user.create({ data: { email: 'franco@test.com', password: hash } }),
    prisma.user.create({ data: { email: 'simon@test.com', password: hash } }),
  ])

  const affiliates = [
    { firstName: 'Franco', lastName: 'Ramirez', email: 'franco.ramirez@example.com', membershipType: 'Gold', userId: users[0].id },
    { firstName: 'Camila', lastName: 'Gonzalez', email: 'camila.gonzalez@example.com', membershipType: 'Silver', userId: users[1].id },
    { firstName: 'Matias', lastName: 'Rojas', email: 'matias.rojas@example.com', membershipType: 'Platinum', userId: users[0].id },
    { firstName: 'Valentina', lastName: 'Soto', email: 'valentina.soto@example.com', membershipType: 'Gold', userId: users[1].id },
    { firstName: 'Diego', lastName: 'Muñoz', email: 'diego.munoz@example.com', membershipType: 'Silver', userId: users[1].id },
    { firstName: 'Fernanda', lastName: 'Torres', email: 'fernanda.torres@example.com', membershipType: 'Platinum', userId: users[1].id },
    { firstName: 'Javier', lastName: 'Vargas', email: 'javier.vargas@example.com', membershipType: 'Gold', userId: users[1].id },
    { firstName: 'Antonia', lastName: 'Castillo', email: 'antonia.castillo@example.com', membershipType: 'Silver', userId: users[0].id },
    { firstName: 'Benjamin', lastName: 'Herrera', email: 'benjamin.herrera@example.com', membershipType: 'Platinum', userId: users[0].id },
    { firstName: 'Catalina', lastName: 'Sepulveda', email: 'catalina.sepulveda@example.com', membershipType: 'Gold', userId: users[1].id },
    { firstName: 'Ignacio', lastName: 'Pérez', email: 'ignacio.perez@example.com', membershipType: 'Gold', userId: users[0].id },
    { firstName: 'Sofía', lastName: 'Martínez', email: 'sofia.martinez@example.com', membershipType: 'Silver', userId: users[1].id },
    { firstName: 'Tomás', lastName: 'Fuentes', email: 'tomas.fuentes@example.com', membershipType: 'Platinum', userId: users[0].id },
    { firstName: 'Josefa', lastName: 'Navarro', email: 'josefa.navarro@example.com', membershipType: 'Gold', userId: users[1].id },
    { firstName: 'Vicente', lastName: 'Morales', email: 'vicente.morales@example.com', membershipType: 'Silver', userId: users[0].id },
    { firstName: 'Florencia', lastName: 'Silva', email: 'florencia.silva@example.com', membershipType: 'Platinum', userId: users[1].id },
    { firstName: 'Martín', lastName: 'Reyes', email: 'martin.reyes@example.com', membershipType: 'Gold', userId: users[0].id },
    { firstName: 'Isidora', lastName: 'Contreras', email: 'isidora.contreras@example.com', membershipType: 'Silver', userId: users[1].id },
    { firstName: 'Cristóbal', lastName: 'Araya', email: 'cristobal.araya@example.com', membershipType: 'Platinum', userId: users[0].id },
    { firstName: 'Trinidad', lastName: 'Espinoza', email: 'trinidad.espinoza@example.com', membershipType: 'Gold', userId: users[1].id },
  ]

  await prisma.affiliate.createMany({ data: affiliates })

  const count = await prisma.affiliate.count()
  console.log(`Inserted ${count} affiliates.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })