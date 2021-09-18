/**
 * @typedef {Card}
 * @property {number} cuid
 * @property {number} guid
 * @property {string} text1
 * @property {string} text2
 * @property {number} reviewStage
 * @property {number} lastReviewResult
 * @property {number} dateOfReview
 * @property {number} dateForNextReview
 */
export default class Card {
  constructor() {}

  // cuid              Int       @id @default(autoincrement())
  // guid              Int?
  // text1             String
  // text2             String
  // reviewStage       Int       @default(0)   // [1, 2, 4, 8, 16, 32] 의 index 로 사용 할 것
  // lastReviewResult  Int       @default(0)   // NONE: 0, SUCCESS: 1, FAIL: 2
  // dateOfReview      Int
  // dateForNextReview Int

  // createdAt         DateTime  @default(now())
  // updatedAt         DateTime  @updatedAt


  static newCard({ text1, text2, dateOfReview }) {
    const card = new Card()
    card.text1 = text1
    card.text2 = text2
    card.dateOfReview = dateOfReview
    return card
  }

  /**
   * 
   * @param {string|Object} cardData 
   */
  static parse(cardData) {
    if (typeof cardData === 'string') {
      try {
        cardData = JSON.parse(cardData)
      } catch (error) {
        throw new Error('Can not parse data')
      }
    }

    const card = new Card()
    Object.entries(cardData).forEach(([key, value]) => value && (card[key] = value))
    return card
  }
}
