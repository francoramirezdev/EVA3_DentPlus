import { Request, Response } from 'express'
import * as AffiliateModel from '../models/affiliate.model'
import { affiliateSchema } from '../schemas/affiliate.schemas'
import { formatZodErrors } from '../lib/parseError'

const getAffiliateId = (value: string | string[]) => {
  const rawValue = Array.isArray(value) ? value[0] : value
  const id = Number(rawValue)
  return Number.isInteger(id) ? id : null
}

export const index = async (req: Request, res: Response) => {
  const affiliates = await AffiliateModel.getAll(req.session.userId!)
  res.render('affiliates/index', { affiliates })
}

export const show = async (req: Request, res: Response) => {
  const id = getAffiliateId(req.params.id)
  if (!id) return res.status(404).render('404', { message: 'Afiliado no encontrado' })
  const affiliate = await AffiliateModel.getById(id, req.session.userId!)
  if (!affiliate) return res.status(404).render('404', { message: 'Afiliado no encontrado' })
  res.render('affiliates/show', { affiliate })
}

export const createForm = (_req: Request, res: Response) => {
  res.render('affiliates/create', { values: {} })
}

export const createAction = async (req: Request, res: Response) => {
  const result = affiliateSchema.safeParse(req.body)
  if (!result.success) {
    return res.render('affiliates/create', {
      errors: formatZodErrors(result.error),
      values: req.body,
    })
  }
  const affiliate = await AffiliateModel.create({
    ...result.data,
    user: { connect: { id: req.session.userId! } },
  })
  res.redirect(`/affiliates/${affiliate.id}`)
}

export const editForm = async (req: Request, res: Response) => {
  const id = getAffiliateId(req.params.id)
  if (!id) return res.status(404).render('404', { message: 'Afiliado no encontrado' })
  const affiliate = await AffiliateModel.getById(id, req.session.userId!)
  if (!affiliate) return res.status(404).render('404', { message: 'Afiliado no encontrado' })
  res.render('affiliates/edit', { affiliate })
}

export const editAction = async (req: Request, res: Response) => {
  const id = getAffiliateId(req.params.id)
  if (!id) return res.status(404).render('404', { message: 'Afiliado no encontrado' })
  const result = affiliateSchema.safeParse(req.body)
  if (!result.success) {
    const affiliate = await AffiliateModel.getById(id, req.session.userId!)
    return res.render('affiliates/edit', {
      affiliate,
      errors: formatZodErrors(result.error),
    })
  }
  try {
    await AffiliateModel.update(id, req.session.userId!, result.data)
    res.redirect(`/affiliates/${id}`)
  } catch {
    res.status(404).render('404', { message: 'Afiliado no encontrado' })
  }
}

export const deleteAction = async (req: Request, res: Response) => {
  const id = getAffiliateId(req.params.id)
  if (!id) return res.status(404).render('404', { message: 'Afiliado no encontrado' })
  try {
    await AffiliateModel.remove(id, req.session.userId!)
    res.redirect('/affiliates')
  } catch {
    res.status(404).render('404', { message: 'Afiliado no encontrado' })
  }
}

