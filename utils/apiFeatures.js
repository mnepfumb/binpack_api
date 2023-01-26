
class APIFeatures{
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    
    filter() {

        // BUILD QUERY
        const queryObj = {...this.queryStr};
        // const excludedFields = ["page", "sort", "limits", "fields"];
        // excludedFields((el) => delete queryObj[el]);
        
        // ADVANCE FILTERING QUERY
        let queryStr = JSON.stringify(queryObj);
        // console.log(queryStr);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // gte: greater than or equals to
        // gt: greater than
        // lte: less than or equals to
        // lt: less than
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }
    sort() {
          // SORTING METHOD
        if(this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-created_date");
        }

        return this;
    }
    limitFields() {
        // FIELD LIMITING
        if(this.queryStr.fields) {
            const fields = this.queryStr.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }

        return this;
    }
    pagination() {
        //  PAGINATION FUNCTION
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;