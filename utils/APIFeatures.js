class APIFeatures {
  constructor(queryData, queryParams) {
    this.queryData = queryData;
    this.queryParams = queryParams;
  }
  filter() {
    let extraQuery = ["sort", "page", "limit"];
    let queryObj = { ...this.queryParams };
    extraQuery.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|let)\b/g, (x) => `$${x}`);
    queryObj = JSON.parse(queryStr);
    this.queryData = this.queryData.find(queryObj);
    return this;
  }
  pagination() {
    const page = this.queryParams.page * 1 || 1;
    const limit = this.queryParams.limit || 2;
    const skip = (page - 1) * limit;
    this.queryData = this.queryData.skip(skip).limit(limit);
    return this;
  }
  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(",").join(" ");
      this.queryData = this.queryData.sort(sortBy);
    } else {
      this.queryData = this.queryData.sort("-created_at");
    }
    return this;
  }
}
module.exports = APIFeatures;
