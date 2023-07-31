// countryController.js
const { deleteFiles } = require("../Helpers/fileUpload");

// Create a new country with single image upload or multiple image upload
exports.createCountry = (req, res, db) => {
  try {
    const name = req.body.name;
    let image;

    // Check if the request has a single image upload or multiple image uploads
    if (req.file) {
      // Single image upload
      image = req.file.filename;
    } else if (req.files && req.files.length > 0) {
      // Multiple image uploads (from uploadImages middleware)
      image = req.files.map((file) => file.filename);
    } else {
      return res.status(400).json({ error: "Image file(s) is required." });
    }

    // Insert the country into the database
    const insertQuery = `INSERT INTO country (Name, Image) VALUES (?, ?)`;
    db.query(insertQuery, [name, image], (error, result) => {
      if (error) {
        console.error("Error inserting country into database:", error);
        // If there was an error, delete uploaded file(s)
        if (typeof image === "string") {
          deleteFiles([path.join(ImgPath, image)]);
        } else if (Array.isArray(image)) {
          deleteFiles(image.map((fileName) => path.join(ImgPath, fileName)));
        }
        return res.status(500).json({ error: "Error creating country." });
      }

      return res.status(201).json({ message: "Country created successfully." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// Get all countries
exports.getCountries = (req, res, db) => {
  try {
    const selectQuery = "SELECT * FROM country";
    db.query(selectQuery, (error, results) => {
      if (error) {
        console.error("Error fetching countries:", error);
        return res.status(500).json({ error: "Failed to fetch countries." });
      }
      const countrieswithimages = results.map((country) => {
        return {
          ...country,
          Image: `/images/${country.Image}`,
        };
      });
      return res.status(200).json(countrieswithimages);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
