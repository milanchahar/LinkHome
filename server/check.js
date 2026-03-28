const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.tfphqhgiwtmiljliduaw:acu_72UX*f%23F%24Wb@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});
async function main() {
  const count = await prisma.listing.count();
  const listings = await prisma.listing.findMany({ select: { id: true, title: true }});
  console.log("TOTAL PROPERTIES CONTAINS: ", count);
  console.log(listings);
}
main().catch(console.error).finally(() => prisma.$disconnect());
