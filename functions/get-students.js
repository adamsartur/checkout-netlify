const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.handler = async () => {
  console.log("Loading students from prisma...");
  const students = await prisma.post.findMany();
  console.log(students);
  try {
    return {
      statusCode: 200,
      contentType: "application/json",
      body: JSON.stringify({ data: students }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
