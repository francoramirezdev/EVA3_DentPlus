import { Router } from 'express'
import * as AffiliateController from '../controllers/affiliate.controller'

const router = Router()

router.get('/', AffiliateController.index)
router.get('/create', AffiliateController.createForm)
router.post('/', AffiliateController.createAction)
router.get('/:id', AffiliateController.show)
router.get('/edit/:id', AffiliateController.editForm)
router.post('/edit/:id', AffiliateController.editAction)
router.post('/delete/:id', AffiliateController.deleteAction)

export default router
