import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },

  { timestamps: true, versionKey: false }
);

const Company = mongoose.model.Company || mongoose.model("Company", companySchema);
export default Company;
