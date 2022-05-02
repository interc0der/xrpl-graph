import express, {Router} from 'express'
import controller from '../controller/index'

const router:Router = express.Router()

router
  .get(`/markets/:token`, controller.getWeightedAverage)
  .get(`/markets/:reset`, controller.resetTimeSeries)
  

module.exports = router;