const { v4: uuidv4 } = require("uuid");
const conn = require("../db/connection");

const getJob = async (req, res) => {
  const {
    companyName,
    jobTitle,
    location,
    emailAddress,
    requirement,
    jobDetails,
    submitBy,
  } = req.body;

  try {
    // Generate a unique ID for the job entry
    const jobId = uuidv4();

    const insertQuery =
      "INSERT INTO jobList (id, companyName, jobTitle, location, email, requirement, jobDetails) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      jobId, // Pass the generated ID
      companyName,
      jobTitle,
      location,
      emailAddress,
      requirement,
      jobDetails,
      submitBy,
    ];

    conn.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting job in db:", err);
        res.status(400).send("Error inserting job in database");
      } else {
        res.status(200).send({ ...req.body, id: jobId });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send("Error occurred while processing the request");
  }
};

module.exports = { getJob };