const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.listing.count();
        console.log(`Total listings: ${count}`);
        const listings = await prisma.listing.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        console.log('Recent 5 listings:', JSON.stringify(listings, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
