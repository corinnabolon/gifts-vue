import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GiftsService {

  async getGifts() {
    let res = await api.get("api/gifts")
    logger.log("Got gifts", res.data)
    let newGifts = res.data.map(pojo => new Gift(pojo))
    logger.log(newGifts)
    AppState.gifts = newGifts
    logger.log(AppState.gifts)
  }

  async createGift(gift) {
    let res = await api.post("api/gifts", gift)
    await this.getGifts()
  }

  async openGift(newGift) {
    logger.log("This is the gift you selected", newGift)
    let change = { opened: true }
    let res = await api.put(`api/gifts/${newGift.id}`, change)
    let gifts = AppState.gifts
    let unopenedIndex = gifts.findIndex(gift => gift.id == newGift.id)
    gifts.splice(unopenedIndex, 1, new Gift(res.data))
    logger.log("AppState array", gifts)
  }

}

export const giftsService = new GiftsService()