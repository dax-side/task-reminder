const fs = require("fs");
const path = require("path");

// Function to extract essential data
function extractRepositoryData(inputPath, outputPath) {
  try {
    // Read the input JSON file
    const rawData = fs.readFileSync(inputPath, "utf8");
    const repositories = JSON.parse(rawData);

    // Transform the data to the simplified format
    const simplifiedData = repositories.map((repo) => ({
      projectDetails: `name: ${repo.name} , full_name: ${repo.full_name}, description: ${repo.description}`,
    }));

    // Write the simplified data to the output file
    fs.writeFileSync(
      outputPath,
      JSON.stringify(simplifiedData, null, 2),
      "utf8"
    );

    console.log(`Successfully extracted repository data to ${outputPath}`);
    console.log(
      `Reduced from ${rawData.length} to ${fs.readFileSync(outputPath, "utf8").length} characters`
    );
  } catch (error) {
    console.error("Error processing repository data:", error);
  }
}

// Define input and output file paths
const inputPath = path.resolve(__dirname, "telexprojects.json");
const outputPath = path.resolve(__dirname, "simplified-repos.json");

// Execute the extraction
extractRepositoryData(inputPath, outputPath);
