import Company from "../Models/company.model.js";

export const addCompany = async (req, res) => {
  const name = req.body.name;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Provide provide a company name !" });
    }

    const checkIfExist = await Company.findOne({ name: name });

    if (checkIfExist)
      return res.status(400).json({
        success: false,
        message: `Company with name ${name} already exist !`,
      });

    const newCompany = await Company.create({
      name,
    });

    return res.status(201).json({
      success: true,
      message: `company ${name} added successfully !`,
      company: newCompany,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error while adding new company" });
  }
};

export const fetchAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    if (!companies)
      return res.status(400).json({ message: "companies not found !" });
    return res
      .status(200)
      .json({ message: "companies found succesfully !", companies });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error while fetching all companies !", err });
  }
};

export const removeCompany = async (req, res) => {
  const name = req.body.name;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Provide provide a company name !" });
    }

    const checkIfExist = await Company.findOne({ name: name });

    if (!checkIfExist)
      return res.status(400).json({
        success: false,
        message: `Company with name ${name} doesn't exist !`,
      });

    const newCompany = await Company.deleteOne({
      name,
    });

    return res.status(201).json({
      success: true,
      message: `${name} removed successfully`,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error while removing the company" });
  }
};
