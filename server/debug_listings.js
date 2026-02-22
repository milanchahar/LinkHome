const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const listings = await prisma.listing.findMany({
        orderBy: { createdAt: "desc" },
    });
    console.log(JSON.stringify(listings, null, 2));
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
