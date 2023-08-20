// categoryController.js

exports.fetchCategories = (req, res, db) => {
  const sqlFetchCategories = `
    SELECT
      c.*,
      GROUP_CONCAT(v.name) AS variationNames
    FROM
      Category c
      LEFT JOIN category_variation cv ON c.Id = cv.CategoryId
      LEFT JOIN variation v ON cv.VariationId = v.Id
    GROUP BY c.Id
  `;

  db.query(sqlFetchCategories, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: "Error fetching categories" });
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

exports.createCategory = (req, res, db) => {
  try {
    const { name, img, variationIds } = req.body; // Receive variationIds from the client

    // Insert the new category into the `Category` table
    const sqlInsertCategory = `
      INSERT INTO Category (Name, img)
      VALUES (?, ?)
    `;

    db.query(sqlInsertCategory, [name, img], (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // Retrieve the ID of the newly inserted category
        const categoryId = result.insertId;

        // If there are selected variation IDs, insert rows into `category_variation`
        if (variationIds && variationIds.length > 0) {
          const sqlInsertCategoryVariation = `
            INSERT INTO category_variation (CategoryId, VariationId)
            VALUES (?, ?)
          `;

          // Loop through the variationIds array and insert rows into the junction table
          variationIds.forEach((variationId) => {
            db.query(
              sqlInsertCategoryVariation,
              [categoryId, variationId],
              (err, result) => {
                if (err) {
                  console.error(err);
                  // Handle the error if necessary
                }
              }
            );
          });
        }

        console.log(result);
        res.sendStatus(200);
      }
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.deleteCategory = (req, res, db) => {
  const id = Number(req.params.id);
  db.query("DELETE FROM Category WHERE Id=?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting category");
    } else {
      console.log(`Deleted category with ID ${id}`);
      res.status(200).send("Category deleted successfully");
    }
  });
};

exports.updateCategory = (req, res, db) => {
  const id = Number(req.params.id);
  const name = req.body.nameU;
  const imgU = req.body.imgU;
  const updatedVariationIds = req.body.variationIds; // Receive updated variation IDs from the client

  // Start a transaction to ensure atomicity of the update operations
  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Failed to start transaction.");
      return;
    }

    // Update the category information in the `Category` table
    const sqlUpdateCategory = "UPDATE Category SET Name=?, Img=? WHERE Id=?";
    db.query(sqlUpdateCategory, [name, imgU, id], (err, result) => {
      if (err) {
        db.rollback(() => {
          console.error(err);
          res.status(500).send("Failed to update category.");
        });
      } else {
        // Delete existing associations in the `category_variation` table for this category
        const sqlDeleteCategoryVariations =
          "DELETE FROM category_variation WHERE CategoryId=?";
        db.query(sqlDeleteCategoryVariations, [id], (err, result) => {
          if (err) {
            db.rollback(() => {
              console.error(err);
              res.status(500).send("Failed to update category variations.");
            });
          } else {
            // If there are updated variation IDs, insert new associations into `category_variation`
            if (updatedVariationIds && updatedVariationIds.length > 0) {
              const sqlInsertCategoryVariation =
                "INSERT INTO category_variation (CategoryId, VariationId) VALUES (?, ?)";
              const insertPromises = updatedVariationIds.map((variationId) => {
                return new Promise((resolve, reject) => {
                  db.query(
                    sqlInsertCategoryVariation,
                    [id, variationId],
                    (err, result) => {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(result);
                      }
                    }
                  );
                });
              });

              Promise.all(insertPromises)
                .then(() => {
                  db.commit((err) => {
                    if (err) {
                      db.rollback(() => {
                        console.error(err);
                        res.status(500).send("Failed to commit transaction.");
                      });
                    } else {
                      res.send(result);
                    }
                  });
                })
                .catch((err) => {
                  db.rollback(() => {
                    console.error(err);
                    res
                      .status(500)
                      .send("Failed to update category variations.");
                  });
                });
            } else {
              // No updated variation IDs, just commit the transaction
              db.commit((err) => {
                if (err) {
                  db.rollback(() => {
                    console.error(err);
                    res.status(500).send("Failed to commit transaction.");
                  });
                } else {
                  res.send(result);
                }
              });
            }
          }
        });
      }
    });
  });
};
