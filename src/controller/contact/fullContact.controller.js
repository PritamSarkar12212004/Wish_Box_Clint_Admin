import service from "../../model/service.js";

const fullContact = async (req, res) => {
  try {
    const {
      supportType,
      supportName,
      supportEmail,
      supportPhoneNumber,
      supportSubject,
      supportMessage,
    } = req.body;
    if (
      !supportType ||
      !supportName ||
      !supportEmail ||
      !supportPhoneNumber ||
      !supportSubject ||
      !supportMessage
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newSupport = new service.contact.fullContact({
      supportType,
      supportName,
      supportEmail,
      supportPhoneNumber,
      supportSubject,
      supportMessage,
    });

    const savedData = await newSupport.save();

    res.status(201).json({
      success: true,
      message: "Support request submitted successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Support Controller Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default fullContact;
