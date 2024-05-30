class Memory {
  constructor () {
    this.basicInfo = {};
    this.contact = {};
    this.education = {};
    this.expertise = {};
    this.experience = {};
    this.reference = {};
  }

  setBasicInfo (state) {
    this.basicInfo = state;
  }

}

const SavedState = new Memory();

export default SavedState