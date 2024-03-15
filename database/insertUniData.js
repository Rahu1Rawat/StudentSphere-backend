const fs = require("fs");
const path = require("path");
const { University } = require("./dbUniConnect");

const universitiesFilePath = path.join(
  __dirname,
  "world_universities_and_domains.json"
);

if (!fs.existsSync(universitiesFilePath)) {
  console.error("The JSON file does not exist");
  process.exit(1);
}

fs.readFile(universitiesFilePath, "utf-8", async (err, data) => {
  if (err) {
    console.error("An error occurred:", err);
    return;
  }
  let universities;
  try {
    universities = JSON.parse(data);
  } catch (err) {
    console.error("Invalid JSON data:", err);
    process.exit(1);
  }

  universities.forEach((university) => {
    if (!Array.isArray(university.domains) || university.domains.length === 0) {
      console.error("Invalid or missing domains field");
    }
  });
  try {
    for (let university of universities) {
      const existingUniversity = await University.findOne({
        name: university.name,
      });
      if (!existingUniversity) {
        const result = await University.create(university);
        console.log("Inserted university:", university.name);
      } else {
        console.log(
          "University already exists, skipping insertion:",
          university.name
        );
      }
    }
  } catch (err) {
    console.error("An error occurred while inserting the data:", err);
  }
});
