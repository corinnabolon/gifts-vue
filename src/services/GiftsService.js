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
    AppState.gifts.unshift(new Gift(res.data))
    //we make it a Gift before putting it in the Array because the Prop is expecting a gift
    //push puts it at the end, unshift puts it at the beginning of the array
  }

  async openGift(newGift) {
    logger.log("This is the gift you selected", newGift)
    newGift.opened = true
    // let change = { opened: true }
    // let res = await api.put(`api/gifts/${newGift.id}`, change)
    let res = await api.put(`api/gifts/${newGift.id}`, newGift)
    let gifts = AppState.gifts
    let unopenedIndex = gifts.findIndex(gift => gift.id == newGift.id)
    gifts.splice(unopenedIndex, 1, new Gift(res.data))
    logger.log("AppState array", gifts)
  }

}

export const giftsService = new GiftsService()