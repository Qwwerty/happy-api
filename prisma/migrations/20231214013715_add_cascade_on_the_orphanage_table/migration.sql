-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_orphanage_id_fkey";

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_orphanage_id_fkey" FOREIGN KEY ("orphanage_id") REFERENCES "orphanages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
