const fs = require("fs");
const path = require("path");
const { Email } = require("./dbEmailConnect");

const emailFilePath = path.join(__dirname, "email_provider_domains.json");

if (!fs.existsSync(emailFilePath)) {
  console.error("The json file does not exists!");
  process.exit(1);
}

fs.readFile(emailFilePath, "utf-8", async (err, data) => {
  if (err) {
    console.error("An error occurred:", err);
    return;
  }
  let emails;
  try {
    emails = JSON.parse(data);
  } catch (err) {
    console.error("Invalid JSON data:", err);
    process.exit(1);
  }
  emails.forEach((email) => {
    if (email.domain.length === 0) {
      console.error("Invalid or missing domains field");
    }
  });

  try {
    let insertedCount = 0;
    let skippedCount = 0;
    for (let email of emails) {
      const existingEmail = await Email.findOne({ domain: email.domain });
      if (!existingEmail) {
        const result = await Email.create(email);
        insertedCount++;
      } else {
        skippedCount++;
      }
    }
    console.log(`Inserted ${insertedCount} emails successfully.`);
    console.log(`Skipped ${skippedCount} existing emails.`);
  } catch (err) {
    console.error("An error occurred while inserting the data:", err);
  }
});
