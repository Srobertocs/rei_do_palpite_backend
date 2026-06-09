/*
  Warnings:

  - The values [PAGA] on the enum `CampaignOptionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CampaignOptionStatus_new" AS ENUM ('GANHADA', 'PERDIDA', 'PENDENTE');
ALTER TABLE "public"."CampaignOption" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "CampaignOption" ALTER COLUMN "status" TYPE "CampaignOptionStatus_new" USING ("status"::text::"CampaignOptionStatus_new");
ALTER TYPE "CampaignOptionStatus" RENAME TO "CampaignOptionStatus_old";
ALTER TYPE "CampaignOptionStatus_new" RENAME TO "CampaignOptionStatus";
DROP TYPE "public"."CampaignOptionStatus_old";
ALTER TABLE "CampaignOption" ALTER COLUMN "status" SET DEFAULT 'PENDENTE';
COMMIT;
