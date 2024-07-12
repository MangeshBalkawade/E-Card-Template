const commonUtils = require("../utils/commonUtils");
const logService = require("../services/LogService");
const fs = require("fs").promises;
const path = require("path");

module.exports = {
  async sendEmail(fileUrl, subject, receiver, data) {
    try {
      // Configure email transporter
      const transporter = await commonUtils.configureEmail();

      // Get the absolute path to email template
      const templatePath = path.resolve(__dirname, fileUrl);
      let template = await fs.readFile(templatePath, { encoding: "utf-8" });

      // Replace placeholders in the template with actual data
      for (const key of Object.keys(data)) {
        const regex = new RegExp("{" + key + "}", "g");
        template = template.replace(regex, data[key] || "");
      }

      // Send email using commonUtils.sendMail method.
      const info = await commonUtils.sendMail(
        transporter,
        subject,
        template,
        receiver
      );

      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error occurred in email section:", error);
      await logService.Insert(error, "Error occurred in email section");
    }
  },
};
