export class Gift {
  constructor(data) {
    this.id = data._id
    this.tag = data.tag
    this.imgUrl = data.url
    this.opened = data.opened || false
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
  }
}


const giftData = `{
  "_id": "6538205dfa45ebb7d9a84ff7",
  "tag": "who dis?",
  "url": "",
  "opened": false,
  "creatorId": "652575a13cff8feb64c0f680",
  "createdAt": "2023-10-24T19:51:57.797Z",
  "updatedAt": "2023-10-24T19:51:57.797Z",
  "__v": 0,
  "id": "6538205dfa45ebb7d9a84ff7"
}`