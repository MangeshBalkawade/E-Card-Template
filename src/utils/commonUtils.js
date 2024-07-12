const jwt = require("jsonwebtoken");
const responseUtils = require("../utils/responseUtils");
const crypto = require("crypto");
const ProjectConfig = require("../config/projectConfig");

module.exports = {
  async log(data, message = "LogData") {
    const isLog = ProjectConfig.LogEnableDisabled;
    return new Promise((resolve, reject) => {
      if (isLog) {
        console.log(`${message}--------------${data}`);
      }
      return resolve(true);
    });
  },

  async passwordEncryptionDeCryption(password, type = "") {
    return new Promise((resolve, reject) => {
      const algorithm = "aes-192-cbc";
      const password_key = "RPjZxZrP1y18zMU6sbP8FbPO6N1MMJ";
      const key = crypto.scryptSync(password_key, "GfG", 24);
      const iv = Buffer.alloc(16, 0);
      if (type == "en") {
        var cipher = crypto.createCipheriv(algorithm, key, iv);
      } else {
        var cipher = crypto.createDecipheriv(algorithm, key, iv);
      }
      let result_output = "";
      if (type == "en") {
        cipher.on("readable", () => {
          let chunk;
          while (null !== (chunk = cipher.read())) {
            result_output += chunk.toString("base64");
          }
        });
      } else {
        cipher.on("readable", () => {
          let chunk;
          while (null !== (chunk = cipher.read())) {
            result_output += chunk.toString("utf8");
          }
        });
      }
      // Handling end event
      cipher.on("end", () => {
        // console.log(result_output,'old');
        return resolve(result_output);
      });
      // Writing data
      if (type == "en") {
        cipher.write(password);
      } else {
        cipher.write(password, "base64");
      }
      cipher.end();
    });
  },

  async configureEmail() {
    return new Promise((resolve, reject) => {
      const nodemailer = require("nodemailer");
      console.log("email configure");
      let smtpAuth;
      smtpAuth = {
        user: "",
        pass: "",
      };
      let smtpConfig = {
        host: "",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: smtpAuth,
      };
      let transporter = nodemailer.createTransport(smtpConfig);

      transporter.verify(function (error, success) {
        if (error) {
          reject(error); // Reject promise if verification fails
        } else {
          console.log("Server is ready to take our messages");
          resolve(transporter); // Resolve promise with transporter if verification succeeds
        }
      });
    });
  },
  async sendMail(transporter, subject, template = "", email) {
    return new Promise((resolve, reject) => {
      console.log(subject, email);
      transporter.sendMail(
        {
          from: {
            name: "ConQT",
            address: "info@conqt.com",
          },
          to: email,
          subject: subject,
          html: template ? template : `welcome to E-business`,
        },
        (err, info) => {
          if (err) {
            console.log(err);
            return resolve(err);
          } else {
            console.log(info);
            return resolve(info);
          }
        }
      );
    });
  },
};
